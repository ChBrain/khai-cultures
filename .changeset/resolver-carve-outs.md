---
---

Take `@chbrain/khai-tests@0.4.5`. `tests/culture_sources.mjs` kept two carve-outs
because the kit could not yet reproduce them; it can now, and both are retired.

`pathCulture` used to walk the monolith branch with a hand-rolled string match
on the path's own shape, because `unitsOf` once saw a moved unit twice when a
migration's `git mv` left the old directory empty on disk. `unitsOf` now counts
only a content-dir directory that still holds the collection's own anchor file,
so the leftover is not a unit at all and no longer collides with the production
the real unit moved to; `pathCulture` now walks `unitsOf`'s list like every
other reader. `authoredCultures` used to walk its own per-file diff grouping
because `touchedUnits` only ever classified a whole unit as authored or not,
handing back a unit's entire changed-file list regardless of which file earned
the verdict - not enough for plot_zero.mjs's gate, which asks whether the PLOT
files specifically were authored. Each file in `touchedUnits` now carries its
own `authored` flag, and `authoredFiles` is that same answer reshaped as a
lookup by unit id, so `authoredCultures` is built on those instead.

Every exported signature is unchanged, and so is the house's own semantics per
ratchet: a pure relink is still not authoring for coverage, conformance and
plot zero, and persona wiring still counts it, decided in the caller as before.
The header comment now says both limits are the kit's, and the adapter is a
thin shim over `resolveHouse`, `unitsOf`, `touchedUnits`, `authoredFiles` and
`defaultRelink`.

Ships no package content, so an empty changeset.
