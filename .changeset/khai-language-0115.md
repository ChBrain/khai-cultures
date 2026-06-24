---
"@chbrain/khai-cultures": patch
---

Bump @chbrain/khai-language to ^0.1.15, which registers a set of South Asian, Central Asian, and Middle Eastern languages (Marathi, Kannada, Malayalam, Hebrew, Pashto, Kyrgyz, Tajik, Turkmen, and Azerbaijani, among others) and extends the scriptio-continua handling to the Indic scripts (Devanagari, Bengali, Gurmukhi, Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam, and Sinhala), measuring paragraph span length in characters rather than whitespace tokens so their prose validates correctly. This unblocks staging the South Asian, Central Asian, and Middle Eastern nations, the next region. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
