---
khai: order
title: "The Written Accent"
declared: "The Written Accent"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-09"
---

# Order: the Written Accent

**Prose is spelled in the language it declares, or it declares the wrong
language.**

Found while moving Madrid's tongue out of the umbrella. Its body reads _"la
conjugacion del verbo"_, _"la distincion entre la ese y la zeta"_, _"el laismo"_
— correct Spanish with every accent removed. It was the third such file in a row
after `es_es_ct` and `es_es_nc`, and three in a row is not three accidents.

Nothing in this repository folds accents. There is no build step, no generator,
no script anywhere that strips a combining mark. These files were written this
way and have sat unread ever since. Thirteen walls, and not one of them looked
at whether the prose was spelled in the language it claimed.

## What was actually there

| What                                                           | How many         |
| -------------------------------------------------------------- | ---------------- |
| files declaring an accented language and carrying no mark      | **50**           |
| of those, `cape_verde` and `guinea_bissau` declaring `pt`      | 39               |
| Spanish `position_language_*` files                            | 9                |
| one `fr` (`khai-cultures-canada`), one `it` (`san_marino`)     | 2                |
| languages affected                                             | 4 of 52 measured |
| files at a mark density below a sixth of their language median | 9 more, not held |

## The fault is two faults

Thirty-nine of the fifty are not an accent fault at all.

`cape_verde` and `guinea_bissau` write _"a lingua-mae das ilhas"_ and _"undi
tudu genti ta bin i undi ningin ta vivi so"_. That is Kabuverdianu and
Guinea-Bissau Kriol, written in orthographies that use almost no accents. The
prose is right; the frontmatter is wrong. And the house already knows it —
`cape_verde` has two files declaring `kea` and `guinea_bissau` two declaring
`pov`, correct, beside twenty-two each declaring `pt`.

So the same symptom covers a spelling fault in eleven files and a `language:`
fault in thirty-nine, and the larger one is the third appearance of the finding
opened in `order_voice_from_inside.md`: a play declaring the language of the
state above it rather than the language it is written in.

**The wall names both cures and chooses neither.** Unaccented Portuguese and
accurate Kabuverdianu are the same bytes to a counter. Only a reader can say
which a file is.

## Why zero marks, and not too few

Spanish cannot be spell-checked from this corpus, and the corpus proves it.
Every one of these pairs occurs here in both spellings, correctly, because both
are real words:

| plain | accented | plain occurrences | accented |
| ----- | -------- | ----------------- | -------- |
| que   | qué      | 8503              | 67       |
| como  | cómo     | 1209              | 33       |
| solo  | sólo     | 443               | 7        |
| esta  | está     | 159               | 165      |
| paso  | pasó     | 118               | 20       |
| mas   | más      | 51                | 688      |

A counter that restored accents by frequency would corrupt the prose it was
hired to protect. There are ~4,800 word-level suspects house-wide across fifteen
languages; **none of them is decidable by machine**, and no offline dictionary
exists in this environment to make them so.

What _is_ decidable, with no dictionary and no false positive, is that sixty or
more words of running prose in an accented language containing not one combining
mark is wrong. That is the only question this wall asks. Which word is missing
which accent is a reading, and a reading is not a counter's business — the same
line `order_plot_zero.md` draws between having a `plot_00` and having a true one.

## How it is held

A ratchet, on prose a change writes. Renames are followed and compared by
content, because every culture that leaves the umbrella moves its tongue file
byte for byte, and a wall that charged the mover for prose they never touched
would push that work back into exactly the mixed change the limit at #608
forbids. A byte-identical move carries no debt; a rewritten paragraph does.

Fifty files are flat today and the house is green. The count comes down as the
house is walked, the way the sub-national count does. **Fifty files re-accented
in an afternoon to clear a counter would be fifty files nobody read**, and
thirty-nine of them would be wrong, because they never needed accents in the
first place.

## Targets

- [x] Measure it: 50 flat files, 4 languages, ~4,800 undecidable word-level
      suspects across 15 languages
- [x] Establish there is no generator: nothing in the repository folds accents,
      so the text is the fault and repairing the text is a real fix
- [x] Establish that word-level repair is undecidable here, with the minimal
      pairs that prove it
- [x] A wall that asks only the decidable question, deciding which languages are
      accented from the house's own corpus rather than an external list
- [x] Follow renames by content, verified against the navarre range: spared
- [x] Verified it fires: a flattened `persona_fermin` is refused, a pure rename
      of an already-flat file is not
- [x] Register it in the gates as `diacritics`
- [ ] The nine Spanish `position_language_*` files: body and `declared:` name,
      as each culture is walked
- [ ] `cape_verde`: 22 files from `pt` to `kea`, and `kea` authored in the
      tongues package
- [ ] `guinea_bissau`: 22 files from `pt` to `pov`, and `pov` authored in the
      tongues package
- [ ] `khai-cultures-canada/position_les_deux_peuples.md` (`fr`, already
      shipped) and `san_marino/position_language_it_sm.md`
- [ ] Tighten from zero marks to a density floor once the fifty are clear; nine
      near-zero files are waiting behind it
- [ ] Read the 38 multi-language plays against the definition —
      `order_voice_from_inside.md`, still unchecked, and now the same finding
      from a third direction
