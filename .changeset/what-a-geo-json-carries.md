---
---

**Records what `geo.json` carries, and removes the only geometry in the house.**

`geo.json` is not a cartographic key. Its ISO code is the id, the permanent npm
package name, the parent-nesting check, and on the website the display name, the
region colour, the parent and whether a page exists at all. It is the primary key
of the whole consumer surface, which is why it is rigid and why anything flexible
has to go somewhere else.

**Geometry stays out permanently.** GADM is not redistributable and OSM's ODbL
share-alike propagates, so real boundaries would have to be licence-cleared three
hundred times. OSM relation ids are explicitly unstable. And the renderer already
owns projection in a space that is not longitude and latitude - Spain ships the
Canaries as a fake-coordinate inset, the United States as a pre-projected Albers
composite - so a file carrying real coordinates would force every file to declare
which space it is in. The eleven `lat`/`lon` points were one generator's artefact,
not a precedent; they are removed, and `geo.json` now holds `iso` 316 times and
nothing else.

**Extent, when the code is not the whole answer.** Cohn and Gotts's egg-yolk:
`core` certainly in, `maximal` possibly in, the disagreement being the difference.
Absence means crisp, so no field is added to the three hundred cultures that need
none. `disputed` and `undrawn` are available, and a recorded refusal is a stronger
claim than a boundary, because a boundary can only be wrong. It is codes and never
shapes, which keeps it projection-free and lets a renderer choose a
non-territorial symbology instead of the state-shaped grammar a merged polygon
has already chosen for it. `asOf` is required: France redrew its regions in 2016
and `FR-6AE` only came into being in 2021. The reasoning goes in REFERENCES.md,
where the house already records judgement; a `note` field would become a second,
worse REFERENCES that no gate reads.

**What it found.** None of the nineteen groups carries a `geo.json`, so a member
list is doing the work of a boundary. `dach` names three, and Liechtenstein
appears nowhere in it - not in the play, README, REFERENCES or plot - although it
is German-speaking, Alemannic, inside the Swiss customs union, and already a
culture here. It is absent because the acronym has four letters and none is L.
Extent lets the group keep its name and say that its maximal is four, and names
South Tyrol and German-speaking Belgium as maximal members that do not exist in
this house at all.

For a culture the pair describes a boundary nobody agrees on; for a group, the
same pair describes membership nobody agrees on.

The lowercase ISO codes are deliberately left alone. Normalising them switches on
a nesting check that nine of those eleven cultures currently fail, and that debt
is fixed before the case is, not after.
