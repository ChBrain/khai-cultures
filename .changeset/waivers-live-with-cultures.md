---
---

Move the coverage waivers out of `tests/` and into the cultures they waive. The ratchet shipped with its waiver file at `tests/company-coverage-waivers.json`, which the first PR needing a waiver could not write: `tests/**` is a test path, so a culture PR touching it fails the source/test separation gate, and the governance branch that may touch it is the one branch that never touches a culture. A waiver now lives at `cultures/<id>/coverage-waivers.json`, inside the lane of the PR that needs it and inside the diff that reviews the casting it excuses. `node tests/company_coverage.mjs --report` now lists every waiver in the house with its reason, so auditing stays one command. Governance only; the house ships nothing.
