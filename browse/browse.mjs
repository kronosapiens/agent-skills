#!/usr/bin/env node
// browse — a small persistent-headless-Chromium CLI (Playwright + system Chrome).
// One daemon holds the browser/page; the CLI sends it commands over a unix socket,
// so state (page, cookies, refs) persists between calls and each call is fast.
// No telemetry, no phone-home — it's yours.
import net from "node:net";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const STATE_DIR = path.join(os.homedir(), ".browse");
const SOCK = path.join(STATE_DIR, "daemon.sock");
const SHOT_DIR = path.join(STATE_DIR, "shots");
const IDLE_MS = 20 * 60 * 1000; // daemon self-exits after 20m idle
fs.mkdirSync(SHOT_DIR, { recursive: true });

if (process.argv[2] === "--daemon") runDaemon();
else runClient(process.argv.slice(2));

// ─── client ──────────────────────────────────────────────────────────────────

async function runClient(args) {
  if (args.length === 0) {
    process.stdout.write("usage: browse <command> [args]   (try: browse help)\n");
    process.exit(1);
  }
  let sock = await tryConnect();
  if (!sock) {
    startDaemon();
    sock = await waitForDaemon();
    if (!sock) {
      process.stderr.write("browse: daemon failed to start (is Google Chrome installed?)\n");
      process.exit(1);
    }
  }
  const res = await send(sock, args);
  if (res.out != null && res.out !== "") process.stdout.write(res.out.replace(/\n?$/, "\n"));
  if (res.err) {
    process.stderr.write("browse: " + res.err + "\n");
    process.exit(1);
  }
  process.exit(0);
}

function tryConnect() {
  return new Promise((resolve) => {
    if (!fs.existsSync(SOCK)) return resolve(null);
    const s = net.connect(SOCK);
    s.once("connect", () => resolve(s));
    s.once("error", () => resolve(null));
  });
}

function startDaemon() {
  const self = fileURLToPath(import.meta.url);
  spawn(process.execPath, [self, "--daemon"], { detached: true, stdio: "ignore" }).unref();
}

async function waitForDaemon() {
  for (let i = 0; i < 150; i++) {
    const s = await tryConnect();
    if (s) return s;
    await sleep(100);
  }
  return null;
}

