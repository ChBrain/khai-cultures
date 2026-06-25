---
"@chbrain/khai-cultures": patch
---

Bump @chbrain/khai-language to ^0.1.20, which registers the West African creoles and lingua francas in the detector itself: Guinea-Bissau Kriol (pov), Krio (kri), and Nigerian Pidgin (pcm), so a culture authored with one of those as its base code now gates natively rather than needing a project-side exempt entry. The frontmatter exempt list (`khai.languages`) and the detector registrations are complementary: the bump removes future friction for the African and creole-speaking regions without requiring any change here today, since the cultures shipped so far author creoles as prose flavour over a detector-known base (en/fr/pt/nl). A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
