# Register: Technical essay

For the public technical blog (kronosapiens.github.io): long-form essays on governance, mechanism design, social choice, capital allocation, and technology's relationship to human coordination.

## Leverage mode

**Default: Sharpen-only.**
These are high-value thought leadership.
The user writes; this skill pressure-tests the argument, tightens prose, and flags the user's *own* tics.
Do **not** ghostwrite a flagship essay unless explicitly dropped to a lower mode.

**Sub-tier — Draft-from-commits (opt-in).**
For technical *reports* and follow-up posts (e.g. an implementation write-up derived from a branch of work), the user may explicitly ask the skill to draft from commit history or notes.
In that mode: draft freely, but obey the profile and samples below.
The user acknowledges AI assistance publicly when drafting this way — surface that norm; don't quietly ghostwrite.

## Audience & intent

- **Audience:** intelligent peers — practitioners and researchers in web3 governance, mechanism design, and social choice. Never write down to them.
- **Intent:** stake a position, develop an argument carefully, and advance the practice — not to explain basics or chase engagement.

## Format & structure

- **Length:** substantial — 2,000–5,000+ words. No short posts.
- **Scaffold:** italic *Abstract* (bold the key terms) → optional acknowledgments line → linked table of contents → Roman-numeral sections (`# I.`, `# II.`) → often a `# VI. Putting It All Together` + `### Final Thoughts` → optional `# Appendix` for tangents that would derail the spine.
- **Arc:** context/motivation → problem space → thesis → implications → synthesis.
- **Paragraphs:** medium (3–6 sentences), claim-then-unpack. Assertion–concession–restatement for contested points. Occasional single-sentence paragraph for emphasis.
- **Grounding:** every abstract claim is paired with data, a concrete example, a historical parallel, or a personal anecdote. No purely abstract stretch longer than a paragraph.
- **Math:** intuition first, formalism second — plain-language motivation before any formula, interpretation after. Math clarifies, never decorates.
- **Asides:** `> Note:` blockquotes for skippable technical asides and concrete examples. Cross-reference prior essays with inline links, building a web of self-reference.

## Voice notes for this register

The voice core applies in full. This register runs the deliberate moves *hot* — em dashes, rhetorical pivots between sections, deliberate parallel enumeration, and "said another way" restatement are all expected here. Plus, specific to the essays:

- **The ontological lens is the signature device.** Name the lens, often in bold (**Ontologically**, **Computationally**), then analyze through it — ask what each model assumes about reality.
- **Coin compact metaphor-labels** rather than padding: "a machine for converting subjectivity into objectivity," "phenomenological bare metal," "a solar panel for governance."
- **Ground in named figures + years** ("Hungarian chess master Arpad Elo," "American psychometrician L. L. Thurstone in 1927"); each citation does argumentative work.
- **Cross-domain analogy is the engine of explanation** (the 2008 crisis, optimistic rollups, white light through a prism, Archimedes' lever).
- **Bold inline "headlines"** — a bolded sentence mid-paragraph carries the takeaway.
- **Close on qualified affirmation** — hopeful, immediately tempered; restate the thesis at higher abstraction.

## Avoid (register-specific)

- Everything in the SKILL.md banned-tics list **except** the voice-core deliberate moves.
- **No bullet lists in body prose** — only in structured enumerations, then return to prose immediately.
- No emojis, memes, or internet slang.
- No meta-commentary about "this blog post" or "my newsletter."
- No jargon without explanation.
- No moralizing or preaching — argue through analysis and evidence.

## Samples

> Add 2–5 real excerpts the user considers unmistakably theirs.
> A "competent but soulless" counter-example is also useful — label it clearly.
> Use this format for each:
>
> ```
> ### Sample N — <title or context>
> **Why it's mine:** <one specific line on what makes this the user's voice>
> **Type:** anchor | counter-example
>
> <the excerpt>
> ```

### Sample 1 — "The Pairwise Paradigm," on spectral methods
**Why it's mine:** the ontological lens named and analyzed through, plus a coined metaphor-label instead of padding. This is the most load-bearing move.
**Type:** anchor (primary)

Pairwise preferences themselves do not determine rankings or weights.
Rather, they must be _converted_ into weights using an algorithmic process, a "machine for converting subjectivity into objectivity."

**Ontologically**, spectral methods invert the Bradley-Terry model by taking _interactions_ as the only knowable reality; weights are understood as _summary statistics_, not hidden truths.

### Sample 2 — "The Pairwise Paradigm," on the history of spectral methods
**Why it's mine:** grounds a concept in a named figure + year, then explains it through a cross-domain analogy.
**Type:** anchor

Spectral methods have a history dating back to German mathematician [Edmund Landau](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem), who in 1915 described how they could be used to judge the outcomes of competitions.
Techniques for decomposing a graph into these components are known as "spectral methods" after the "spectrum" of latent values they reveal (just as white light is divided into a "spectrum" of constituent colors).

### Sample 3 — "The Pairwise Paradigm," closing synthesis
**Why it's mine:** aphoristic metaphor-label as synthesis, then a qualified-affirmation close — hopeful, immediately tempered, never a mechanical summary.
**Type:** anchor

The net effect is that of an always-on social choice "sensor" -- a solar panel for governance -- collecting ambient preference information and converting it into actionable outputs in real-time.

The idea of sustaining a complex public goods funding ecosystem with so little effort might seem implausible, and the continued development of these techniques will certainly surface new challenges and limitations.
And yet, the arguments have been laid out, and these are the conclusions we've drawn.

### Sample 4 — "The Pairwise Paradigm," the AI appendix
**Why it's mine:** dry, understated humor and direct second-person address; states a position plainly after naming it; closes a hard point on a borrowed line.
**Type:** anchor

Astute readers may have detected a certain _coolness_ towards artificial intelligence throughout this essay.
You're not imagining it -- let's address it plainly.

[...]

As Archimedes famously said, "Give me a lever and a place to stand, and I will move the earth."
AI is our lever, but without firm footing, we may lose more than we gain.

### Sample 5 — "Tech in the Age of AI," opening narrative
**Why it's mine:** first-person narrative entry with a bolded inline "headline" carrying dry, self-deprecating humor — the lighter "I" mode rather than the argumentative "we."
**Type:** anchor

Curious about who had made this tool, I found their "About" page.
It looked as though Cursor was made by a half-dozen MIT alumni, just a few years out of undergrad.
**The next generation has come to turn me to glue, I thought to myself.**
