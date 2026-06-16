---
name: voice
description: >
  Write in Daniel's personal voice instead of generic AI prose. Routes to
  register-specific guidance (technical essays, LinkedIn posts, emails) plus a
  leverage gradient that decides whether to fully draft, scaffold, or only
  sharpen. Use whenever drafting, ghostwriting, rewriting, or editing any prose
  meant to sound like the user — emails, posts, essays, updates, replies,
  announcements — even when "my voice" is not said explicitly.
---

# voice

One skill, one voice core, many registers.
The voice is captured by **example, not just by rule**: the samples in each register file are the ground truth, and the prose below is only the articulable scaffolding around them.

This file is the constant — who the writer is, the tics to avoid, and how much to lean on automation.
Each file in `registers/` adds the register-specific texture (format, intent, and calibrated samples).

## How to use this skill

1. **Identify the register** and read the matching file in `registers/` (technical essay, LinkedIn, email, …).
2. **Read the voice core and banned tics below**, then the register file's format notes and samples.
3. **Pick the leverage mode** — use the register's default (table below) unless the user asks for more or less.
4. **Produce the output, then run the Self-check** before showing it.
5. **Calibrate**: when the user edits your draft, run the edit audit and propose updates to the profile or samples.

## The leverage gradient

The skill knows its own altitude.
Low-stakes, high-volume writing should be drafted for the user; high-value thought leadership should never be ghostwritten — there the skill is a thinking partner, not an author.

| Mode | What the skill does | Hand-off |
|------|--------------------|----------|
| **Draft-for-me** | Produces a finished draft in the user's voice from a short brief. | User lightly edits. |
| **Scaffold** | Offers 2–3 angles or an outline → user picks → drafts → user refines. | Shared authorship. |
| **Sharpen-only** | The user writes. The skill critiques the argument, tightens prose, and flags the user's own tics. **Never ghostwrites.** | User owns every sentence. |

Dispatch (default mode per register; override on request):

| Register | File | Default mode |
|----------|------|--------------|
| Technical essay | `registers/technical-essay.md` | Sharpen-only |
| LinkedIn post | `registers/linkedin.md` | Scaffold |
| Email | `registers/email.md` | Draft-for-me |

If the register doesn't match a file, ask which register fits, or fall back to the closest one and say so.

## Voice core (the constant)

> **Status: not yet calibrated.** Until this is filled in, derive the voice from the samples in the relevant register file and lean conservative.
> Fill these in from real samples over time; keep each claim specific enough to act on.

- **Voice (how it sounds):** _TODO — the stable personality across everything._
- **Tone (attitude / warmth):** _TODO._
- **Style (word & sentence choices):** _TODO — diction, sentence length, rhythm, punctuation habits._
- **Structure (how ideas are ordered):** _TODO — how arguments open, build, and close._
- **Signature moves:** _TODO — the moves that are recognizably the user's._
- **Recurring themes / values:** _TODO — what the writing keeps returning to._

## Banned tics (the negative anchor)

These are the generic-AI tells. Avoid them in every register regardless of the profile above.

- The "**it's not just X, it's Y**" / "not only… but also" reframe, and contrast-for-effect symmetry.
- **Reflexive tricolons** and rule-of-three lists where two items (or five) would be honest.
- **Inflated transitions:** "Moreover," "Furthermore," "In today's fast-paced world," "In the ever-evolving landscape of."
- **Hype diction:** delve, leverage (as filler), tapestry, realm, underscore, robust, seamless, unlock, harness, navigate the complexities, game-changer.
- **Throat-clearing:** "It's worth noting that," "It's important to note," "Needless to say."
- **Empty closers:** an "Ultimately," / "At the end of the day" paragraph that just restates the piece; rhetorical-question-then-answer endings; "In conclusion."
- **Em-dash overuse** and the "—and that's okay" cadence.
- **Symmetry and parallelism for their own sake** when the content isn't actually parallel.
- Title-case headers, emoji bullets, or bolded label-lists unless a sample shows the user actually writes that way.

## Self-check (run before showing output)

1. **Sound:** read it against the register samples — does the rhythm and diction match, or does it read as competent-but-generic?
2. **Tics:** scan for every banned tic above. Cut on sight.
3. **Format:** does it obey the register file's length and structure norms?
4. **Altitude:** did the leverage mode hold? (In sharpen-only, you must not have ghostwritten.)

## Calibration (this is a living document)

- **Edit audit:** when the user edits your draft, note *what* they changed and *why it's more them*. Propose a concrete addition to the voice core or a new sample — don't just absorb it silently.
- **Adding samples:** append to the `## Samples` section of the relevant register file using the format documented there. More samples, across more contexts, beats longer rules.
- Prefer fixing the **examples** over adding more **rules**; rules can't capture what only samples carry.
