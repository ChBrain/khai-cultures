---
---

**A thirteenth wall, and the tool fix that should make it quiet.**

Two walls here ask about links. `isolationErrors` asks whether a relative link
escapes its unit; `validateProductionPackage` asks that again and adds whether a
cast specifier is declared. **Neither opens the link and asks whether anything is
on the other end.**

#602 moved `the_four_nations` out of the umbrella while `these_islands` held
`[the Four Nations](../the_four_nations/play_the_four_nations.md)`. The link was
dead the moment that merged and stayed dead through #603, twelve walls green over
it both times. It was found by reading.

## Two reasons it survived, both measured

**Nothing asks whether a link resolves.** Not one wall.

**And the umbrella's groups are outside every unit walk.** This needs stating
precisely, because I got it wrong once today before measuring it: `unitsOf` keys
a migrated group by its **npm name**, so the five that left _are_ units and _are_
covered by isolation — probing for them by group id says otherwise and is the
wrong probe. The sixteen still under `packages/khai-cultures/groups/` are not
units and answer to nothing. Separately, `productions()` filters on
`khai.production`, which no group has, so **no group answers to the production
wall at all**. Injecting one identical broken link twice:

```
A. escape in a CULTURE package: productions: 65 package(s), 2 finding(s)
B. escape in a GROUP   package: productions: 65 package(s), 0 finding(s)
```

## The wall

`tests/link_resolution.mjs`, registered as `links`, with `khai-links` in CI. One
sentence at three ranges: **on disk** the address resolves; **at publish** a
packaged unit carries no `../`; **at install** a cast specifier is declared. It
reads every unit — `unitsOf` for the cultures and the five group packages,
`groups()` for both group homes, deduplicated by directory.

**A name is not an address.** `](process_speaking_mother_tongue.md)` names a
process the engine ships, and seventeen such names appear across the cultures. So
a bare link must resolve in its own directory **or** in a package the unit
declares — checked against the engine, never assumed. (The first run of this wall
called all 4,755 of them broken, because the resolver read `packages/*` and an
engine is only ever in `node_modules`. That is now a test.)

What the rule catches is the case nobody would call a convention: **three dead
`plot_*` links from renumbered chronologies.**

- `arizona`: links `plot_02_central_arizona_project.md` and `plot_03_code_talkers.md`;
  on disk the two are **swapped**.
- `fr_brittany`: links `plot_04_naoned_er_maez_1941.md`; on disk it is `plot_05`.
  **That one is inside a published package.**

## Why a ratchet, and why it charges more than the unit you wrote in

`staging` is absolute because it started clean; `group-ratchet` is a ratchet
because it started at seventy. This starts at three — which sounds absolute until
they are priced. `fr_brittany` is at 0 dead and free to repair. **`arizona`
carries two dead Company elements**, so fixing its two links authors it and
charges it for both, and a wall that cannot go green without unrelated content
work is a wall that gets bypassed. Those repairs are also `culture/*` lane and
cannot ride here.

So it reports the whole house (**2 units owing, 3 findings**) and blocks on what a
change is answerable for — **the units it wrote in, plus any unit whose links land
on a path it removed or moved away.** That second clause is the whole point: a
ratchet scoped to authored units would not have caught #602 either, since that
change authored `the_four_nations` and broke a unit it never opened. Run against
its own range:

```
::error::Links: an address a unit writes must resolve for whoever installs it.
  these_islands: 1 finding(s)
    README.md: "../the_four_nations/play_the_four_nations.md" resolves to nothing
```

exit 1.

## The tool answers first

A wall that catches this after the commit is the second line. The migration is the
first, and it had a defect of exactly this shape — its group inbound rewrite
required a literal `groups/` segment:

```js
/\]\((?:\.\.\/)+groups\/([a-z0-9_]+)\/([^()\s]+)\)/g;
```

A sibling group is reached as `../<id>/…` with no such segment. The comment above
that pass said a second group might link one and the walk would cost nothing; the
walk happened and the pattern could not see it. **The culture pass directly above
it already has `(?:cultures\/)?` optional** — made so after missing the group
depth once cost twelve broken links. The group pass never learned it.

1. `groups/` is now optional.
2. The group's own pass rewrites what had **already** left — a package by name, a
   sibling group by id — and declares each.
3. **The migration refuses to write a package that would still carry a `../`.**
   Each pass knows one shape; a shape nobody anticipated is what shipped broken.
   So the last question is not whether the patterns matched but whether a `../`
   remains, asked of the destination text.

Replayed against the exact tree #602 shipped:

```
  rewrite 2 own link file(s), 0 inbound
  depends ... @chbrain/khai-cultures-the-four-nations, ... @chbrain/khai-cultures-united-kingdom, ...
```

Two files instead of zero, and both reach-only packages declared on its own —
**the same repair made by hand in #604.** The backstop was then tested by
stranding a link it cannot know: exit 1, naming the file and the target.

Four new tests in `migration.test.mjs`, 37 passing. `management/orders/order_an_address_resolves.md` records the rule.
