---
---

**The whole order, run end to end, on one group.**

Four turns ago nothing in this house was ready to migrate: every one of the sixteen
remaining groups was held by members still under the umbrella. Visegrad was the
shortest walk — one tongue move away — and this is the last step of it.

```
visegrad -> @chbrain/khai-cultures-visegrad  (group)
  members czechia, hungary, poland, slovakia
  rewrite 0 own link file(s), 0 inbound
```

**Zero rewrites**, because every member link had already been turned into a
specifier by the member's own migration, and **zero stranded `../`** — the backstop
added in #606 refuses a group that would still carry one, and it stayed silent.

## The walk, for the record

| step | what                    | where                     |
| ---- | ----------------------- | ------------------------- |
| 1    | decide a group          | measured, not guessed     |
| 2    | identify the cultures   | czechia already out       |
| 3    | move the needed tongues | #608 `pl` `sk`, #609 `ro` |
| 4    | move the cultures       | #610, #611, #612          |
| 5    | move the group          | here                      |

Step 1 was the only one that needed an argument. The umbrella was **254 cultures,
240 of them blocked by at least one tongue**, and no single tongue move frees more
than two — so the leverage is flat and the question becomes which group is nearest.
Visegrad needed **one** tongue move; lusophone two, iberia four, the eu eighteen,
nato twenty-two.

Step 3 also found the working order's limit. A tongue may be edited during its move
when steps 3 and 4 ride together; `pl` and `sk` serve two cultures at once, so step
3 was its own pull request and one edited byte charged both cultures for ten dead
Company elements. Both landed byte for byte instead. `ro` was the care point stated
outright: it belongs to `romania`, which is not a member and never will be, so it
moved unchanged.

Step 4 cleared **ten dead Company elements** and wrote **five plots**. Hungary's
origin was already written under the wrong number and only needed renumbering;
Poland's and Slovakia's had to be found. Each culture's present moved in a
different direction, which is the honest reading rather than a symmetry: Hungary
empties, Poland fills for the first time in two hundred years, and Slovakia changes
substance rather than direction — the country of sheepfolds now builds more cars per
head than any other on earth.

## Counts

**Production packages 68**, unchanged: a group package is outside that count, as the
Nordics, the Baltics, the Four Nations, These Islands and DACH already are. This is
the **sixth group package**.

**319 cultures at 0.319.0** — a group is not counted, so the minor does not move.

The umbrella's `groups/` directory is down to **fifteen**: anglosphere, asean,
benelux, caricom, central_america, eu, francophonie, hispanidad, iberia,
latin_america, lusophone, mercosur, nato, the_americas, the_andes.

Membership after the rebuild, derived from the play's Company and from nothing else:

```
references: ["czechia", "hungary", "poland", "slovakia"]
```
