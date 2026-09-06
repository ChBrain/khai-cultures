---
khai: order
title: "A culture without a map"
declared: "A culture without a map"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-05"
---

# Order: A culture without a map

## Direction

The house holds two shapes. A **culture** has a `geo.json` with an ISO code and
gets painted; a **group** has neither and references its members. Three hundred
and nineteen cultures and twenty-one groups fit those two shapes without anybody
having to think about it, because every culture written so far has been a piece
of ground.

The Danish-German border is where that stops. To stage it at all you need four
communities, and they are not four of anything the house can currently hold:

| the four                               | what it is                    | what the house has                           |
| -------------------------------------- | ----------------------------- | -------------------------------------------- |
| Schleswig-Holstein                     | the German majority, a Land   | `de_schleswig_holstein`                      |
| Sønderjylland                          | the Danish majority, a region | nothing; Denmark has no sub-national culture |
| the Danish minority in South Schleswig | a people inside Germany       | nothing, and no shape for it                 |
| the German minority in North Schleswig | a people inside Denmark       | nothing, and no shape for it                 |

The two majorities are ordinary. One exists and the other is a region, which is a
solved problem the house simply has not applied to Denmark yet. The two minorities
are the difficulty, and they are not an edge case: each has its own schools, its
own newspaper, its own political party sitting in a parliament under an exemption
written for it, and its own name for itself. Each is unmistakably a culture and
each holds no ground.

**Nothing in the canon ever said a culture is a place.** A play stages a people.
The `geo.json` said it silently, by being present three hundred and nineteen times
out of three hundred and nineteen, and a rule that is only ever expressed as a
habit is a rule nobody can find when it turns out to be wrong.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

**The build order is four tiers and it is a dependency, not a preference.**

1. **Tongues.** A tongue belongs to the speech community, so it goes into
   `khai-cultures-tongues` before any culture links it. `migrate_culture.mjs`
   already refuses a culture that holds one, which makes this tier enforced rather
   than advised.
2. **Cultures.** A culture cannot be cast by anything that does not exist.
3. **Regions.** A culture at a level below the state, written after the state's
   own culture is in place and conforming.
4. **Groups.** A group is defined by casting member plays, so it is last by
   construction, and the registry derives its references from exactly the plays it
   links.

Read the border example against that and the whole thing is four tiers deep: a
contact variety, two minority cultures, a region, and only then the group. The
sequence is why the group cannot be written yet, and saying so is more useful than
writing a thin one.

**A culture without a map carries no `geo.json` at all.** The kit already treats
`iso` as optional on a registry entry, so nothing needs to break. `iso` does five
jobs: the npm package name, the id prefix the conformance gate checks, the display
name, the region colour and the page URL. Four of them can be taken from the id.
The fifth is the one a mapless culture must never have, because a fill is a claim
on ground, and this ground already belongs to the culture that lives on it. **No
geo, no fill.** A website lists such a culture under its host and paints nothing.

**A mapless culture has two parents, and its id names both.** A territorial
sub-national culture nests in one thing, the polity above it, which is what
`subnational-conformance` checks today. A minority nests in two:

- the **host**, the polity it lives in and is governed by;
- the **kin**, the culture whose tongue, calendar and self-understanding it holds.

That is not a complication bolted onto the rule. It is the definition of the
thing: a minority is a community holding a kinship across a border it does not
cross, and a shape that records only one of the two has recorded the wrong half.
So the id is `<host>_<kin>_minority` — `de_danish_minority`, `dk_german_minority`
— and states both before anyone opens the file.

**Its culture-position links both parents, and neither link is decoration.** It
lives under the host's law, schools and taxes; it holds the kin's tongue and
observances. The entire interest of the culture is that these do not coincide, so
a file that links only the host has described a regional variation and a file that
links only the kin has described an exile.

**What it must not do.**

- It must not claim the host's ISO. Two cultures cannot hold one code: the code is
  a package name and a URL.
- It must not be given a group's shape. It has no member plays. It is a culture
  with its own Company, its own plots and its own pitch.
- It must not be written as a grievance. A minority culture is a way of living and
  is staged like any other, and the difficulty goes where every culture's
  difficulty goes, in the Loses chapter and in the Stakes.

**A region is still a place, and needs nothing new.** Sønderjylland is
`dk_sonderjylland` with a `geo.json`, an ISO and a culture-position linking
`denmark`, exactly as `gb_wales` links `united_kingdom`. The only thing tier three
adds is the ordering: after the state culture, before any group that casts it.

**What this order does not say.** It does not say every minority earns a culture.
The test is the ordinary one and it is the same test a variety file has to pass:
can a play be staged from it? A community with its own schools, press, party and
name for itself can be staged. A population that exists as a census figure cannot,
and writing one anyway produces the thin file this house has spent a year learning
to refuse. The shape now exists so that the ones that qualify have somewhere to
go, not so that the count can grow.

## Targets

- [ ] `subnational-conformance` learns the two-parent case and stops requiring a
      geographic parent code where there is no geography.
- [ ] The registry and the website agree that a culture with no `iso` is listed
      and not painted.
- [ ] `new_culture.mjs` stops demanding `--iso`, which it currently calls
      not guessable, for a culture that is not a place.
- [ ] The first two are written before the first mapless culture ships, not after.
