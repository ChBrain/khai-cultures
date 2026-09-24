---
khai: order
title: "A Title Names the Thing"
declared: "A Title Names the Thing"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-24"
---

# Order: a Title Names the Thing

**The front matter already says what a node is. The title says which one it is.**

Every node in this house declares its type on one line and its title on the
next:

```
khai: place
title: "Place: Corti"
```

The reader has been told it is a place. Then they are told again, and the name
they came for arrives third.

## The house already decided this

Not by argument. By count:

| type           | nodes | titles restating the type |
| -------------- | ----: | ------------------------: |
| `play`         |   340 |                     **0** |
| `instructions` |   126 |                     **0** |
| `order`        |    19 |                     **0** |
| `plot`         |  1601 |                       105 |
| `persona`      |  1275 |                        56 |
| `place`        |   702 |                        51 |
| `position`     |  1453 |                        47 |
| `piece`        |   661 |                        42 |
| `process`      |   602 |                        28 |
| `pitch`        |   323 |                        12 |
| `plan`         |   299 |                         1 |

Four hundred and eighty-five nodes of three types carry the prefix **not once**.
That is a settled convention, and the 342 against it are drift rather than a
second house style.

## It is an era, not a disagreement

Twenty-eight units hold all 342. Two hundred and ninety-one hold none. The five
largest are Corsica, Alsace, Brittany, Glarus and Aargau - French regions and
Swiss cantons, authored in one stretch by someone with the habit.

That is what makes the ratchet work here. The units that have it have a lot of
it, fourteen to twenty-seven each, so touching one and cleaning it is a single
mechanical pass, and the 291 clean units are never charged for a habit they
never had.

## A label, not a name

The separator is the whole test.

| title                  | verdict | why                                    |
| ---------------------- | ------- | -------------------------------------- |
| `Place: Corti`         | fault   | the type, then a separator             |
| `Plot - U Riacquistu`  | fault   | same, with a dash                      |
| `Place de la Concorde` | fine    | that is what the place is called       |
| `Plan B: the fallback` | fine    | the separator does not follow the type |
| `Corti`                | fine    | the name, and nothing else             |

A title that merely begins with the type's word is a name. A title that puts a
colon or a dash straight after it has bolted a label on. Only the English type
name is asked for, because the front-matter key is English and that is what is
being echoed; a title is otherwise read in the language it was written in.

## Two bars, because the types are in different places

`play`, `order` and `instructions` are at zero, so **`house.test.mjs` holds those
three outright**, across packages and management both. The settled types cannot
drift back.

The other nine are a **ratchet over written units**. Three hundred and
forty-two findings in twenty-eight packages cannot land in one lane, and a wall
that turns twenty-eight packages red the day it arrives is a wall that gets
bypassed - the same reasoning `order_a_name_reads_as_prose.md` gives for its 635.

## Targets

- [ ] The 342, cleaned unit by unit in culture lanes. Corsica, Alsace and
      Brittany are the three largest and would take the count under 270 between
      them.
- [ ] When the count reaches zero, fold the nine types into the outright test and
      retire the ratchet.

---

**A reader who already knows it is a place does not need to be told it is a
place. Tell them it is Corti.**
