---
---

A wall that reads whether prose is spelled in the language it declares.

Found while moving Madrid's tongue out of the umbrella: its body reads _"la
conjugacion del verbo"_, _"la distincion entre la ese y la zeta"_, _"el
laismo"_ — correct Spanish with every accent removed. Third in a row after
`es_es_ct` and `es_es_nc`, which is where three accidents stop being accidents.

**Measured: 50 files** declare a language whose other files carry diacritics and
carry none themselves. Nothing in this repository folds accents — no build step,
no generator — so these were written this way and have sat unread since.
Thirteen walls, and none of them looked.

**The symptom covers two different faults.** Thirty-nine of the fifty are
`cape_verde` and `guinea_bissau`, declaring `language: pt` over prose that reads
_"a lingua-mae das ilhas"_ and _"undi tudu genti ta bin"_. That is Kabuverdianu
and Guinea-Bissau Kriol, written in orthographies that use almost no accents.
The prose is right and the frontmatter is wrong — and the house already knows
it, since both cultures carry two files each declaring `kea` and `pov`
correctly. That is the third appearance of the `order_voice_from_inside.md`
finding, from a new direction. The wall names both cures and chooses neither,
because unaccented Portuguese and accurate Kriol are the same bytes to a
counter.

**Why the wall asks about zero marks and not about too few.** Spanish cannot be
spell-checked from this corpus, and the corpus proves it: `que`/`qué`,
`como`/`cómo`, `solo`/`sólo`, `esta`/`está`, `paso`/`pasó`, `mas`/`más` all
occur here in both spellings, correctly, because both are real words. There are
~4,800 word-level suspects house-wide across fifteen languages and not one is
decidable by machine; no offline dictionary exists here to make them so. What is
decidable, with no dictionary and no false positive, is that sixty or more words
of running prose in an accented language with not one combining mark is wrong.
That is the only question asked. Which word is missing which accent is a
reading, and a reading is not a counter's business.

Which languages count as accented is decided from the house's own corpus — a
language needs eight files and a clear majority of them carrying marks — so
there is no external list to drift.

**Held as a ratchet**, on prose a change writes. Renames are followed and
compared by content: every culture leaving the umbrella moves its tongue byte
for byte, and charging the mover for prose they never touched would push that
work into exactly the mixed change the limit at #608 forbids. Verified both
ways — the navarre range is spared, a flattened `persona_fermin` is refused.

Fifty files are flat today and the house stays green. Re-accenting them in an
afternoon to clear a counter would be fifty files nobody read, and thirty-nine
of them would be wrong.

Adds `tests/diacritic_conformance.mjs`, seven unit tests in `house.test.mjs`,
`management/orders/order_the_written_accent.md`, and the `diacritics` gate.
