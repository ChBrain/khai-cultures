---
khai: order
title: "A Group is not a Culture"
declared: "A Group is not a Culture"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-06"
---

# Order: a Group is not a Culture

**A unit is anything the house packs. A culture is a unit the count is taken
over. A group is the first thing that is one without being the other, and every
wall was answering that separately.**

The distinction was already written down and already enforced in exactly one
place. `culture_sources.mjs` says it outright — _a migrated group is a unit and
not a culture_ — and `cultures()` filters groups out, because the umbrella's
minor **is** the culture count and a group that declared `khai.production` would
move the number by existing. That is why a migrated group is marked `khai.group`
and never `khai.production`.

What was not written down is what a **wall** does when a group turns up in its
input. So each wall decided, and each decided on its own.

## What the four walls actually did

`authoredCultures` answers in units. Migrating the nordics group handed all four
content walls the id `@chbrain/khai-cultures-nordics`, which `cultureIds()` has
never heard of and `cultureDir()` answers `null` for. The four did four
different things:

| Wall                    | What it did                                                      | What it reported                                                                         |
| ----------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| company-coverage        | asked `coverage()`, got a return missing a key, threw            | `FAIL`, a stack trace, nothing about the content                                         |
| subnational-conformance | asked `conformance()`, got an empty verdict, counted it          | `OK: 1 authored culture(s)` — it had checked none                                        |
| plot-zero               | asked `hasOrigin()`, whose missing-directory branch returns true | `OK: 1 authored plot line(s), each spanning origin to present` — no directory was opened |
| persona-wiring          | asked `wiring()`, got nothing, counted it                        | `OK: 1 touched culture(s)` — it had checked none                                         |

Three of those are green and all three are false. Only the crash was visible,
and only because it was a crash.

**The plot-zero branch is the one that matters most**, because it was not about
groups at all. `has()` read _an id whose directory cannot be found has the
marker_. That is a wall answering yes to a question it did not ask, and it would
have answered the same way for a real culture the day anything else made a
directory unresolvable. It went unnoticed for as long as nothing unresolvable
reached it.

## The orders

**A unit is not a culture until the culture list says so.** `cultureIds()` is
the only authority on what a culture is. A wall that reads cultures asks it, and
asks it through one shared function so the answer cannot fork again:
`cultureUnits(ids)` returns `{ cultures, notCultures }`.

**Declining to charge something is a finding, not a silence.** The skipped units
are printed — `N authored unit(s) are not cultures and are not charged by this
wall` — for the same reason `relinkNote` prints the relink exemption. A wall
that drops an input quietly is indistinguishable from a wall that checked it and
found nothing, and the reader will assume the second.

**Never fail open, and never toward green.** A wall handed something it cannot
resolve says so and stops. It does not return the answer that lets the change
through. `plot_zero`'s `has()` now throws, and the throw names the caller's
mistake: only culture ids reach it, so an unresolvable one is a bug above it,
not a case to absorb.

**A group is not exempt from having a plot line, only from this wall.** Nothing
here says a group's Company may be dead or its plot line may be a stub. The
nordics group carries `plot_00` through `plot_99` and its own persona is staged,
and both were done by hand in the pull request that moved it, because no wall
asked. **That is the real remaining hole**: the content ratchets ride the
cultures and nothing rides the groups. Of the twenty-one groups that have a
play, **seventeen have a `## Triggers` chapter that links no plot at all** — and
the EU is the sharp case, because it is not that it has no plots. It has four,
`plot_01` through `plot_04`, and its Triggers chapter names four themes and
links to none of them. Fixing that is a group ratchet, and it is a separate
order — but it cannot be written while four walls disagree about whether a group
is a thing they look at.

## Why not the other way

The alternative was to make groups look like cultures: put them in
`cultureIds()` and let every wall charge them. It is rejected because the count
is load-bearing. `packages/khai-cultures`'s minor is the culture count and the
release reconcile clamps it there; a group entering that list moves a published
version number to say something that is not true. The count is the reason the
distinction exists, so the distinction is kept and the walls are taught it.

## Targets

- [x] Name the rule: a unit is not a culture until `cultureIds()` says so
- [x] One shared split, `cultureUnits`, so four walls cannot answer differently
- [x] One shared line, `notCultureNote`, so a declined unit is never silent
- [x] Remove the fail-open in `plot_zero`'s `has()`: throw rather than answer yes
- [x] Wire all four content walls through it, and verify against the commit that
      exposed it
- [x] Hold it with tests that run without a diff
- [ ] A group ratchet: seventeen of the twenty-one groups with a play have a
      `## Triggers` chapter linking no plot, and no wall asks
- [ ] Decide whether `pathCulture`'s `migrated` flag should answer for a group
      at all — it reports `false` for a migrated group's own files, which is
      true of `khai.production` and false in every sense a reader means
