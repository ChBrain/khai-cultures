---
---

**The one culture in the walk with no tongue blocker and no dead Company — so this is what a migration looks like when only the ends are missing.**

`czechia` was already at **0 dead, 0 waived, 17 in Company**, and
`migrate_culture.mjs` had no objection. What it owed was `plot-zero`: four plots
running 1415, 1620, 1938 and 1989, with no origin and no present. Two plots added,
in Czech, and two Cues corrected.

## `plot_00` Kotlina a chmel, před kronikou

Walk up onto a ridge and you can see the whole country. Mountains all the way
round, a bowl of fields and forest inside, and beyond the mountains in every
direction a language nobody here understands. **There is nowhere to retreat to and
nowhere to expand into.**

That is an unusual thing in Europe: a near-perfect basin with a border that has
barely moved in a thousand years. Elsewhere countries slosh about; here there is a
vessel — _and everything else follows from it._ What happens, happens to everyone
at once, and a small nation ringed by a much larger one that speaks differently
never has the option a large one has: winning by force.

Hops go out of the Žatec gardens as a wanted good from the twelfth century at
least; the brewhouse is as ordinary a part of a village as the mill. And so a room
exists. **The `hospoda` is not a business, it is the one public space in the
village belonging to neither the priest nor the lord** — one table, spoken Czech,
and the things that cannot be said outside. Which is why, when the language later
drains out of the offices, the schools and the press, it can be revived from
books: _somebody was still speaking it._

## `plot_99` Chalupa a granáty

Friday afternoon the roads out of Prague are solid and Sunday evening they are
solid the other way. Close to half a million cottages for ten and a half million
people.

**Cottaging is not a hobby, it is a residue.** Under normalisation nothing public
could be done that meant anything, so something private was done that did: get
hold of timber, build, have a place the authorities cannot see. The regime
tolerated it, because a man fixing his roof at the weekend is not writing
petitions. It was a bargain and both sides knew which. The regime has been gone
thirty-five years and people still go. **The thing invented as a way to avoid
public life outlived the thing being avoided.**

Then, in 2024, this country does something that looks out of character and is
exactly in character. Nobody makes a speech. Somebody rings half the world, finds
shells where nobody had looked, and organises a delivery for Ukraine that larger
and louder states could not assemble. **It is procurement. It is logistics. It is
precisely the thing** — a nation that never won by gesture and always knew someone
who could get hold of what was needed.

## Two Cues corrected

`plot_02` and `plot_03` opened on estates and on a state. They now open on a
farmer told that Mass will be said differently and that neither he nor his priest
decided it, and on soldiers sitting in concrete on a ridge they spent two years
building, waiting for an order that does not come.

## Then the move

`czechia -> @chbrain/khai-cultures-czechia`, 0 own link files and 7 inbound.
**Production packages 60 → 61.** A member of both the EU and NATO groups, so it
counts toward both.

`czechia`: **0 dead, 0 waived, 17 in Company.** Six plots where there were four.

REFERENCES states three limits: the 993 date for brewing at Břevnov is repeated
**as a claim**; the second-home, beer and irreligion figures are published
estimates in round terms; and the 2024 ammunition initiative is staged for what it
was in character — procurement rather than gesture — and not as a verdict on
anyone else's contribution.

## And then the group ratchet caught me, for a reason worth recording

Migrating `czechia` turned `group-ratchet` red on **`visegrad`** — a group I had
not opened. `eu` and `nato` were correctly spared as relinks. The difference:

```
packages/khai-cultures/groups/visegrad/README.md      -> relinkOnly: true
packages/khai-cultures/groups/visegrad/REFERENCES.md  -> relinkOnly: false
packages/khai-cultures/groups/visegrad/play_visegrad.md -> relinkOnly: true
```

**The member link sits in a padded markdown table.** `@chbrain/khai-cultures-czechia/…`
is longer than `../../cultures/czechia/…`, so the formatter re-padded the other
three rows, and a file that differs only in whitespace stops reading as a relink.
The rule says _only a link's destination is exempt_; a re-padded row is whitespace,
and it should be exempt too.

I could not fix that here — the comparison is `defaultRelink` in
`@chbrain/khai-tests`, and patching only this house's group wall would make it
disagree with the culture walls that share the same hole. So it is **reported, not
worked around.**

The blast radius is bounded and worth stating: of the twenty-one groups, five hold
member play links inside a table — `visegrad`, `benelux`, `iberia`,
`the_four_nations`, `these_islands`. The last two are already whole, so charging
them costs nothing. **The three that would actually block are `visegrad`,
`benelux` and `iberia`, gating nine cultures between them.**

## So visegrad comes out whole, in this pull request

Which is the ratchet working as designed even on a false premise: `visegrad` gates
**four** EU-and-NATO members — poland, czechia, slovakia, hungary — so this is the
highest-leverage thing available, not a detour.

**`plot_00` The Staple and the Road, 1335.** A carter hauling copper north is
stopped at Vienna — not robbed, not taxed, _stopped_, because the city's staple
right makes him unpack and sell before he may go on. Every merchant on the corridor
has the same problem, and there is no natural frontier anywhere along it, so **the
road is the country.** Three kings meet at Visegrád and agree a route around the
staple. _The point is not friendship: three courts that will spend centuries at
odds agree on one thing, because on that one thing they were all standing outside
the same door._

**`plot_99` The Station and the Bloc, since 2022.** A woman on a platform holds
cardboard with a number on it — how many people she can house. Nobody organised
her; there are hundreds within two days. The four take a share of the largest
movement in Europe since the war. **And in the same months the bloc splits over
that war and goes quiet.** Both halves are the same country, and that is the
finding.

It also completes the group's own new position, **`the room next door`** — the
condition of being decided about, by people meeting elsewhere. Its Orders are the
whole group in one line: _the point of a bloc, for these four, was never unity of
opinion — it was attendance._ And its Loses is why the format died: **an office
defined by being outside the room has nothing to say once you are inside it.** They
agreed all the way to the threshold and not one step past it.

Plus `persona_the_haulier`, who is in both plots, gives distances in hours, and
cannot speak to one of his four neighbours in anything but freight English.

`visegrad`: **0 findings.** House-wide the group report goes **14 of 21 owing → 13**,
findings **56 → 52**.
