---
"@chbrain/khai-cultures": minor
---

**Cape Verde was written in Portuguese all along. The inherited note said it
needed relabelling to `kea`; measured, the opposite is true.**

This is the mirror of `guinea_bissau`. There the prose was creole and the labels
said Portuguese. Here the prose is Portuguese and two labels said creole.

## Cape Verde held no Kabuverdianu at all

Not "thin" - none. The entire creole-grammar signal across all twenty-four files
was three quoted words on one line of the anchor: `"N ta studa"`, `"bo ta
studa"`, `"el ta studa"`.

| per 1000 words       | cosmetic re-spelling | creole grammar | Portuguese grammar |
| -------------------- | -------------------- | -------------- | ------------------ |
| `cape_verde`         | 262.7                | **2.6**        | 120.0              |
| `guinea_bissau`      | 425.3                | 133.3          | 83.1               |
| `portugal` (control) | 18.8                 | 0.0            | 87.2               |

Cape Verde was **more grammatically Portuguese than Portugal's own files**, under
a coat of paint. `franc` agrees: 21 of 24 top-ranked `por`. The control is exact

- 25 of 26 `guinea_bissau` files top-rank `pov`, the one exception being the file
  that declares `pt`.

## So the twenty-two files declaring `pt` keep `pt`

Their declaration was never the fault. The accents are restored and the cosmetic
k-layer comes off: `korason` to `coração`, `povu` to `povo`, `enkontru` to
`encontro`, `di` to `de` (206 of those alone).

**The Cape Verdean terms stay exactly as they are** - `kriolu`, `sodade`,
`morabeza`, `morna`, `koladeira`, `kachupa`, `grogue`, `kantadeira`, `nho` - and
so does `hora di bai`, which is Eugénio Tavares's morna and not a misspelling.

**The house's own Portuguese was the dictionary.** No external word list: 126
`pt` files elsewhere, 35,109 words. Every `cape_verde` word attested nowhere in
that corpus was read and decided one at a time. `serou` was `sarou`, `sobriu`
was `sóbrio`, `amesa` was `ameaça`, `dessus` was `desses`, `kora` was `chora`,
`doutus` was `doutos`. One pre-existing typo fell out of it: `trouxe-the` for
`trouxe-lhe`.

## Two declarations were wrong, and both said `kea`

- `play_cape_verde.md` opens _"Quando os portugeses chegaram, por volta de
  1460..."_ and detects `por:1.00`. It declares `pt` now.
- `position_language_kea.md` is **rewritten in Kabuverdianu**, which is what this
  house asks of a language anchor. 93 creole markers in 263 words, against 9
  before. It is the only Kriolu file in the culture.

## Authoring woke the recipe, and it is paid

Four dead - `piece_cavaquinho`, `piece_grogue`, `process_kachupa`,
`process_morna` - cleared by the two brackets, not by a waiver.

**`plot_00_as_ilhas_sem_ninguem.md`** - the origin, and the rarest kind in this
house: **nothing was inherited**. The islands were empty when the caravels came,
so the people, the language, the food and the way of grieving all had to be
invented here. And the geography is one fact wearing two faces - the islands sit
exactly where the trade winds force ships to pass, and exactly in the Sahel
drought belt. A compulsory crossroads in a place you cannot live.

**`plot_99_o_que_se_vende.md`** - the present, as a record. Morna entered the
UNESCO Representative List in December 2019; tourism was near a quarter of the
economy and fell about fifteen per cent in 2020; kachupa is hotel breakfast and
grogue is bottled for export; most food is imported and much urban water is
desalinated; the diaspora outnumbers the people who stayed; and `kriolu` is
still not an official language. The poverty of yesterday is the product of
today, and whoever lived it is rarely whoever sells it.

## Found on the way, and not fixable from this lane

`review: "native"` is **not a canon key**. The closed set is `khai`, `license`,
`stamp`, `title`, `language`, `declared`. It passed on `nv` at #683 only because
the tongues package is not in `productions()`, so its 151 files never reach the
canon's frontmatter check at all. The key is dropped here and the caveat moved
into `REFERENCES.md` prose, where a culture records its provenance. That the
tongues package is unvalidated is a governance finding and needs its own change.
