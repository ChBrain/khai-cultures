---
"@chbrain/khai-cultures": patch
---

Align the house to the upgraded engine: declare the `groups` referencing collection (anchored by `play_`, referencing `cultures`, not counted) and register `nds` (Plattdeutsch) in `khai.languages`; add a `group/*` branch lane; fix the language test (it pointed at the non-existent `root/plays`, silently no-op) to validate `cultures/`; document groups, the registry `kind`/`iso` shape, and the language path in `REFERENCE.md`. `registry.json` gains an empty `groups` array.
