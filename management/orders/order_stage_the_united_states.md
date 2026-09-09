---
khai: order
title: "Stage the United States as its Subdivisions"
declared: "Stage the United States as its Subdivisions"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-07-06"
---

# Order: Stage the United States as its Subdivisions

## Direction

Deepen the United States: stage it not as one culture but as its subdivisions,
the way Germany is staged as its Bundesländer. The states carry the sharpest of
the American identities, and each earns a full play of its own.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

An order directing content: a campaign of state cultures under the United
States, each a full khai play anchored by its ISO 3166-2 code (`US-XX`). The
country a subdivision belongs to is derived from the code, so `US-TX` nests
under the existing `usa` culture with no extra wiring; the world map's United
States marker turns from a download into a drill the moment the first state
culture ships.

The map already stands, and the house does not build it. The Cultures website
carries the projected states sub-map (the fifty states and the District of
Columbia, Alaska and Hawaii inset), so a state appears on the map as soon as its
culture lands. Content and cartography are decoupled, so this order commands the
content alone, and each state may ship without waiting on the next.

Washington, D.C. is in: `US-DC` is staged as a culture alongside the fifty
states, not folded into any of them.

The states ship in waves, sharpest identities first, one `culture/` PR to a
wave. Each state is Germany-shaped, a `play_*.md` casting plots from its history,
personas, positions, places, processes, and pieces under a Hofstede-tuned pitch,
and it logs this house in its Estate, or it is not yet a production.

## What it costs, measured

The campaign shipped states and then stopped, and what it left behind was never
counted. It is counted here, because "fifty-nine cultures do not conform" is not a
plan and was becoming a reason not to start.

**The house holds 119 sub-national cultures. Sixty conform and fifty-nine do not.**

| parent | total | conforming | outstanding |
| ------ | ----- | ---------- | ----------- |
| CH     | 26    | 26         | **0**       |
| DE     | 16    | 16         | **0**       |
| GB     | 4     | 4          | **0**       |
| FR     | 3     | 3          | **0**       |
| ES     | 19    | 8          | **11**      |
| US     | 51    | 3          | **48**      |

Four campaigns are finished. **Two are unfinished, and the outstanding fifty-nine are
all in those two.** So this is not unexplored ground: the shape has been landed sixty
times, and `us_virginia`, `us_ohio` and `us_pennsylvania` are worked examples of a
conforming state sitting in the tree right now.

**Every one of the fifty-nine carries exactly two blocking findings, and they are the
same two:**

1. the id does not carry its parent's code - `texas` must become `us_texas`, `catalonia`
   must become `es_catalonia`;
2. the culture-position does not link its parent's, which is what says a subdivision is
   a way of being the culture above it. The house even has the closing formula, and
   `us_virginia` ends on it: _"It is a way of being American, not a second passport."_

**And the third cost, which is the one that makes this deep work.** Fixing finding 2
edits the culture, which authors it, which charges it for whatever it carries dead.
Measured across all fifty-nine:

```
168 dead Company elements
distribution   2 dead x27   3 dead x16   4 dead x14   5 dead x2
none at zero
all 59 have exactly 3 plots, and not one has a plot_00 or a plot_99
```

For scale: the eight members of the EU walk carried forty-seven dead between them.
**This is three and a half times that.**

## The fork, and the half of it that is free

The two findings do not have to be paid together, and the difference between them is
the whole planning question.

**Finding 1 is free, and it is free only until these cultures become packages.** A bare
directory rename is content-identical, so it is a relink: it authors nothing, charges
no dead Company, and trips no ratchet. Probed on `wyoming` before this was written, and
the gates said so in their own words:

```
ok  company-coverage        no culture authored, nothing to hold to zero.
ok  subnational-conformance no culture authored.
ok  plot-zero               no culture's plot line authored.
```

**The package name follows the id and an npm name is permanent.** So the window in
which the rename is cheap is exactly the window before any of these fifty-nine
migrates - which is now, and which closes the first time one of them ships. **All
fifty-nine ids can be corrected in a single relink-only change that costs nothing and
halves the outstanding findings.**

**Finding 2 is the campaign.** It cannot be paid in bulk, because each culture must
reach zero dead, and the only place a Company element can stand is a plot's Stage -
so touching the plots is unavoidable, and the plot-zero ratchet then asks each culture
for an origin and a present it does not have. That is fifty-nine cultures, one hundred
and eighteen new plots and one hundred and sixty-eight elements staged, at the size of
the culture pull requests this house has been running.

**Do the rename first and separately.** It is free today, permanent tomorrow, and it
takes the number that has been quoted as a blocker from fifty-nine down to a campaign
that can be walked one culture at a time, in waves, exactly as this order already
directs.

## Spain is the rehearsal

Eleven of the fifty-nine are Spanish and they are the cheaper half, for a reason that
has nothing to do with Spain: **`spain` is already a package**, so a Spanish
subdivision's nesting link resolves to a specifier, while an American one still points
at `../usa/` and is entangled with the migration of the United States itself.

Eight Spanish subdivisions already conform, and several are sitting in the migration
queue as ready. **Finish Spain first.** It completes a campaign, it proves the recipe on
a live parent, and it leaves the United States as the only sub-national debt in the
house.

## Targets

- [x] Direct the United States staged as its subdivisions, not one culture
- [x] Fix the scope: the fifty states and Washington, D.C. as `US-DC`, its own culture
- [x] Key every state by its ISO 3166-2 code (`US-XX`), nesting under `usa`
- [x] Hand the campaign to the Playwright, staged in waves, sharpest first
- [x] Count what the campaign left behind: 119 sub-national cultures, 60 conforming
      and 59 not, all of them in the two unfinished parents, ES and US
- [x] Measure the real cost: 168 dead Company elements across the 59, none at zero,
      and not one of them holding a plot_00 or a plot_99
- [x] Establish by probe that the id rename is relink-only and authors nothing, and
      that it is therefore free only until these cultures become packages
- [ ] Take the free half: rename all 59 ids to carry their parent's code, in one
      relink-only change, before any of them migrates
- [ ] Finish Spain: eleven subdivisions, against a parent that is already a package
- [ ] Walk the United States: forty-eight cultures, each owed an origin, a present,
      and its two to five dead
