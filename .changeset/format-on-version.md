---
"@chbrain/khai-cultures": patch
---

Format release output: the `version` script now runs `npm run format` after the registry build, so the bot-generated "Version Packages" PR ships a prettier-clean `registry.json` (and CHANGELOG) and no longer fails the `format:check` gate.
