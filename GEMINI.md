# GEMINI.md — Cultures house

**Read `management/house_instructions.md` first, and follow it.** It holds every
rule of this house — what lives here, branching, versioning, the gates, coverage,
the tongues, how a culture is written — and it is provider-neutral, so it is the
same word given to every agent. Then read `management/management_instructions.md`,
the voice layer: who speaks, through which Persona, and how the company
collaborates.

This file holds only what is true of the Gemini CLI and of no other tool. Nothing
here overrides the house rules; if the two ever disagree, the house rules win and
this file is wrong.

Until this file said so, the rules were only ever written down in `CLAUDE.md`,
and this file carried a shortened copy of the voice layer instead. An agent
briefed from it was never told that a changeset is required or what a chapter
must contain, and it wrote what it had been asked for.

## Gemini CLI specifics

- **This file loads automatically; the house rules do not.** Open
  `management/house_instructions.md` at the start of the work, not when a gate
  fails. A rule you have not read is a rule you will break.
- **Never `--no-verify`.** The husky hooks are the last gate that runs before a
  push, and the one gate CI cannot repeat.
- **Never merge.** Open the pull request and stop; merge and deploy are the
  Human's authority.

_Nothing else here yet. Anything that turns out to be true of this tool and not
of the others belongs in this section — and anything true of every tool belongs
in the house rules, not here._