function send(sock, args) {
  return new Promise((resolve) => {
    let buf = "";
    sock.on("data", (d) => (buf += d));
    sock.on("end", () => {
      try {
        resolve(JSON.parse(buf));
      } catch {
        resolve({ err: buf || "no response" });
      }
    });
    sock.write(JSON.stringify(args) + "\n");
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── daemon ──────────────────────────────────────────────────────────────────

async function runDaemon() {
  if (await tryConnect()) process.exit(0); // already running
  try {
    fs.unlinkSync(SOCK);
  } catch {}

  const { chromium } = await import("playwright");
  let browser, context, page;
  const consoleMsgs = [];
  const netEvents = [];
  let refs = new Map(); // "@e1" -> ElementHandle

  async function launch() {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    page = await context.newPage();
    page.on("console", (m) => consoleMsgs.push({ type: m.type(), text: m.text() }));
    page.on("pageerror", (e) => consoleMsgs.push({ type: "error", text: String(e?.message || e) }));
    page.on("requestfailed", (r) =>
      netEvents.push({ url: r.url(), failure: r.failure()?.errorText || "failed" }),
    );
    page.on("response", (r) => {
      if (r.status() >= 400) netEvents.push({ url: r.url(), status: r.status() });
    });
  }
  await launch();

  let idle;
  const resetIdle = () => {
    clearTimeout(idle);
    idle = setTimeout(shutdown, IDLE_MS);
  };
  async function shutdown() {
    try {
      await browser.close();
    } catch {}
    try {
      fs.unlinkSync(SOCK);
    } catch {}
    process.exit(0);
  }
  resetIdle();

  const server = net.createServer((conn) => {
    let buf = "";
    conn.on("data", async (d) => {
      buf += d;
      if (!buf.includes("\n")) return;
      let args;
      try {
        args = JSON.parse(buf.slice(0, buf.indexOf("\n")));
      } catch {
        return conn.end(JSON.stringify({ err: "bad request" }));
      }
      resetIdle();
      let res;
      try {
        res = await dispatch(args);
      } catch (e) {
        res = { err: String(e?.message || e) };
      }
      conn.end(JSON.stringify(res ?? { out: "" }));
    });
  });
  server.listen(SOCK);
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  // ── command dispatch ──
  async function dispatch(args) {
    const [cmd, ...rest] = args;

    const target = (sel) => {
      if (typeof sel === "string" && sel.startsWith("@")) {
        const h = refs.get(sel);
        if (!h) throw new Error(`unknown ref ${sel} — run snapshot first`);
        return { handle: h };
      }
      return { selector: sel };
    };

    switch (cmd) {
      case "help":
        return { out: HELP };
      case "goto": {
        if (!rest[0]) throw new Error("goto <url>");
        refs.clear();
        await page.goto(rest[0], { waitUntil: "load", timeout: 30000 });
        return { out: page.url() };
      }
      case "url":
        return { out: page.url() };
      case "reload":
        refs.clear();
        await page.reload({ waitUntil: "load" });
        return { out: page.url() };
      case "back":
        refs.clear();
        await page.goBack({ waitUntil: "load" });
        return { out: page.url() };

      case "click": {
        const t = target(rest[0]);
        if (t.handle) await t.handle.click({ timeout: 8000 });
        else await page.click(t.selector, { timeout: 8000 });
        return { out: "clicked " + rest[0] };
      }
      case "hover": {
        const t = target(rest[0]);
        if (t.handle) await t.handle.hover({ timeout: 8000 });
        else await page.hover(t.selector, { timeout: 8000 });
        return { out: "hovered " + rest[0] };
      }
      case "fill": {
        const t = target(rest[0]);
        const val = rest.slice(1).join(" ");
        if (t.handle) await t.handle.fill(val);
        else await page.fill(t.selector, val, { timeout: 8000 });
        return { out: "filled " + rest[0] };
      }
      case "type":
        await page.keyboard.type(rest.join(" "));
        return { out: "typed" };
      case "press":
        await page.keyboard.press(rest[0]);
        return { out: "pressed " + rest[0] };
      case "select": {
        const t = target(rest[0]);
        const val = rest.slice(1).join(" ");
        const loc = t.handle ? t.handle : page.locator(t.selector);
        await loc.selectOption({ label: val }).catch(() => loc.selectOption(val));
        return { out: "selected " + val };
      }
      case "scroll": {
        if (rest[0]) {
          const t = target(rest[0]);
          const el = t.handle || (await page.$(t.selector));
          if (!el) throw new Error("not found: " + rest[0]);
          await el.scrollIntoViewIfNeeded();
        } else {
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        }
        return { out: "scrolled" };
      }

      case "text":
        return { out: await page.evaluate(() => document.body.innerText) };
      case "html": {
        if (rest[0]) {
          const el = await page.$(rest[0]);
          if (!el) throw new Error("not found: " + rest[0]);
          return { out: await el.innerHTML() };
        }
        return { out: await page.content() };
      }
      case "js":
        return { out: str(await page.evaluate(`(${rest.join(" ")})`)) };
      case "eval": {
        const code = fs.readFileSync(rest[0], "utf8");
        return { out: str(await page.evaluate(`(()=>{${code}})()`)) };
      }
      case "is": {
        const [prop, sel] = rest;
        const loc = page.locator(sel);
        const map = {
          visible: () => loc.isVisible(),
          hidden: () => loc.isHidden(),
          enabled: () => loc.isEnabled(),
          disabled: () => loc.isDisabled(),
          checked: () => loc.isChecked(),
          editable: () => loc.isEditable(),
          focused: () => loc.evaluate((el) => el === document.activeElement),
        };
        if (!map[prop]) throw new Error("is <visible|hidden|enabled|disabled|checked|editable|focused> <sel>");
        return { out: String(await map[prop]()) };
      }

      case "console": {
        if (rest.includes("--clear")) {
          consoleMsgs.length = 0;
          return { out: "cleared" };
        }
        const list = rest.includes("--errors")
          ? consoleMsgs.filter((m) => m.type === "error" || m.type === "warning")
          : consoleMsgs;
        return { out: list.map((m) => `[${m.type}] ${m.text}`).join("\n") || "(none)" };
      }
      case "network": {
        if (rest.includes("--clear")) {
          netEvents.length = 0;
          return { out: "cleared" };
        }
        return {
          out:
            netEvents
              .map((n) => (n.failure ? `FAIL ${n.url} (${n.failure})` : `${n.status} ${n.url}`))
              .join("\n") || "(none)",
        };
      }

      case "viewport": {
        const [w, h] = (rest[0] || "").split("x").map(Number);
        if (!w || !h) throw new Error("viewport <WxH>  e.g. 375x812");
        await page.setViewportSize({ width: w, height: h });
        return { out: `${w}x${h}` };
      }
      case "wait": {
        if (rest[0] === "--load") await page.waitForLoadState("load");
        else if (rest[0] === "--networkidle") await page.waitForLoadState("networkidle");
        else await page.waitForSelector(rest[0], { timeout: 15000 });
        return { out: "ok" };
      }

      case "screenshot": {
        let sel = null,
          out = null,
          full = false,
          clip = null;
        for (let i = 0; i < rest.length; i++) {
          const a = rest[i];
          if (a === "--full") full = true;
          else if (a === "--clip") {
            const c = (rest[++i] || "").split(",").map(Number);
            if (c.length === 4 && c.every((n) => Number.isFinite(n))) {
              clip = { x: c[0], y: c[1], width: c[2], height: c[3] };
            } else throw new Error("--clip expects x,y,w,h");
          } else if (a.endsWith(".png") || a.includes("/") || a.startsWith("~")) out = expand(a);
          else sel = a;
        }
        out = out || path.join(SHOT_DIR, `shot-${Date.now()}.png`);
        if (sel) {
          const t = target(sel);
          const el = t.handle || (await page.$(t.selector));
          if (!el) throw new Error("not found: " + sel);
          await el.screenshot({ path: out });
        } else {
          await page.screenshot({ path: out, fullPage: full, ...(clip ? { clip } : {}) });
        }
        return { out };
      }
      case "responsive": {
        const prefix = expand(rest[0] || path.join(SHOT_DIR, `resp-${Date.now()}`));
        const orig = page.viewportSize();
        const saved = [];
        for (const [name, w, h] of [
          ["mobile", 375, 812],
          ["tablet", 768, 1024],
          ["desktop", 1280, 720],
        ]) {
          await page.setViewportSize({ width: w, height: h });
          const p = `${prefix}-${name}.png`;
          await page.screenshot({ path: p });
          saved.push(p);
        }
        if (orig) await page.setViewportSize(orig);
        return { out: saved.join("\n") };
      }

      case "snapshot": {
        const SEL =
          "a, button, input, textarea, select, [role=button], [role=link], [role=textbox], [role=checkbox], [onclick], [tabindex]:not([tabindex='-1'])";
        for (const h of refs.values()) h.dispose().catch?.(() => {});
        refs = new Map();
        const handles = await page.$$(SEL);
        const lines = [];
        let n = 1;
        for (const h of handles) {
          const info = await h.evaluate((el) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const visible = r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
            const role = el.getAttribute("role") || el.tagName.toLowerCase();
            const name = (
              el.getAttribute("aria-label") ||
              el.getAttribute("placeholder") ||
              el.value ||
              el.innerText ||
              el.getAttribute("title") ||
              ""
            )
              .trim()
              .replace(/\s+/g, " ")
              .slice(0, 60);
            return { visible, role, name };
          });
          if (!info.visible) {
            await h.dispose();
            continue;
          }
          const ref = `@e${n++}`;
          refs.set(ref, h);
          lines.push(`${ref} [${info.role}]${info.name ? ` "${info.name}"` : ""}`);
        }
        return { out: lines.join("\n") || "(no visible interactive elements)" };
      }

      case "status":
        return { out: `running · url=${page.url()} · refs=${refs.size} · console=${consoleMsgs.length}` };
      case "stop":
        setTimeout(shutdown, 30);
        return { out: "stopping" };
      case "restart": {
        await browser.close().catch(() => {});
        await launch();
        refs.clear();
        consoleMsgs.length = 0;
        netEvents.length = 0;
        return { out: "restarted" };
      }
      default:
        return { err: `unknown command: ${cmd} (try: browse help)` };
    }
  }
}

function str(v) {
  if (v === null || v === undefined) return String(v);
  return typeof v === "object" ? JSON.stringify(v) : String(v);
}
function expand(p) {
  return p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p;
}

const HELP = `browse — persistent headless Chrome (state persists between calls)

nav      goto <url> · url · reload · back
read     text · html [sel] · js <expr> · eval <file>
act      click <sel> · hover <sel> · fill <sel> <val> · type <text> · press <key>
         select <sel> <val> · scroll [sel]
find     snapshot [-i]            list interactive elements as @e refs
assert   is <visible|hidden|enabled|disabled|checked|editable|focused> <sel>
shots    screenshot [sel] [path] [--full] [--clip x,y,w,h]
         responsive [prefix]      mobile + tablet + desktop
inspect  console [--errors|--clear] · network [--clear]
view     viewport <WxH> · wait <sel|--load|--networkidle>
daemon   status · stop · restart

selectors: a CSS selector, or an @ref from the last snapshot.`;
