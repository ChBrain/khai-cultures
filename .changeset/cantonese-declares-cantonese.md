---
---

**`yue/position_language_yue.md` is written in Cantonese and declared `zh`.**

The prose is real written Cantonese - the entering tone kept from Middle Chinese,
the six-to-nine tones, and the sentence-final particles 「啊、喇、咩、㗎、囉、喎、啦」
that no Mandarin reader would write. Its frontmatter said `zh`.

Every other language directory in this package declares its own code: `gsw/`
declares `gsw`, `bar/` declares `bar`, `lzh/` declares `lzh`, `cu/` declares `cu`.
Four files declare a BCP-47 private-use tag whose primary subtag is the directory
(`de-x-hes`, `de-x-mos`, `de-x-brl`, `fr-x-gallo`), which is the house's deliberate
convention for a variety with no ISO code. **Cantonese was the only file declaring
a different language.**

`build.mjs` reads `language:` into the generated contents table, so the README
carried the mismatch in plain sight: _Cantonese ... `zh`_. It now reads `yue`.

## What this does and does not claim

`yue` is not in `khai-language`'s detector map - only `zh: "cmn"`, Mandarin - so
declaring `yue` makes this file **honestly exempt** rather than nominally checked
against the wrong language. This package is in any case outside the reach of
`validateProjectLanguages` today and stays `private: true` until it owes its own
language check, as its README says. So nothing was actively mis-checking this
file; it was declaring the wrong code with nothing yet looking. The fix is for
when that check lands.

The language count does not move: 68 languages, 151 varieties, version 0.68.0. A
directory is a language iff it holds its own anchor, and `yue/` always did.

## What is left

`nv/position_language_nv.md` describes Navajo **in English** and declares `en`,
which is honest about the prose and wrong about the practice: a tongue in this
house is written in the language it describes. That one needs Navajo, not a
one-line edit, and it is not in this change.

Once it is clear, the agreement between a variety's directory and its `language:`
belongs in `tongues_standalone.mjs` as a wall - the header there already promises
that "every variety carries its own `language:` so it is self-describing", and it
checks that the field exists and not that it is the right one. Two files were
wrong and one still is, so the wall waits for the second fix rather than landing
red.
