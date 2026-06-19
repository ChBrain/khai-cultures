---
"@chbrain/khai-cultures": patch
---

Correct the authoring contract: a culture's geo (region, ISO) lives in a
per-culture geo.json sidecar, not in play frontmatter (khai frontmatter keys
are closed). Document geo.json as a required per-culture file alongside README
and REFERENCES.
