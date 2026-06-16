# skills
Home-spun agent skills

## Skills

- **[browse](browse/)** — persistent headless-Chrome CLI for screenshots and QA of local/live web apps (Playwright + system Chrome, no telemetry).
- **[voice](voice/)** — write in my own voice across registers (technical essays, LinkedIn, email); example-driven, with a leverage gradient from draft-for-me to sharpen-only.

## Install

Run `install.sh` to symlink every skill in this repo into `~/.claude/skills/` so Claude Code discovers them, then run any one-time setup from each `SKILL.md`:

```bash
./install.sh
```

The script is idempotent — re-run it after adding a skill. Override the target dir with `CLAUDE_SKILLS_DIR`.
