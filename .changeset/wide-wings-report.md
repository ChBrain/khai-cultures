---
---

Fix the `version` script to Prettier-format `registry.json` after the registry build,
so the changesets-bot Version Packages PR passes `format:check` (the build rewrites
registry.json but did not format it, failing khai-tests on the release PR). Tooling
only — empty changeset.
