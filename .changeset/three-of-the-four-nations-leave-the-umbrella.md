---
---

**Three cultures were already finished and nobody had moved them.**

I surveyed all 258 cultures still under the umbrella for what actually blocks a
migration — holding their own tongue, or carrying a `../` link out. Six came back
clean, and of those, **three needed no work at all**:

|                       | dead Company | plots | `plot_00` | `plot_99` |
| --------------------- | ------------ | ----- | --------- | --------- |
| `gb_scotland`         | **0**        | 9     | ✓         | ✓         |
| `gb_wales`            | **0**        | 9     | ✓         | ✓         |
| `gb_northern_ireland` | **0**        | 9     | ✓         | ✓         |

All three were brought to zero and given both ends earlier in this run, and then
the walk moved on to the Nordics without collecting them. **This pull request
authors nothing.** It is three moves and one more.

`gb_scotland -> @chbrain/khai-cultures-gb-scotland`, `gb_wales ->
@chbrain/khai-cultures-gb-wales`, `gb_northern_ireland ->
@chbrain/khai-cultures-gb-northern-ireland`. **Production packages 61 → 64.**

## And the one file that stands between here and the group

`the_four_nations` needs all four. The fourth refuses:

```
gb_england cannot migrate yet:
  - persona_henry_viii.md links ../spain/position_language_es_es.md
```

Catherine of Aragon brought Castilian into that marriage and that court, so
Henry's Projection reaches into peninsular Spanish — and a published production
carries no `../`. So `es_es` moves here, byte-identical, ahead of the culture that
needs it, exactly as `et/lv/lt`, `en_ca/fr_ca` and `bg` did:

```
1 file changed, 0 insertions(+), 0 deletions(-)
```

**A genuine variety and not the anchor in disguise**, which is the test when a file
moves under a language already in the package. What distinguishes it from `es` is
`vosotros` — the second person plural of familiarity that the Americas gave up
entirely for `ustedes` — and the _distinción_, keeping `c` before `e` or `i` and
`z` apart from `s` where most of the Spanish-speaking world merges them. The rest
of what the file carries (`ser` against `estar`, the living subjunctive, the
diminutives) belongs to the language rather than to the peninsula, and the
provenance record says so rather than claiming it for this file.

`build.mjs --write`: **44 languages, 101 varieties, version 0.44.0.** The language
count does not move, because a variety is not a language.

## What this sets up

`gb_england` is now unblocked. With it, `the_four_nations` becomes a package —
the third group in the house, after the Nordics and the Baltics.

Two groups hold their member links inside a padded table and will therefore be
charged by the group ratchet when these members move: `the_four_nations` and
`these_islands`. **Both are already whole, so it costs nothing** — which is what
#600 predicted when it reported that hole.
