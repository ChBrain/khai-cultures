---
---

Take `@chbrain/khai-tests@0.4.0`, `@chbrain/khai-stage@0.0.25`, `@chbrain/khai-guard@0.3.1`
and `@chbrain/khai-arch@0.1.26`. Ships no package content, so an empty changeset.

`conduct.md`, khai's shared case law for working in any house, ships with
`@chbrain/khai-stage` and is read at `node_modules/@chbrain/khai-stage/conduct.md`.
`CLAUDE.md`, `GEMINI.md` and `management/management_instructions.md` now point at
it, alongside the voice layer and `house_instructions.md`.

Two of its cases are this house's own, measured here first and taken back now as
kit:

- Law 1 cites this house's own `GEMINI.md`, 31 lines against `CLAUDE.md`'s 308 and
  all of them voice: an agent briefed from it had never been told about
  changesets, chapters, coverage or plot zero, and produced 138 findings of
  scaffolding as a result. This house had already fixed the specific file (both
  are thin pointers to `house_instructions.md` now); this PR adds the case-law
  pointer both files were still missing.
- Law 4 cites this house's own gate runner: `npm run preflight` read its wall
  list from `.github/workflows/ci.yml` and reported 10/10 while CI failed all ten
  jobs at `npm ci`, because a new workspace package had shipped without
  regenerating the lockfile, and no log said "lockfile". `khai-tests` 0.4.0 lifts
  that idea into the kit as `khai-tests gates`, which declares the same "used the
  installed `node_modules`, not a fresh `npm ci`" skip unconditionally on every
  run, so the gap can never again be silent. `tests/preflight.mjs` and the
  `preflight` npm script are retired; `khai-guard.config.json` now declares the
  eleven locally runnable walls (all ten `ci.yml` jobs, with `khai-tests` split
  into prettier and the suite) in a `gates` key, and `npm run gates` runs
  `khai-tests gates .`. CodeQL and the release workflow stay CI-only: neither has
  a local equivalent to declare.
