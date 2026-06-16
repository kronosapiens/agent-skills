# skills
Home-spun agent skills

## Skills

- **[browse](browse/)** — persistent headless-Chrome CLI for screenshots and QA of local/live web apps (Playwright + system Chrome, no telemetry).
- **[voice](voice/)** — write in my own voice across registers (technical essays, LinkedIn, email); example-driven, with a leverage gradient from draft-for-me to sharpen-only.

## Install

Symlink a skill into `~/.claude/skills/` so Claude Code discovers it, then run any one-time setup from its `SKILL.md`:

```bash
ln -s "$PWD/browse" ~/.claude/skills/browse
```
