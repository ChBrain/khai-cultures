# CLAUDE.md, the Cultures house

This repository is a **khai content house**: a house dedicated to cultures. It is
structured and governed exactly like a khai **plays** house, but its content
folder is **`cultures/`** (indexing a `cultures` collection) instead of `plays/`.

## What lives here

- `cultures/` holds the cultures: each a subdirectory of khai instances (the
  reused canon types — persona, place, position, process) anchored by a
  `culture_*.md`. This is the only content.
- The rest is the wiring and the gates, raised once and not improvised.

## The house is the Estate

`README.md` is this house's **Estate identity**: the production that answers for
the run. Every culture logs the house in its `Estate` (E), and the conformance
test checks the link resolves. A culture with no Estate is not yet a production.

## Branching

Computed, not chosen. Let the guard pick the lane:

```
npx khai-guard branch <topic>
```

- `culture/<topic>` owns `cultures/**` (the content).
- `governance/<topic>` owns the gates and config (`.github/**`, `.husky/**`,
  `khai-guard.config.json`, `tests/**`, `CLAUDE.md`, `GEMINI.md`, `README.md`,
  `REFERENCE.md`, `REFERENCES.md`, `management/**`).
- `changeset-release/*` is a bot-controlled general lane for version releases.

Never `--no-verify`. Never merge; open the PR and stop.

## Versioning

The minor version IS the culture count, computed not chosen. `khai-tests registry
build` (run by the `version` script) sets the version from the count:
`0.<count>.0` (the minor is the count, the patch resets to 0), reconciling both
`package.json` and `registry.json`. The build is the single writer of the
version; never hand-edit it. A fresh, empty house stays `0.0.x`.

- **Adding a culture** -> no changeset for the count. The PR runs `khai-tests
registry build`, which moves the minor to the new culture count and resets the
  patch to 0; `changeset publish` ships it.
- **A non-content change** (governance, formatting, a fix to existing content) ->
  a `patch` changeset; it ships at the same culture count.

## Protection

Content is CC-BY-NC-SA, code is MIT (see `LICENSE` and `LICENSE-CODE`); sources
are credited where they are in the public domain, never claimed. `main` is
protected: pull requests and the gate checks (`khai-tests`, `khai-guard`,
`khai-branch-scope`) are required before merge.
