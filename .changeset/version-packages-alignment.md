---
---

Governance: adopt the aligned Version-Packages flow. Add the `changeset-check`
gate, bump `@chbrain/khai-guard` to `^0.1.16`, drop the trailing `npm run format`
from the `version` script, and flip the CLAUDE.md doctrine so a culture add carries
a `minor` changeset (steered through the Version Packages PR; the reconcile keeps
`minor = count` and the patch at 0). Ships no package content: an empty changeset.
