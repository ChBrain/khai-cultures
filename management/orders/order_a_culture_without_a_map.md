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

**The border produced the shape and also disguised it.** Both of its minorities
have a kin, and each kin is a living state that acts: Denmark pays for the
schools of the Danish minority in Germany, Germany pays for the schools of the
German minority in Denmark, and the Bonn-Copenhagen Declarations of 1955 say in
writing that each will. So `<host>_<kin>` read as the general form for a culture
without a map when it was in fact the border's form.

South Carolina shows the other one. The Gullah Geechee were made on the Sea
Islands out of peoples taken from the Rice Coast, and the creole, the praise
house, the ring shout and the sweetgrass basket were made there and exist
nowhere else. The Catawba were on the Catawba River before there was a Carolina
to be in. Both are unmistakably cultures by the test this order already sets,
both hold ground the house cannot paint, and neither has a kin. The slot is not
unwritten. It is empty, and for two different reasons.

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

**A mapless culture may have one parent, and then its id names one.** The kin
slot is empty in two situations, and neither of them is an omission.

- **Formed in place.** The community was made where it lives, out of peoples who
  no longer answer to any single name, and its tongue, its observances and its
  self-understanding were assembled there. Nobody elsewhere holds the other end
  of the relation, because there is no elsewhere: the Rice Coast gave the Gullah
  Geechee a rice-growing inheritance and the substrate of a language, and gave
  them no kin, because the peoples that inheritance came from were many and were
  not the thing that got made.
- **Indigenous in place.** The host formed around the community rather than the
  community arriving inside the host. Naming a kin here inverts the history: the
  Catawba are not a Catawba minority of some Catawba state, they are the people
  South Carolina was laid over.

**The id of a one-parent mapless culture is `<host>_<name>` and carries no
suffix.** `_minority` in `de_danish_minority` is not a marker of kind — in this
house a name never carries the kind, which is why `groupName`, `productionName`
and `sunkenName` are three byte-identical functions and the manifest is what
says which a unit is. It marks a role: it says that `danish` names the kin and
not some place inside Germany. Where there is no kin there is no ambiguity to
resolve, so there is nothing to add. `us_gullah_geechee` and `us_catawba` are
the whole of the name, and carrying no `geo.json` is the whole of the difference
from `us_south_carolina`.

**Its culture-position links the host, and that is the complete nesting.** One
link, the same one `gb_wales` makes to `united_kingdom`. The two-parent rule
does not degrade into a one-and-a-half-parent rule when the kin is absent; it
does not apply.

**A tongue can be held back, and tier one still holds.** Tier one binds what a
culture **links**, because that is what `migrate_culture.mjs` enforces: a
culture may not carry a tongue file of its own. It does not bind what a culture
**narrates**. The two South Carolina cases fall on opposite sides of that line
and both are satisfied.

- The Gullah Geechee link a tongue, so the tongue goes first. Sea Island Creole
  English has a speech community, an ISO code and a literature, and it belongs
  in `khai-cultures-tongues` before the culture that speaks it is written.
- The Catawba link none. Samuel Taylor Blue died in 1959 and he is the last
  fluent speaker the record names. A dormant tongue is writable — this house
  already holds Punic, and holds it at full length — but it gets written when
  somebody has read the sources and can stage a speech community, never as a
  stub to satisfy a tier. So the culture ships narrating the loss and linking no
  `chc`, and tier one is satisfied because there is nothing to link.

**What it must not do.**

- It must not claim the host's ISO. Two cultures cannot hold one code: the code is
  a package name and a URL.
- It must not be given a group's shape. It has no member plays. It is a culture
  with its own Company, its own plots and its own pitch.
- It must not be written as a grievance. A minority culture is a way of living and
  is staged like any other, and the difficulty goes where every culture's
  difficulty goes, in the Loses chapter and in the Stakes.
- It must not be given a kin to fill the slot. The Mende funeral song that Amelia
  Dawley sang at Harris Neck was traced to a village in Sierra Leone, and her
  daughter went there and heard it sung back to her. That is a recovered
  inheritance and it belongs in the plots. It is not a kin in the sense this
  order uses, which is a reciprocal relation both sides act on now — schools, a
  party, a budget, a treaty. Write the inheritance. Leave the slot empty.
- It must not be staged as a chapter of its host. `persona_yazhi.md` in
  `us_arizona` stages a Navajo weaver who "belongs to Arizona culture through the
  desert-resilient half of its character". Inside Arizona that is a fair line. As
  the only place the Diné appear in a house of three hundred and nineteen
  cultures, it says the Diné are a way of being Arizonan, and the shape defined
  here exists so that it does not have to.

**A region is still a place, and needs nothing new.** Sønderjylland is
`dk_sonderjylland` with a `geo.json`, an ISO and a culture-position linking
`denmark`, exactly as `gb_wales` links `united_kingdom`. The only thing tier three
adds is the ordering: after the state culture, before any group that casts it.

**What this order does not say.** It does not say every minority earns a culture,
and the one-parent case buys no exemption from that: a community formed in place
or indigenous in place faces the same test as a community with a kin.
The test is the ordinary one and it is the same test a variety file has to pass:
can a play be staged from it? A community with its own schools, press, party and
name for itself can be staged. A population that exists as a census figure cannot,
and writing one anyway produces the thin file this house has spent a year learning
to refuse. The shape now exists so that the ones that qualify have somewhere to
go, not so that the count can grow.

## Targets

- [ ] `subnational-conformance` sees a mapless culture at all. This target was
      written the wrong way round and is corrected here: the wall does not
      over-require, it under-checks. `conformance(id)` reads `geo.json` for an
      ISO code, and where there is none it returns an empty verdict and stops —
      so a culture with no map is skipped entirely, and one nesting in nothing
      would pass. Measured on this tree: 206 cultures under the umbrella and 113
      migrated productions, 319 with a `geo.json` and none without, so the
      blindness has never once been exercised. The first mapless culture is the
      thing that exercises it.
- [ ] The wall learns both nestings: two parents where there is a kin, one where
      there is not, and neither satisfied by silence.
- [ ] The registry and the website agree that a culture with no `iso` is listed
      and not painted.
- [ ] `new_culture.mjs` stops demanding `--iso`, which it currently calls
      not guessable, for a culture that is not a place.
- [ ] The wall and the registry are done before the first mapless culture ships,
      not after. This target counted "the first two" until a target was inserted
      above it and the count quietly meant something else; it names them now.
      `new_culture.mjs` is convenience and can follow.
