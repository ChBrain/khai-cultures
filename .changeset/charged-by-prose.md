---
---

**Two walls that read only prose were being charged by a version bump.** Adding a tongue
runs `packages/khai-cultures-tongues/build.mjs`, which rewrites the dependency range in
**120 manifests**. `charged()` counts any touched file, so every unit in the house became
answerable, and `link-names` and `type-titles` both went red — on READMEs in `albania` and
`dach` that the change never opened.

Measured the first time a tongue was added after those walls landed. A wall that turns the
house red on a version bump is a wall that gets bypassed, which is the exact failure both
`order_a_name_reads_as_prose.md` and `order_a_title_names_the_thing.md` are built to avoid.

`charged()` now takes an optional `keep` predicate, and the two prose walls pass `isMarkdown`:
markdown wrote the unit, or nothing did.

`links` keeps the wide default **on purpose**, and the difference is the point. A cast
specifier has to be a declared dependency, so a change touching only `package.json` really can
break a link — a manifest edit is that wall's business and is not these two walls' business.
`removed` stays unfiltered either way, because `underminedBy` needs every removal to find the
unit whose ground moved under it.
