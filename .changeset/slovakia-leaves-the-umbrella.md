---
---

**Visegrad, member three of three.** Slovakia out, at zero dead Company, with both
ends of its plot line written.

Slovakia carried the heaviest debt of the three — **six dead Company elements**:
Anna, bryndza, the fujara, faith, folklore and the pilgrimage. They divide cleanly
between an origin and a present, because they are the same two things a century
apart.

## plot_00: Po hrebeňoch

Slovakia's founding date is 1993, which would be the passport `order_plot_zero.md`
warns against, and Great Moravia would be a state as well. The origin that is
neither is **how the people got onto the land at all**.

From the fourteenth century the Wallachian pastoral colonisation comes **along the
Carpathian ridges** and settles the high pastures, where ploughland is not worth
having. A people that takes a country that way does not take it by conquest: it
has no lords of its own, no king and no city — it has the sheepfold, the village
and the parish. From sheep, milk and potato it makes a food; from wood and breath
an instrument; from song and costume a memory that needs no paper. **Up on the
pasture it is free and down in the valley it serves, and it does both in the same
century.**

The Cue is a shepherd driving sheep up to grass that will last till autumn: the
valley below belongs to a lord who speaks another language, but above the treeline
the pasture belongs to nobody who would want to walk on it.

It stages **bryndza**, whose own Load Bearing says it came from the pastoral culture
that arrived along those ridges; the **fujara**, the big sound a small nation made
out of wood and breath; and **folklore**, the rite by which the nation held itself
together when it had neither a state nor a written language.

The Tension sets up everything downstream: a land taken from above rather than
below gave the people what nobody can take — a pasture nobody wants and a custom
that needs no office — but taught them that the lord is always someone else and
always down in the valley. **`position_culture_mlady_narod` says the nation never
had a nobility of its own**, and this is where that starts.

## plot_99: Salaš a linka

`plot_04`'s Tension already named emigration and the temptation to stay the little
brother. What it did not name is what actually happened: **within one lifetime the
country of sheepfolds became the country that builds more cars per head than any
other on earth.**

The Cue is Marek leaving for the 5:30 shift and passing the turning to the village
he grew up in — a **non-state subject**, as `order_the_passport.md` requires. On
Sunday he takes that turning, because Anna is waiting with lunch; in summer he goes
further, on the pilgrimage.

The village that held faith, song and costume for centuries stands empty on
weekdays and half full on Sunday, and **several hundred thousand people still come
to the Marian pilgrimage at Levoča, among them young people who otherwise do not go
to church.** The custom has outlived the community that made it, and nobody quite
knows how long that lasts.

It stages the remaining four. **Anna** holds faith, pilgrimage and feast days in a
village with nobody left to hold them with. **viera** — the parish held the people
when they had no state, and now holds the village when it has no people. **púť** —
the voluntary hardship that draws even the one who does not come on Sunday. And
**folklore**, which moved out of the village onto a stage and into an ensemble, and
goes on living there.

The Tension: `svojprávnosť` demanded that the nation rule itself, and it does; it
did not demand that the nation choose what it lives by. **The work came from
outside, it is good, and it is foreign, and it holds the country together by
driving it out of the village every morning.**

## The move

`slovakia -> @chbrain/khai-cultures-slovakia`, **0 own link files and 6 inbound**.
Its Slovak went into the tongues package at #608.

**Production packages 67 → 68. 319 cultures at 0.319.0.**

Rebased onto `main` after #610 and #611 merged, which is where the count now comes
from. The rebase carried seven conflicts and every one was the same fault repeating:
five group files each hold a line naming two or three Visegrad members together, and
each migration rewrote only its own country's link on it. No side is right alone, so
all the rewrites are kept and each shared line now reaches every member by specifier
— `eu/play_eu.md`, and `visegrad`'s README, REFERENCES, play and `plot_01`. Verified
afterwards house-wide: **no relative link to any of the four members survives in any
group.** `package-lock.json` and the umbrella manifest were rebuilt rather than
merged by hand, which is how a lockfile stops matching its manifests.

**And one that resolving by hand got wrong.** Taking `main`'s copy of the umbrella
manifest wholesale discarded the `@chbrain/khai-cultures-slovakia` dependency the
migration had added to it, which `npm run registry` does not put back — it is the
migration that writes it, not the build. Two walls caught it, `production-packages`
naming it outright (_was lifted out of `cultures/` and is not a dependency_) and
`conformance` failing on the same fact. The dependency is restored and both pass.
That is the difference between a build artifact and a manifest: the lockfile may be
regenerated, the manifest carries a decision and has to be merged.

## Visegrad

| member   | state          |
| -------- | -------------- |
| czechia  | package (#599) |
| hungary  | package (#610) |
| poland   | package (#611) |
| slovakia | **package**    |

**All four. The group is next, and it is the last step.**
