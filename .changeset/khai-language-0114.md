---
"@chbrain/khai-cultures": patch
---

Bump @chbrain/khai-language to ^0.1.14, which registers the East and Southeast Asian languages (Chinese, Japanese, Korean, Vietnamese, Thai, Khmer, Lao, Burmese, and Tibetan) and adds handling for scriptio-continua scripts, the writing systems that do not delimit words with spaces (Han, Japanese kana, Thai, Lao, Khmer, Myanmar, and Tibetan), measuring paragraph span length in characters rather than whitespace tokens so their prose validates correctly. This unblocks staging the East and Southeast Asian nations, the next region. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
