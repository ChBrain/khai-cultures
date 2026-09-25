---
khai: order
title: "The Sunken"
declared: "The Sunken"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-24"
---

# Order: the Sunken

**A unit is anything the house packs. A culture is a unit the count is taken over.
A group was the first thing that is one without being the other. The sunken is
the second: a production for a people that has ended, assembled out of what the
living are holding.**

`order_a_group_is_not_a_culture.md` settled the hard part of adding a second kind
of production, and this order is written in its shadow deliberately. What it does
not repeat is the mistake that order records: the walls found out about groups by
being handed one.

## They are found in the history of the living

This house can only see a hole that something already points at. Yiddish was
found because four live references named it and no file existed. Magdeburg 1631
was found because the Magdeburger Reiter's own yearbook names the destruction of
the city and no plot staged it.

The sunken are found the same way, and only that way: a piece, a place, a persona
or a reference that names a people the house holds no node for. Swept against
thirty-four spellings of peoples with no successor community, seventeen already
appear in the house:

| named in the house                          | files       |
| ------------------------------------------- | ----------- |
| Taíno                                       | 18          |
| Sumer                                       | 14          |
| Nabataean                                   | 14          |
| Norse                                       | 13          |
| Phoenician                                  | 9           |
| Aksum                                       | 9           |
| Mississippian                               | 7           |
| Carthage / Punic                            | 5           |
| Illyrian                                    | 4           |
| Guanche, Livonian, Cuman, Thracian, Únětice | 1 to 2 each |

Candidates and not verdicts, and the counts are files and not endorsements. Most
of the "Prussian" hits are the Kingdom and its provinces, which is a state and
not a vanished people, and that distinction is the whole of the next section. The
Carthage and Punic hits are one set and not two, four authored files and all of
them Tunisia's, which already stages Carthage as a place and a plot of its own
line. The number is the point: this is a collection of tens, not of hundreds, and
every member was already being carried by somebody.

## The bar: no successor community

A culture is sunken when **nobody is it any more**. Not diminished, not
assimilated into a larger neighbour while remaining itself, not a minority under
pressure. Ended, with no community that would answer to the name.

Latin is not sunken. It became the Romance languages and its successors are five
of this house's cultures. Punic is sunken: it stopped, and the house is already
stuck on it. `order_the_mother_tongue.md` carries an **open** Target saying so -
`libya/persona_septimius.md` grew up in Punic, "which is extinct and unheld, and
no wiring clears that". A tongue can be extinct and a persona can name it, and
there is nowhere for either to point. Únětice is sunken too: nobody is Únětice,
which is exactly why Saxony-Anhalt could take its object without anyone
objecting.

The second half of the bar is as binding as the first. **A sunken culture earns a
node when a living culture is already carrying its remains and saying something
about them.** Without that, this collection becomes a list of every
archaeological horizon with a type site, which is a museum catalogue and not a
house of plays.

## Custody is its present

A sunken production is not exempt from `plot_99`, and must not be. It has a
present. The present is not the people's; it is the remains', and it is usually
contested, which makes it the most interesting chapter in the file rather than
the concession.

The worked example is already in the house, in two places that do not know about
each other. `piece_himmelsscheibe.md` in `de_saxony_anhalt` holds the Nebra sky
disc. `plot_09` of the same culture says what that means:

> Die Menschen, die die Scheibe vor dreieinhalbtausend Jahren vergruben, wussten
> nichts von Sachsen, nichts von Anhalt ... ein geliehener Ursprung für ein Land,
> das seinen eigenen erst noch finden muss.

A borrowed origin. And the only place the house names the people who buried it is
one row of that culture's `REFERENCES.md`, giving the disc's date as the Únětice
culture, circa 1600 BC.

So `unetice`'s `plot_99` writes itself, and it is a live decade: looted in 1999 by
two men with a metal detector, recovered in 2002 in a police sting, held in the
Landesmuseum at Halle, inscribed on the UNESCO Memory of the World register in
2013, and printed on the marketing of a Bundesland that reassembled itself in
1990 as the proof that it has roots. Somebody else's roots.

## A sunken play is a working play

Like a group, and not like a manifest. `nato/` carries its own persona, its own
position and its own plot line from `plot_00_the_convoy` to
`plot_99_alpha_bravo_charlie`; `the_four_nations` carries its own persona, pitch
and position, and casts three flags that live in three other packages. A group
collects and adds.

The sunken does both, with a different anchor. It **collects** the remains, cast
across packages by specifier, which every node type already supports: counted in
the play files of the groups and the migrated packages, 236 plays, 223 positions,
7 processes, 4 pieces, 2 places and 1 persona are cast that way today. It **adds** its own company and its own line: the positions of what it was
to be that people, the personas the record actually attests, the places, and the
plots from an origin to an end.

The line runs origin, then the people's end, then custody. That last stretch is
what a culture's line never has, and it is the reason this is a production and
not an appendix to someone else's.

## What it must not do

- **It must not carry `khai.production`.** The umbrella's minor is the culture
  count, and a sunken play that declared it would move the number by existing.
  `khai.group` is the precedent; `khai.sunken` is the marking.
