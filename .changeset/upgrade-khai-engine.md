---
"@chbrain/khai-cultures": patch
---

Upgrade the khai engine (khai-tests 0.1.26, khai-language 0.1.4, khai-arch 0.1.19, khai-guard 0.1.12, khai-rules 0.1.6). The registry build now stamps each entry with its `kind` and folds in the `iso` from a `geo.json` sidecar, so `registry.json` gains `kind: "culture"` and `iso` on every entry.
