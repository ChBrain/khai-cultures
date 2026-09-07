---
---

**Step 5 alone. Steps 1 through 4 were already done, by other pull requests that
were not aiming at this group.**

The working order is: decide a group, identify its cultures, move the tongues they
need, move the cultures, then move or create the group. `these_islands` is the
first group to arrive at step 5 with nothing owing above it. Its five members —
`ireland`, `gb_england`, `gb_scotland`, `gb_wales`, `gb_northern_ireland` — all
left the umbrella for other reasons, the last four of them for the Four Nations.
So there was no tongue to move and no culture to move, and
`node tests/group_coverage.mjs --group these_islands` answered **0 findings**
before anything was touched.

`these_islands -> @chbrain/khai-cultures-these-islands`, **0 own link files and 0
inbound**. The play's Company already addressed all five members by package name.

**Production packages 65 → 65** — a group package is outside that count, as the
Nordics, the Baltics, the Four Nations and DACH already are. This is the **fifth
group package**, and the umbrella's `groups/` directory is down to sixteen.

## What the move broke, and what it revealed had already been broken

Four links in this group pointed at sibling packages by **relative path**. The
migration reported `0 own link file(s)` rewritten, and it was right by its own
lights: it rewrites links to the members it is moving, not links to packages that
had already left.

Two of the four break **because of this move**: `ireland` in the README member
list and in the REFERENCES grouping table, both written
`../../../khai-cultures-ireland/play_ireland.md`. From
`packages/khai-cultures/groups/these_islands/` that resolved to
`packages/khai-cultures-ireland/`. From `packages/khai-cultures-these-islands/`
the same three levels land above the repository.

The third, `united_kingdom` in REFERENCES, is the same shape and breaks the same
way.

**The fourth was already broken on `main`, and had been since #602.** The README
says this group deliberately does not duplicate
`[the Four Nations](../the_four_nations/play_the_four_nations.md)` — a link into
the umbrella's `groups/` directory that #602 emptied of that group. That migration
reported `0 inbound` because **its inbound rewrite does not reach a group linking
a group**: the only reader was another group, still under the umbrella, and it was
not asked. Nothing failed, because nothing walks a group's prose links for
reachability until the group itself becomes a package.

All four are now package specifiers.

## Two of them are reach, not membership, and are declared as such

`the_four_nations` and `united_kingdom` are named here and are **not members**.
The UK is the state above four of the five, and counting it alongside its parts
would count the same ground twice; the Four Nations is the sibling group this one
is defined against.

#603 settled how the house treats exactly this: a link by package specifier is a
**reachability** claim and gets a declared dependency, while membership is derived
from the play's Company and from nothing else. Both are now in `dependencies`
beside the five members.

Measured after the rebuild, with both new specifier links present:

```
references: ["gb_england", "gb_northern_ireland", "gb_scotland", "gb_wales", "ireland"]
```

Exactly the five. The two reach-only links added no member, which is the second
independent confirmation of the rule #603 established — the first was the UK link
in the Four Nations.

**319 cultures at 0.319.0.** A group is not counted, so the minor does not move.
