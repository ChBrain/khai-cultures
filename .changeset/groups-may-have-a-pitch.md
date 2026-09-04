---
---

**A group may have a pitch**, and the design of record is corrected to say so.

`groups-and-references.md` read "a group-play has **no** `pitch_` (an alliance
has no Hofstede score)". The reasoning is where it went wrong: a pitch is a tone,
not a score. Its chapters are Tenor, Undertow, Nerve and Echo, no number appears
in any of them, and the Hofstede table lives in a culture's `REFERENCES.md` and
never in the pitch file. What a group lacks is the source data, not the tone.

The rule also only ever existed in the document. The house's conformance accepts
a group pitch - 378 tests pass with `groups/dach/pitch_dach.md` in place, and
nothing in `tests/house.test.mjs` or the kit ever refused one. A minimum stated in
a design document and in no gate binds only whoever reads the document, which in
practice meant every group went without a pitch for no reason.

Two further corrections ride along. The status header said no `groups/` content
had changed yet, which stopped being true nineteen groups ago. And the document
never said that a group play chains plots in its Triggers, an omission with a
measurable cost: 19 of 19 groups had a Triggers chapter linking no plot, and DACH
had a plot file on disk its own play never referenced. Ships nothing.
