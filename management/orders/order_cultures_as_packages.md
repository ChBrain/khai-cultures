---
khai: order
title: "Cultures as Packages"
declared: "Cultures as Packages"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-08-25"
---

# Order: Cultures as Packages

## Direction

This house is registered in the khai house registry as `kind: canon`, which that
registry glosses as plays other productions draw on as material. Nothing draws on
it. A play staged in its own repository and set in Bavaria would have to depend
on all 290 cultures, 14.6 MB of content, to cast one, and no house has ever
tried: `khai-plays-buechner` depends on the spine engine and nothing else.

The house therefore splits. One package per culture, per group and per crossing,
one for the tongues, and an umbrella that depends on them all and keeps the
count. This order directs that campaign, and it directs it slow and steady: a
batch of cultures at a time, each batch finished before the next begins, never a
bulk rewrite of the house.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

The reasoning, the measurements and the rejected alternatives are the design of
record, [Cultures as Packages](../design/cultures-as-packages.md). What the order
fixes is the shape and the sequence.

**The blocker is in khai, not here.** A culture-as-package is neither an engine
nor a composite; a house card names one package and one repository. Either the
canon grows a production kind and a card that can say one house, many packages,
or per-item delivery goes through khai-pack, which already names `culture` as an
example bundle kind. Everything except the tongues waits on that answer.

**The tongues need no new canon.** They are a composite over the language engine,
declaring the same requirement the engine declares and filled with 320 concrete
varieties. A tongue is a cultural position and is worth its own package precisely
because it is one, held by a speech community rather than owned by a country.

**The walk is the unit of work.** The tongues migrate variety by variety, ordered
by fan-in ascending, batching about ten cultures to a pull request. 258 of the
320 varieties are linked by one culture only, so the narrow ones go first and the
widest, English at 95 cultures, lands last and cheapest because its cultures are
already clean. Each batch pays four debts at once and leaves those cultures
finished: links rewritten to package specifiers, dead Company entries to zero,
the identifier renamed to its clean form, and the parent nesting link added where
the culture is sub-national.

**Names are frozen before the first publish**, because an npm name is effectively
permanent. National is `khai-cultures-<id>`, sub-national is
`khai-cultures-<cc>-<id>` on the ISO country code, with `group-`, `crossing-` and
`tongues` for the rest. The identifiers are cleaned rather than patched:
`georgia_us` becomes `us_georgia` and the disambiguating suffix disappears with
the collision that caused it. The 90 registry identifiers that change are the
website's URLs, and that break is accepted.

**Nothing dirty ever ships.** Two tiers protect it: the touch ratchet on pull
requests, in the shape the coverage gate already proved, and a publish gate that
holds every package to its name, to zero dead entries, to a declared parent where
it nests, and to one complete invariant, that no `../` survives inside a
published package. The gate runs twice, in `prepublishOnly` so a manual publish is
stopped, and before `changeset publish` so the failure is readable.

## Targets

- [x] Establish why the house splits: it is registered as material other
      productions draw on, and drawing on it is all or nothing
- [x] Fix the units: a package per culture, group and crossing, one for the
      tongues, and an umbrella that keeps the culture count
- [x] Fix the naming rule and freeze it before any publish, with clean
      identifiers rather than overrides for the legacy collisions
- [x] Fix the method: the fan-in walk, ten cultures to a pull request, each
      batch paying its links, its coverage, its rename and its nesting together
- [x] Fix the protection: the touch ratchet on pull requests and the publish
      gate on every package, with no `../` surviving a published package
- [x] Name the blocker and hand it to khai: a production kind and a house card
      that can declare more than one package
- [x] Record the rejected alternatives so they are not reopened: the big-bang
      migration, per-culture repositories now, a name-override field, nesting on
      the persona, and publishing cultures one at a time
