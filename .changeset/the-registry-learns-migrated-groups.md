---
---

**The registry learns what a migrated group is.**

A group cannot become a package until its members are packages - a group pulls on
its members, its members pull on the tongues, and the dependency order decides
the migration order. Measured today: DACH is the only one of nineteen groups
whose members have all migrated. Everything else is blocked, `the_americas` by
all thirty-five of them.

Before this, moving a group out of the umbrella would have deleted it from the
registry. `hybrid()` reconciled the cultures and passed `registry.groups` through
untouched, and the kit's build can only see the `groups/` directory it walks, so
a migrated group would have vanished - and silently, because groups are not
counted and no version would have moved.

Groups now reconcile exactly as cultures do. `migratedGroups()` finds them by
`khai.group`, which is deliberately not `khai.production`: the minor IS the
culture count, and a group declaring the culture marker would move the version by
existing. `migratedGroupEntries()` builds their entries through the kit, so the
entry shape stays the kit's rule, and overwrites `source` with the package that
ships them. `drift()` asks the same three questions of groups that it asks of
cultures.

Verified by staging the DACH move and reverting it: with `groups/dach` gone and
`packages/khai-cultures-dach` in its place, the registry still lists nineteen
groups, DACH's `source` names its own package, its references still derive to
austria, germany and switzerland, and the culture count does not move. Ships
nothing.
