---
"@chbrain/khai-cultures": patch
---

Register Gilbertese (gil), Tuvaluan (tvl), and Nauruan (nau) in the khai.languages exempt list. These three are absent from franc's 329-language model, so they cannot pass the deterministic gate (they mis-read as Maori/Samoan/Marshallese) and must ride the NLP-verification layer via the exempt path - the route documented in khai LANGUAGES.md. Adding them to the franc map would false-fail every paragraph of genuine native prose; the exempt list is the correct and only safe mechanism. This unblocks staging Kiribati, Tuvalu, and Nauru in their native tongues. Config-only change, no content; existing cultures still validate, same culture count.
