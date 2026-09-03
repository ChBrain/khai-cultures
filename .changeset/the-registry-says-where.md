---
"@chbrain/khai-cultures": patch
---

**The registry says where every culture lives, and five groups get their members
back.**

A consumer reading this house resolved a culture one way: the umbrella's
collection directory, one subdirectory per unit. The ratchet made that false for
a growing share of the entries, and the registry said so for the migrated ones
only — `package` on those, nothing on the rest. Absence was left to mean "under
the umbrella", and a reader cannot tell an entry it understood from one it
merely defaulted.

Every entry now carries the kit's `source`: the npm package that ships the
culture and the path below its root. `cultures/<id>` under the umbrella, `""`
for a culture that has become its own package — there the package root IS the
unit. `package` stays for one minor as a deprecated mirror of `source.package`.

The groups are the part that was already wrong in public. `references` is
derived from a group play's casts, and a cast that became a package specifier
stopped being read — so the derivation returned fewer members, or none, and said
nothing. Five of nineteen groups were short: `anglosphere` missing
`united_kingdom`, `eu` missing `austria` and `germany`, `francophonie` missing
`switzerland`, `nato` missing `germany` and `united_kingdom`, and `dach` missing
all three of its members. Nine memberships. Only `dach` was noticed, because
only `dach` went to zero.

The kit reads both link shapes now, and this house hands it the one thing it
cannot know: `packageIds`, the npm name of every production mapped to the
culture it ships, derived from the productions present rather than kept as a
list. Every group derives its full membership again, and a group that derives
none is a build failure rather than a quietly empty field.
