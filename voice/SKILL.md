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

> Triangulated so far mainly from **technical essays**.
> The deliberate-moves overrides below are confirmed identity-level (they predate AI).
> Treat the four dimensions as likely-constant but provisional until email and LinkedIn add their own samples.

- **Voice (how it sounds):** First person ("I") for personal stakes and narrative entry; shifts to inclusive "we" when developing an argument. Educated but never stuffy — academic rigor with blogger directness. The reader is an intelligent peer, not a student.
- **Tone:** Intellectually confident, not arrogant — states positions clearly and acknowledges uncertainty directly, without hedge-word pileups. Dry, understated humor, sparingly. Enthusiasm for ideas and systems, never for personalities or trends. Argues through analysis and evidence; does not moralize.
- **Style:** Medium-long sentences with internal complexity (embedded clauses, parentheticals, appositives), broken by short punchy sentences for emphasis. Italics for term introduction and conceptual emphasis. No exclamation points. Cross-domain analogy as a habit of mind; coins compact metaphor-labels rather than padding.
- **Structure:** Claim-then-unpack; assertion–concession–restatement for contested points. Openings establish stakes through context, not hooks. Closings synthesize at a higher level of abstraction with qualified affirmation (hopeful, immediately tempered) — never a mechanical summary.
- **Signature moves:** The "ontological" lens (what does this model assume about reality?); historical grounding via named figures + years; intuition before formalism; bold inline "headlines" within paragraphs; honest concession of an argument's limits; personal-stake disclosure.
- **Recurring themes / values:** Governance, mechanism design, social choice, capital allocation; technology in service of human coordination; cybernetic, self-correcting processes over static point solutions.

### Deliberate moves (override the banned tics below)

These are genuine voice, not slop — they predate AI. Never strip them. Intensity varies by register.

- **Em dashes** — signature punctuation, for interjection and emphasis.
- **Rhetorical questions** — to pivot between sections.
- **Parallel enumeration** — when the content is genuinely parallel.
- **"Said another way" restatement** — to land a key point.

## Banned tics (the negative anchor)

These are the generic-AI tells. Avoid them in every register regardless of the profile above — **except** the deliberate moves in the voice core, which are genuine voice. These bans target *unconscious* slop, not those deliberate moves.

- The "**it's not just X, it's Y**" / "not only… but also" reframe, and contrast-for-effect symmetry.
- **Reflexive tricolons** and rule-of-three lists where two items (or five) would be honest.
- **Inflated transitions:** "Moreover," "Furthermore," "In today's fast-paced world," "In the ever-evolving landscape of."
- **Hype diction:** delve, leverage (as filler), tapestry, realm, underscore, robust, seamless, unlock, harness, navigate the complexities, game-changer.
- **Throat-clearing:** "It's worth noting that," "It's important to note," "Needless to say."
- **Empty closers:** an "Ultimately," / "At the end of the day" paragraph that just restates the piece; rhetorical-question-then-answer endings; "In conclusion."
- The "—and that's okay" cadence. (Deliberate em-dash use is genuine voice — see the voice core.)
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
