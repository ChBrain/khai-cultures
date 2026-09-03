---
---

**Records what `geo.json` carries: `iso` stays one string, `covers` says what to
paint.**

`iso` does five jobs - permanent package name, id prefix the conformance gate
checks, display name, region colour, page URL. A list can be none of them, so
making it polymorphic breaks five consumers to serve a sixth.

Some cultures are more than one shape. Germany never is: a Bundesland is both the
map and the culture. France is, because its 2016 regions are administrative
mergers while its departements, drawn in 1790 on the old provinces, fit the
cultures. So `covers` carries the drawing and the anchor keeps naming the
culture, and the two are allowed to disagree - `FR-BRE` anchors Brittany, and the
list includes `FR-44`, which holds Nantes and sits outside the region.

Absent `covers` means paint the anchor, so the three hundred single-shape
cultures are untouched.

Internal borders stay. A dissolved outline is the grammar maps use for states, so
Brittany-with-Nantes drawn with one hard edge would make a claim in the symbology
that the data never made. Five units in one fill reads as _these five places_.

Geometry stays out: GADM is not redistributable, OSM relation ids are unstable
and ODbL propagates, and the renderer joins codes to boundaries offline from
geoBoundaries, which carries France at ADM2 where Natural Earth stops at ADM1.

Where `covers` cannot be written, the honest answer is not to draw. The French
Basque Country is half of `FR-64`, but the Communaute d'agglomeration Pays Basque
exists as a real body and can be pointed at if `covers` admits namespaced non-ISO
codes. Occitania has no such answer at any depth - its boundary is an isogloss
and the smallest unit that could trace it is the commune, of which France has
34,000. Label it, do not draw it, and no point either: a dot on Toulouse asserts
Occitania is at Toulouse, which is more wrong than silence.

Supersedes the first draft of this record, which proposed a core-and-maximal
extent formalism and used DACH as its example. Both were wrong. `covers` is the
same idea in working clothes, and the DACH case failed on its own evidence: that
group's arc is the making of the written standard - its one plot is the 1901
Orthographic Conference - and `de_li` in this house already says Liechtenstein
Standard German is "a written norm the country did not make". Liechtenstein
receives the standard rather than making it, so it is not a member, and adding it
would have put two files here in contradiction.
