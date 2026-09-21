---
---

**The diacritics wall counted words with an ASCII-only pattern, so it could not
read Greek, Cyrillic, Hebrew, Armenian, Arabic, Devanagari, Georgian, kana or han

- and it did not know.**

`[^\W\d_]{3,}` looks Unicode-aware and is not: `\w` stays ASCII under the `u`
flag, so `\W` matched every letter outside A-Z. **Measured: 1,199 files in this
house hold more than four hundred letters of real prose and scored below `FLOOR`**,
so the wall declined every one of them.

The Greek files show what it cost. `plot_99_o_kosmos_erchetai.md` carries 289
combining marks and was scored at **forty-one words** - the Latin words in its own
scaffolding, _Parent group: positions_, _Project: khai-cultures_. Greek prose with
its accents stripped is the same fault as the Spanish and French this wall was
written for, and the wall could not see one instance of it. A gate that goes quiet
when it cannot read a file passes for the wrong reason.

## What widening adds

`[\p{L}\p{M}]{3,}`, with `\p{M}` riding along so a base letter and its marks count
as one word and not two - which matters in every script that writes a vowel as a
mark. Twenty-three languages enter scope, and none is lost:

`be bg bn div dzo el fa hi ja kk km ky lo mk mn my ne ru si tg th uk ur`

Chinese and Cantonese stay out, correctly: no combining marks, so no accent to
strip. In a script written without spaces `{3,}` counts runs and not words, which
is crude and self-consistent, because the density a file is measured against comes
from the same corpus with the same counter - the argument this wall already makes
for each language's own median over one global rate.

## And it exposed a guard that was only half applied

The first cut of this widening reported **five new findings, all Macedonian, all
of them wrong.** The fault was in the wall, not the prose.

`flat` read `if (n === 0) return lang` **above** the `MIN_EXPECTED` check, so the
density argument covered the thin case and never the empty one - while the wall's
own header claimed both, in the words _"a language that would owe four cannot be
said to be missing them."_

That stayed invisible for exactly as long as the wall could only read Latin,
because a Spanish or French file past `FLOOR` essentially always carries an accent,
so zero marks really was a finding. Macedonian is the counter-example: the only
letters that decompose to a combining mark are **ѓ, ќ, ѐ and ѝ**, all rare, so
`place_ohrid.md` carries none in a hundred and nine words of sound Macedonian,
where its own language owes about two. The guard now covers the empty case.

**Silence proves nothing about a language that had little to say.**

## What it reports

|                                  | before | after                 |
| -------------------------------- | ------ | --------------------- |
| languages the wall scores        | 36     | **59**                |
| files whose prose it cannot read | 1,199  | **0**                 |
| flat findings                    | 10     | **10**, the same      |
| files the guard newly declines   | –      | **5**, all Macedonian |
| diacritics tests                 | 13     | **16**                |

Both halves were verified by breaking them: narrowing the counter back fails the
script test and the corpus test, and restoring the zero-mark short-circuit fails
the Macedonian case alone. No existing finding moved, and the five declined files
were each read: correct Macedonian that happens to contain no ѓ or ќ.

## How this was found

Writing a Yiddish tongue file. Yiddish is written in Hebrew script, the first in
this house, and measuring what the walls would make of it turned up a word counter
that sees thirteen words in two thousand letters. **Yiddish itself is still not
scored** - one file cannot reach `QUORUM`, and `yi` has no detector model either,
so it is exempt twice over. The fix this wall needed was never about Yiddish. It
was about the twenty-three.

No package content changes here; this is the governance lane.
