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

| What                                                         | At first | Now    |
| ------------------------------------------------------------ | -------- | ------ |
| files declaring an accented language and carrying no mark    | **50**   | 28     |
| of those, `cape_verde` and `guinea_bissau` declaring `pt`    | 39       | 21     |
| files holding some marks but under a sixth of their language | 9, held  | **4**  |
| total the wall reports                                       | 50       | **32** |
| languages affected                                           | 4        | 4      |

The nine near-zero files were an estimate at a looser line; measured against the
threshold actually chosen, there are four. The count went up by four and down by
eighteen in the same breath, and both movements are the wall working.

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

## The wall could only read Latin script, and did not know it

**A gate that goes quiet when it cannot read a file passes for the wrong reason.**
This wall counted words with `[^\W\d_]{3,}`, and `\w` stays ASCII under the `u`
flag, so `\W` matched every letter outside A-Z. Greek, Cyrillic, Armenian, Arabic,
Hebrew, Devanagari, Georgian, kana and han all counted as nothing.

**Measured: 1,199 files in this house hold more than four hundred letters of real
prose and scored below `FLOOR`**, so `flat` declined every one of them. The Greek
files show the cost plainly: `plot_99_o_kosmos_erchetai.md` carries 289 combining
marks and was scored at forty-one words, because the only words it could count
were the Latin ones in its own scaffolding — _Parent group: positions_, _Project:
khai-cultures_. Greek prose with its accents stripped is the same fault as the
Spanish and French this wall was written for, and the wall could not see a single
instance of it.

Widening the counter to `[\p{L}\p{M}]{3,}` brings **twenty-three languages** into
scope — `be bg bn div dzo el fa hi ja kk km ky lo mk mn my ne ru si tg th uk ur` —
and `\p{M}` rides along so a base letter and its marks count as one word, which
matters wherever a vowel is written as a mark.

Chinese and Cantonese stay out, correctly: they carry no combining marks, so there
is no accent to strip. And in a script written without spaces `{3,}` counts runs
rather than words, which is crude and is also self-consistent, because the density
a file is measured against is computed from the same corpus with the same counter.

### And the widening exposed a guard that was only half applied

The first version of this widening reported **five new findings, all Macedonian,
all of them wrong**, and the reason was in this wall and not in the prose.

`flat` read `if (n === 0) return lang` **above** the `MIN_EXPECTED` check, so the
density argument was applied to the thin case and never to the empty one — while
the order and the wall's own header claimed both, in the words _"a language that
would owe four cannot be said to be missing them."_

It stayed invisible for exactly as long as the wall could only read Latin script,
because a Spanish or French file past `FLOOR` essentially always carries an accent,
so zero marks really was a finding. Macedonian is the counter-example: its only
letters that decompose to a combining mark are **ѓ, ќ, ѐ and ѝ**, all rare, so
`place_ohrid.md` carries none in a hundred and nine words of sound Macedonian —
where its own language owes about two. The guard now covers the empty case too.

**Silence proves nothing about a language that had little to say.**

|                                | before | after                              |
| ------------------------------ | ------ | ---------------------------------- |
| languages in scope             | 36     | **59**                             |
| files with unreadable prose    | 1,199  | **0**                              |
| flat findings                  | 10     | **10**, the same ten               |
| files the guard newly declines | –      | **5**, all Macedonian, all correct |
| diacritics tests               | 13     | **16**                             |

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
- [x] Read scripts other than Latin. The word counter was ASCII-only, so 1,199
      files of real prose scored under `FLOOR` and were never judged — Greek among
      them, carrying 289 marks and counted at 41 words. Twenty-three languages enter
      scope, none is lost, and the ten standing findings do not move
- [x] Apply `MIN_EXPECTED` to the zero-mark case, which it never covered. The
      short-circuit returned before the guard could speak, and the first Macedonian
      file the wall could finally read was accused of being unspelled for lacking
      two rare letters
- [ ] Yiddish is the case that exposed all of this and is still not scored: one
      file cannot reach `QUORUM`, and `yi` has no detector model either, so it is
      exempt twice over. A tongue this house cannot check is a tongue whose
      provenance note must say so
- [ ] The nine Spanish `position_language_*` files: body and `declared:` name,
      as each culture is walked
- [ ] `cape_verde`: 22 files from `pt` to `kea`, and `kea` authored in the
      tongues package
- [x] `guinea_bissau`: 21 files from `pt` to `pov`. Not 22 — `position_language_pt_gw.md`
      keeps `pt`, because it is genuine Portuguese (70 marks, no Kiriol) and is
      the file that proves the others were not. `pitch_pt.md` became `pitch_pov.md`
- [ ] `pov` authored in the tongues package. It stayed inside the culture: the
      relabel did not need it moved, and a move is its own change
- [ ] `khai-cultures-canada/position_les_deux_peuples.md` (`fr`, already
      shipped) and `san_marino/position_language_it_sm.md`
- [x] Tighten from zero marks to a density floor. **Taken early, and the
      condition it was given is the thing that had to go.** "Once the fifty are
      clear" assumed the blind spot only hid files already counted. It did not:
      three of `guinea_bissau`'s twenty-one were invisible to the wall for one
      stray accent each, and so was `position_language_es_es_md.md` — the file
      this order opens with. A wall that cannot see its own founding example
      should not be left standing while more prose is written against it.
      A file is now flat when it holds at most 15% of the marks its own language
      carries over prose that long, scored only where the language would owe at
      least ten. The threshold sits in a measured gap: 15% and 20% catch the same
      four files, and nothing lies between 11.6% and 21.1%
- [ ] Partial stripping, which the density floor deliberately does not cut.
      `es_gq` sits just above the plateau at 21% with `numero`, `prestamo` and
      `lexico` flat while `español`, `género` and `ndowé` stand. That is a
      continuum and a counter cannot decide it; it needs a reading
- [ ] Read the 38 multi-language plays against the definition —
      `order_voice_from_inside.md`, still unchecked, and now the same finding
      from a third direction
