---
khai: order
title: "An Address Resolves"
declared: "An Address Resolves"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-07"
---

# Order: an Address Resolves

**A link a unit writes resolves for whoever installs it, and the change that
moved the ground carries the links it broke.**

Two walls in this house ask about links, and neither asks the plainest question
there is.

`isolationErrors` asks whether a relative link escapes its unit.
`validateProductionPackage` asks that again and adds the one that bites, whether
a cast specifier is a declared dependency. Between them they cover a great deal.
Neither one opens the link and asks whether anything is on the other end.

## What that cost

#602 moved `the_four_nations` out of the umbrella. `these_islands`, still under
the umbrella, held this line:

```
[the Four Nations](../the_four_nations/play_the_four_nations.md)
```

The directory it names was emptied by that move. The link was dead from the
moment #602 merged and stayed dead through #603, with twelve walls green over it
both times. It was found by reading, and reading is not a wall.

Two separate reasons it survived:

1. **Nothing asks whether a link resolves.** Not one wall in the house.
2. **The umbrella's groups are outside every unit walk.** `unitsOf` keys a
   migrated group by its npm name, so the five that left are covered; the sixteen
   still under `packages/khai-cultures/groups/` are not units and answer to
   nothing. And `productions()` filters on `khai.production`, which a group never
   has, so no group answers to the production wall either — measured by injecting
   one broken link twice: a culture package reports two findings, a group package
   reports none.

## The rule

Three readings of one sentence, held together because a link that fails any of
them is broken for the same person — the one who installed the package and is not
standing in this workspace.

| Range      | The question                                           |
| ---------- | ------------------------------------------------------ |
| on disk    | the address resolves to a file that exists             |
| at publish | a packaged unit carries no `../`                       |
| at install | a cast specifier is a dependency the manifest declares |

## A name is not an address

`](process_speaking_mother_tongue.md)` names a process the language engine ships.
Seventeen such names appear across the cultures and none of them is a path. So a
bare link is held to resolving in the unit's own directory **or** in a package
that unit declares — checked against the engine, never assumed.

What that rule catches is the case nobody would call a convention: three bare
`plot_*` links left behind when a chronology was renumbered and REFERENCES was
not. A plot always lives in its own culture.

- `arizona` links `plot_02_central_arizona_project.md` and `plot_03_code_talkers.md`;
  on disk the two are swapped.
- `fr_brittany` links `plot_04_naoned_er_maez_1941.md`; on disk it is `plot_05`.
  That one is inside a published package.

## Why it is a ratchet

`staging` is absolute because it started clean. `group-ratchet` is a ratchet
because it started at seventy. This starts at three, which sounds absolute until
the three are priced: `arizona` carries two dead Company elements, so repairing
its two links **authors** it and charges it for both. A wall that cannot be made
green without unrelated content work is a wall that gets bypassed.

So it reports the whole house and blocks on what a change is answerable for.

## And it is answerable for more than the unit you wrote in

A ratchet scoped to authored units would not have caught #602 either. That change
authored `the_four_nations` and broke `these_islands`, which it never opened.

**So a unit is also charged when a link of its own lands on a path this change
removed or moved away.** That is the whole failure stated as a rule, and it is
computable from the same `git diff --name-status -M` every ratchet here already
reads. Held against the history it was written for, the wall charges
`these_islands` on #602's own range and exits 1.

## The tool answers first

A wall that catches a mistake after it is committed is the second line. The
migration is the first, and it had a defect of exactly this shape.

Its inbound rewrite for a group required a literal `groups/` segment:

```
/\]\((?:\.\.\/)+groups\/([a-z0-9_]+)\/([^()\s]+)\)/g
```

A sibling group is reached as `../<id>/…`, with no such segment, because from
inside `groups/<sibling>/` the neighbour is one level up and nothing more. The
comment above that pass said a second group might link one and the walk would
cost nothing. The walk happened; the pattern could not see it. The culture pass
directly above it already had `(?:cultures\/)?` optional, made so after missing
the group depth once cost twelve broken links. The group pass never learned it.

Three changes, and the third is the one that matters:

1. `groups/` is optional, so a sibling group is rewritten.
2. The group's own pass now rewrites what had **already** left — a package by
   name, a sibling group by its id — and declares each one.
3. **The migration refuses to write a package that would still carry a `../`.**
   Each pass knows one shape, and a shape nobody anticipated is exactly what
   shipped broken. So the last question is not whether the patterns matched but
   whether a `../` is left, asked of the destination text.

Replayed against the tree #602 shipped, the fixed tool rewrites two link files
instead of zero and declares both reach-only packages on its own — the same
repair that was made by hand in #604.

---

**A link that resolves here and nowhere else is not a link. It is a note to
whoever is standing in this directory.**
