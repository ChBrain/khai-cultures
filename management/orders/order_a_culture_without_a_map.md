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

**A region is not automatically a place the house can hold, and Denmark is the
proof.** This section said the opposite in the first draft. It claimed Sønderjylland
would be `dk_sonderjylland` with a `geo.json` and an ISO, exactly as `gb_wales`
nests in `united_kingdom`, and that tier three therefore added nothing but
ordering. That is wrong, and the correction matters because it is the **opposite**
break to the one above.

ISO 3166-2 gives Denmark five subdivisions and no more: `DK-81` Nordjylland,
`DK-82` Midtjylland, `DK-83` Syddanmark, `DK-84` Hovedstaden, `DK-85` Sjælland.
They are the health-administration regions drawn in the 2007 reform, they replaced
the counties, and they carry close to no cultural content. **Sønderjylland is not
among them.** It sits inside `DK-83` and its ground is four municipalities, and
ISO carries no Danish municipality. There is no code for it at any level.

Nor does `covers` reach it. Both uses of `covers` in the house are ISO throughout,
`FR-6AE` over two departments and `FR-BRE` over five, and the mechanism was built
to let the anchor and the painted area disagree, not to let the painted area be
made of units ISO does not have.

So there are two ways a culture can fail to have an `iso`, and they want opposite
answers:

| kind                                 | ground   | code     | paint                              |
| ------------------------------------ | -------- | -------- | ---------------------------------- |
| an ordinary culture                  | yes      | yes      | yes                                |
| a region with no code, Sønderjylland | yes      | **none** | **must be painted, and cannot be** |
| a minority, the two above            | **none** | none     | **must not be painted**            |

The minority case is settled by _no geo, no fill_. The coded-region case is not
settled by anything and is left open here deliberately rather than decided in
passing. What is decided is that it is a real gap and not a Danish quirk: it is
every historical region in a state whose administrative map was redrawn for
something other than culture, and this house has already written the doctrine that
predicts it, in `../design/what-a-geo-json-carries.md` — **the level is chosen per
culture**, and Germany, where the Land is both the map and the culture, is the
easy case rather than the normal one.

Two routes exist and one of them is already half-built. `covers` could take a
sub-ISO level, which is exactly what the geo record says geoBoundaries supplies at
ADM2 under a licence the house can use; or the anchor could stop being an ISO
string for such a culture and let the id carry the package name and the URL, which
it can, leaving only the colour to source. Whichever is chosen, it is chosen before
Sønderjylland is written and not during.

**The two parents must be typed, and this is a change the renderer asked for.**
The order first said only that a mapless culture has two parents and that its id
and its culture-position name both. The website side, asked before anything
shipped, agreed the shape is renderable in an ordinary information architecture
and returned one requirement: an untyped list will not do.

> If the registry presently offers only an untyped `parents: string[]`, the
> renderer can still render two parents, but it cannot honestly label why each
> relationship exists.

That is correct and it is the house's problem rather than theirs. A page has to be
able to say _governed within_ over one parent and _cultural and linguistic kin_
over the other, and it cannot infer which is which from an array of ids. Denmark
is the kin of the Danish minority in South Schleswig and Schleswig-Holstein is its
host, and reversing them would describe a different and wrong thing.

So the registry emits the relation with its kind, not a bare list, and the two
kinds are **host** and **kin**. Nothing else in the house needs them yet, which is
the argument for typing them now rather than after a consumer has guessed.

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
- [ ] The coded-region gap is decided before the first culture with ground and no
      ISO is written: either `covers` takes a sub-ISO level, or the anchor stops
      being an ISO string and the id carries what it can.
- [ ] The registry emits parents **typed** as `host` and `kin` rather than as a
      bare list, so a page can label each relation rather than guess it.
