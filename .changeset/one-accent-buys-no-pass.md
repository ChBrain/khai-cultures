---
---

**One stray accent used to buy a whole file a pass, and the file it bought one
for was the file the wall was written to catch.**

`order_the_written_accent.md` already held this repair as a Target, with a
condition: _"tighten from zero marks to a density floor once the fifty are
clear"_. The condition assumed the blind spot only hid files already counted.
It does not, and that is why this is taken early.

The wall asked whether a file carried **one** combining mark. That is the same
question asked of three hundred words as of sixty, so a single character bought
a pass. Walking `guinea_bissau` showed what it costs: three of its twenty-one
mislabelled files were invisible for exactly that reason, one stray accent each.
Then the worse one:

> `position_language_es_es_md.md` still reads _"la conjugacion del verbo"_, _"la
> distincion entre la ese y la zeta"_, _"el laismo"_ — and the wall could not
> see it, because `español`, `América` and `acompaña` survived.

That is the file this order opens with. **A wall that cannot see its own founding
example is not measuring what it says it measures**, and leaving it standing
while more prose is written against it is the expensive choice.

## The question is now about density, and still never about a word

A file is flat when it holds at most **15%** of the marks its own language
carries over prose that long. The density is the language's own **median**
marks-per-word, taken from the corpus exactly as `accentUsing` already takes
membership from it — no external list, no dictionary. The median and not the
mean, because the flat files are in that corpus too and a mean would let them
drag down the line they are measured against.

The word-level guarantee is untouched and has its own test. `que`/`qué`,
`esta`/`está`, `mas`/`más` are real pairs of real words, both spellings occur
correctly in this house, and no counter may choose between them.

## Two guards, because a bare rate would be useless

The house spans three orders of magnitude — Sesotho at 3.3 marks per hundred
words, Vietnamese at 613 — and the low tail runs **continuously** through
legitimate Sesotho. There is no global gap to cut at. So the comparison is
always to the file's own language, and it is only made where that language would
owe at least **ten** marks over prose this long. That is `FLOOR`'s argument
applied to marks: a language that would owe four cannot be said to be missing
them. Lesotho and San Marino fall below the line and are not scored, correctly.

**A Poisson tail test was tried first and is wrong.** Marks cluster by topic and
by name, so the variance is nothing like Poisson: at λ 1318 the tail is
razor-thin and a perfectly sound Vietnamese file of 933 marks scored p = 0. It
flagged ordinary variation in dense languages, and it is recorded here so nobody
reaches for it again.

## The threshold sits in a measured gap

15% and 20% catch the same four files, and nothing lies between 11.6% and 21.1%,
so the choice is not delicate. All four are flagrant: accent-stripped French
Canadian (`Quebec`, `Revolution tranquille`, `etre maitre`, `Amerique`,
`eglise`) and accent-stripped Spanish (`distincion`, `acompana`, `preterito`,
`laismo`).

## It still does not catch everything, deliberately

Just above the plateau sits `es_gq` at 21%, **partly** stripped: `numero`,
`prestamo`, `lexico` flat while `español`, `género` and `ndowé` stand. Partial
stripping is a continuum, a counter cannot cut it, and that is the same limit
the word-level paragraph states. The wall catches the flagrant case and says so.
It claims no more, and the order now carries the remainder as its own Target.

## What it reports

|                    | before | after  |
| ------------------ | ------ | ------ |
| zero-mark findings | 28     | 28     |
| near-zero findings | 0      | **4**  |
| total              | 28     | **32** |
| diacritics tests   | 7      | **13** |

One fault of my own, found by running the gate against a probe rather than by
re-reading the code: the finding still said _"not one mark in it"_ about a file
holding one. This wall exists because a file claimed something untrue about
itself, so its findings now report what they measured — `1 mark(s) in 279 words
where this language carries about 32`. That has a test.

`accentUsing` now returns a **Map** rather than a Set, so `.has(lang)` reads
exactly as before and `.get(lang)` carries the density. A bare Set is still
accepted and means "accented, density unknown", degrading to the zero-mark
question alone — it can only report less, never more, which is the safe
direction for any caller written against the old shape. That degradation has a
test of its own.

No package content changes here; this is the governance lane. The four new
findings join the standing count and are paid by whoever walks those cultures,
the way the original fifty were.
