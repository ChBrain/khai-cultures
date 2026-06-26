---
"@chbrain/khai-cultures": patch
---

Bump @chbrain/khai-language to ^0.1.21 and add Mauritian Creole (mfe) to the khai.languages exempt list, to unblock the Indian Ocean region. 0.1.21 registers Seychellois Creole / Seselwa (crs) in the detector itself (French-lexified but tops cleanly, French well back), so Seychelles gates natively. Its sister creole, Mauritian Morisien (mfe), has no franc model, so it takes the NLP-fallback exempt path instead (the same treatment as Amharic) rather than detector registration. Together these let Mauritius and Seychelles be authored in their true mother-tongue creoles. A dependency-and-config update with no content change and no culture count change; the existing cultures still validate.
