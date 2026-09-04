---
---

**The house tests learn that a group package is not a culture.**

The second half of the DACH move, and the last thing between the group and its
own package. Staging the move against the tests as they stood produced four
failures, and every one of them was the same assumption in a different place: a
package under `packages/` that declares `khai.class "house"` is a culture, and a
group ships inside the umbrella's box.

`cultures()` now drops the migrated groups. A group declares
`khai.class "house"` too, because it is a play that ships as a package like any
other, so the kit's `unitsOf` hands it back as a unit - and then the minor-version
count and the culture minimums both applied to it. A group has no place, no
process and no piece unless its arc needs one, and DACH's needs none.

The canon test drops "declares group X but directory groups/X is missing" for a
migrated group, on exactly the terms it already drops the same finding for a
migrated culture: replaced, not waived. `registry_hybrid.mjs` reconciles the
groups now and `drift()` asks them the three questions it asks cultures.

And the packing test stops looking for a migrated group's files in the umbrella's
tarball, reading `source.path` the way the hybrid registry does - a path below
the umbrella means it is still in the box, the empty string means its package
root is the unit. Ships nothing.
