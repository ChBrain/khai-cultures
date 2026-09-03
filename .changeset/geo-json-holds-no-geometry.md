---
---

**The eleven coordinates come out of `geo.json`.**

Across 316 cultures the file held `iso` 316 times and `lat`/`lon` eleven times.
The eleven were one generator's artefact - `tests/new_culture.mjs` writes `iso`
and nothing else - and they were the only geometry in the house.

They cannot become a precedent, because the renderer already owns projection in a
space that is not longitude and latitude: Spain ships the Canaries as a
fake-coordinate inset and the United States as a pre-projected Albers composite in
pseudo-degrees. A file carrying real coordinates would put two systems in
disagreement about what a coordinate means, and every file would then need a
field declaring which space it is in. Removing eleven points keeps that field from
ever having to exist.

`geo.json` now holds `iso` 316 times and nothing else. The reasoning is in
`management/design/what-a-geo-json-carries.md`, which lands first.

The lowercase codes on those same eleven cultures are deliberately untouched.
Normalising the case switches on a parent-nesting check that nine of the eleven
currently fail, and that debt is fixed before the case is, not after.
