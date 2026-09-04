---
---

**A group play leaving the umbrella is a move, not an add.**

`changesetPolicy.countDrivenAdd` listed the umbrella's `cultures/*/play_*.md` and
the culture packages' `play_*.md`. A culture migrating between those two nets its
add against its delete and needs no changeset, which is how France left the
umbrella and how the fifty migrations after it did.

A group's home under `groups/` was not on that list. So the identical move - the
same `git mv`, recorded by git as `R100`, a pure rename - read as a bare content
add, and the gate asked for the one bump that would be actively wrong: a `minor`,
on a house whose minor IS the culture count, for a change that adds no culture.

Adding `packages/khai-cultures/groups/*/play_*.md` closes an asymmetry rather
than opening a hole. A group play created directly as a package already matched
the third glob and was already exempt; the two homes now behave alike. Ships
nothing.
