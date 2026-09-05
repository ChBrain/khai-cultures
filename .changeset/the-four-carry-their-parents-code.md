---
---

**The four nations of the United Kingdom take their parent's code, and the
rename is the only thing in this change.**

`england`, `scotland`, `wales` and `northern_ireland` were the last sub-national
cultures in the house not carrying the code of the culture above them. Every
other one already does, and has for a long time: `us_ohio`, `es_andalusia`,
`ch_bern`, `de_bavaria`, `fr_alsace`. The four become `gb_england`,
`gb_scotland`, `gb_wales` and `gb_northern_ireland`.

The wall states the reason and it is the reason to do this before the content
work rather than after: **the package name follows the id, and an npm name is
permanent.** All four are still under the umbrella, so today the rename costs a
directory move. On the day any of them migrates it would cost a published name
that cannot be taken back.

Nothing else is in here, and that is deliberate. The other half of the
conformance debt is one line per culture, a link from each culture-position to
`@chbrain/khai-cultures-united-kingdom/position_culture_britishness.md`, and that
line is an edit rather than a rename. An edit authors the culture, and an
authored culture is charged by `company-coverage` on the same pass: 25 dead
Company elements across the four, six or seven each. Cricket, the pub, the full
English, the St George's Cross, the Twelfth, the GAA, the Eisteddfod, rugby, and
two personas apiece, none of them staged in any plot. That is the cultures
campaign and it belongs to the four culture pull requests, one per nation, not to
a rename.

So this one moves four directories and regenerates the registry. Every file is
byte for byte what it was, no inbound link needed rewriting because the tongue
move took the last cross-culture links out of these four, and all 319 cultures
stay relink-only.

Each of the four is left at exactly one blocking conformance finding, the wiring
line, and each of its own culture pull requests clears it along with the Company
work it is coupled to.

No culture is added or removed, so the registry stays at 0.319.0.
