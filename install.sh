#!/usr/bin/env bash
# Symlink every skill in this repo into the Claude skills directory.
# A "skill" is any top-level directory containing a SKILL.md.
# Idempotent: re-running fixes stale links and leaves correct ones alone.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
mkdir -p "$DEST"

for skill in "$REPO"/*/; do
  [ -f "$skill/SKILL.md" ] || continue
  name="$(basename "$skill")"
  target="${skill%/}"
  link="$DEST/$name"

  if [ -L "$link" ]; then
    [ "$(readlink "$link")" = "$target" ] && { echo "ok:       $name"; continue; }
    rm "$link"
  elif [ -e "$link" ]; then
    echo "skip:     $name (exists and is not a symlink)"
    continue
  fi

  ln -s "$target" "$link"
  echo "linked:   $name -> $target"
done