- **It must not need an ISO code.** All 319 cultures in the house carry one, 200
  countries and 119 subdivisions, which is why the house can hold no culture that
  no state recognises. The sunken is the first production type where that is not
  a defect but the ordinary case.
- **It must not claim descent, and must not be claimed as an ancestor.** Saxony-
  Anhalt is not Únětice's heir. The disc is held, not inherited. A sunken node
  that lets a living culture launder a borrowed origin into a real one has done
  the opposite of its job.

## What the walls already do, and what they do not

The bill for a non-culture unit was paid by the group order, and a sunken unit
inherits the payment. `cultureUnits` splits on membership of `cultureIds()` and
nothing else:

```js
cultures: list.filter((id) => known.has(id)),
notCultures: list.filter((id) => !known.has(id)),
```

So any unit that is not a culture is declined by all four content walls and named
by `notCultureNote`, rather than passing green having inspected nothing, which is
what happened the first time a group was handed to them. Nothing in that split
needs to learn the word "sunken".

**That last sentence was true and incomplete, and staging `cimbri` proved it.**
`cultureUnits` splits on membership of `cultureIds()` and needs to learn nothing.
But `cultures()`, which _defines_ that membership, filters migrated groups out by
directory and filtered nothing else - so the first sunken package walked straight
into `cultureIds()`. The umbrella's minor went to 320, the complete-theatre wall
demanded a pitch and a process of a people that ended in 101 BC, and the registry
counted a culture that is not one. The order's own first rule, broken by the
order's own first play.

`cultures()` now declines a unit whose manifest declares `khai.sunken`, on the
line above the one that declines a group. The prediction at the top of this order
was right about the mechanism and wrong about where the payment fell due: the
walls found out about the sunken by being handed one, exactly as they did with
groups.

What is not paid: the sunken has no walls of its own. Neither do groups, and
`order_a_group_is_not_a_culture.md` still carries that as an open Target. The two
should be answered together rather than twice.

## Where a sunken play lives, found the hard way

This order said "like a group" and then let the first play be built as a package
standing beside the umbrella. That is not what a group is. Every culture and every
group in this house was authored INSIDE the umbrella and migrated out later, and
`the_four_nations` carries the whole route in its own two changesets: a `minor` on
the umbrella to author it in `groups/`, an EMPTY changeset to move it out. The
first is legal because `groups/**` ships; the second because a rename whose source
matched the count glob is exempt - a moved play is not a new play.

Cultures have `cultures/`. Groups have `groups/`. The sunken had nowhere, so
`cimbri` was born as a package - the one shape the route does not have - and three
gates refused it. All three were right.

The sunken is now the umbrella's third collection, declared beside the group's:

```json
"collections": [
  { "dir": "groups", "anchor": "play_", "references": "cultures" },
  { "dir": "sunken", "anchor": "play_", "references": "cultures" }
]
```

The kit needed no change for it. `computeRegistry` already builds one array per
declared collection and keys it by its own key, and takes the version from the
primary alone - so `registry.json` gained a `sunken` array and the minor stayed at
the culture count, 319, by the machinery that was already there.

**And the name does not carry the kind.** `groupName` and `productionName` are
byte-identical on purpose, because a play vertex id is unique across the
collections and the manifest says which kind it is. A `khai-sunken-*` prefix was
proposed here and rejected: it would make the sunken the one unit type that spells
its kind in its name, and the id would stop being the id.

## Targets

- [x] Name the collection and fix the marking: `khai.sunken`, never
      `khai.production`, so the culture count cannot move by a sunken play
      existing. The collection is `sunken/`, declared beside `groups/`; the count
      is taken over `cultures/` alone, so the property is structural now and not
      a rule anything has to remember
- [ ] Write the bar into the authoring contract: no successor community, and
      already carried by a living culture; both halves, or neither
- [ ] State that `plot_99` is custody and not exemption, with the chapter meaning
      written down before the first play is authored
- [ ] Prove the split holds: a test that hands the four content walls a sunken
      unit and requires each to decline it by name
- [x] Stage the first sunken play. It was `cimbri` rather than `unetice`, because
      Denmark was made to carry the Cimbri first and that is the half of the bar
      the house can actually author; `unetice` still waits on nothing but a decision
- [ ] Stage `unetice` as the second, casting the disc from
      `de_saxony_anhalt` and carrying its own line to the custody present
- [ ] Repoint `de_saxony_anhalt` at it, so that `plot_09`'s "geliehener Ursprung"
      borrows from a node that stands on its own
- [ ] Answer the sunken ratchet and the group ratchet together, never separately
- [ ] Ask, before each addition, whether a people is sunken or merely transformed;
      it is a dialogue and never a counter. Carthage is the first hard case: it is
      ended, and Tunisia stages it as a place and a plot of its own line, so the
      question is whether a sunken node would give it a subject or take one away
- [ ] Give `libya/persona_septimius.md` somewhere to point, and close the open
      Target in `order_the_mother_tongue.md` that has no wiring today
