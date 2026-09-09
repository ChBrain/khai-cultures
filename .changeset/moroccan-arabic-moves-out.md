---
---

Moroccan Arabic moves to the tongues package, and Ceuta and Melilla stop reaching
across a culture boundary.

**Found while sizing the last five of the eight.** `position_language_ar_ma.md`
was sitting in `cultures/morocco`, and both `es_ceuta` and `es_melilla` reached
it with a relative link — `../morocco/position_language_ar_ma.md` — straight
across a culture boundary. That is the one shape a packaged unit may never carry,
so **neither of those two could have migrated while it stayed there**. The
blocker was not their own content; it was a file in a third culture.

Because the tongue serves three cultures rather than one, the limit set at #608
applies as written: step 3 is its own change, and the file moves unaltered. Git
records it as a pure rename. Thirteen inbound links across morocco, es_ceuta and
es_melilla were rewritten to the specifier, and nothing inside the file was
touched — the care point, which is that a tongue held by a culture outside the
group being walked moves byte for byte, always.

What it holds is the diglossia stated plainly: the triliteral root growing whole
families of words on fixed patterns — كتب، كاتب، مكتوب، مكتب — and two tongues
inside one, the written standard beside the spoken darija.

Counts, run rather than assumed: tongues varieties 147 → 148 with the language
count unchanged at 67, so no minor bump and no dependency ripple. `tongues: 148
varieties, 0 finding(s)`; `morocco: 5 dead` unchanged from before this change,
`es_ceuta: 0 dead`, `es_melilla: 0 dead`; flat files unchanged at 46.

**What this unblocks, and what it does not.** Ceuta and Melilla can now migrate
once each has a plot_00 and a plot_99, which neither has. The remaining five of
the eight are not uniform:

- `es_melilla` links `rif` and `es_es_ml` correctly and is otherwise ready for
  its two plots.
- `es_ceuta` is the same, now that this reach is closed.
- `es_canary_islands` and `es_cantabria` link their varieties correctly.
- `es_balearic_islands` carries the fault found in #664 and #666 a third time:
  its personas' mother tongue is _el catalán mallorquín_, written as a bare
  phrase with no link, while their second language links correctly to `es_es_ib`.
  Unlike Aragonese and Asturian, the language itself is already here — `ca` is in
  the package — so what is missing is a Balearic variety under it, not a new
  language. Reported here; it is that culture's step 3, not this one's.

Morocco keeps its play and its five dead entries, both untouched by this change.
