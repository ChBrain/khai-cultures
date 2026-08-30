# CLAUDE.md, the Cultures house

**Read `management/house_instructions.md` first, and follow it.** It holds every
rule of this house — what lives here, branching, versioning, the gates, coverage,
the tongues, how a culture is written — and it is provider-neutral, so it is the
same word given to every agent. Then read `management/management_instructions.md`,
the voice layer: who speaks, through which Persona, and how the company
collaborates.

This file holds only what is true of Claude Code and of no other tool. Nothing
here overrides the house rules; if the two ever disagree, the house rules win and
this file is wrong.

## Claude Code specifics

- **This file loads automatically; the house rules do not.** Open
  `management/house_instructions.md` at the start of the work, not when a gate
  fails. A rule you have not read is a rule you will break.
- **Never `--no-verify`.** The husky hooks are the last gate that runs before a
  push, and the one gate CI cannot repeat.
- **Never merge.** Open the pull request and stop; merge and deploy are the
  Human's authority.
- Run the gates through `npx`, from the repository root
  (`npx khai-guard`, `npx khai-tests`, `node tests/<gate>.mjs`).
- Do not report a test count or a gate result you have not just run. CI publishes
  every check on the pull request, so a claim about them in a PR body is either
  redundant or wrong.
