---
"@chbrain/khai-cultures": minor
---

**The four nations of the United Kingdom become a group, and the group is not
about the Union.**

The state above them is already a culture in this house, `united_kingdom`, and it
stages Britishness: the Crown, Westminster, class, the Union Jack. A group is a
different question. `management/design/groups-and-references.md` §2.1.1 says a
group's arc is what its members did **together**, and warns that a group is the
easy place to get `order_the_passport.md` wrong, "because the obvious material for
an alliance is the alliance". The obvious material here is the Acts of Union and
devolution, all of which belongs to the culture above. None of it is staged.

What the four actually built together is narrower and much stranger. In three
decades, in taverns and hotel rooms and with no government involved at any point,
they codified a set of games and founded the bodies that govern them, and those
bodies still bind the rest of the world.

- **`plot_00` The Games Before the Rules, before 1860.** Shrovetide football
  through the streets of a market town, the Ba' in Kirkwall, `cnapan` across the
  fields of Pembrokeshire, `caid` in Ireland. Codification did not invent a game;
  it settled an argument between four peoples who had each been playing their own
  answer for centuries, which is why the codes came out four-shaped.
- **`plot_01` The First International, 1872.** Four thousand people at a cricket
  ground in Partick watch the first international football match ever played, and
  it is between two nations of the same state. It finishes goalless. Every
  national side that has ever existed anywhere descends from that afternoon.
- **`plot_02` The Board That Writes the Laws, 1886.** Four associations form a
  board to stop arguing about whose rulebook applies. It becomes the constitution
  of a world sport. Today it has eight votes, four with the world body and one
  each, and six are needed to change anything, so the world cannot alter a law of
  football without at least two of these four agreeing.
- **`plot_03` The Championship and the Lions, 1883 to 1984.** A hundred and one
  years of the four playing each other, the oldest international tournament in any
  sport, killed by fixture congestion, money, crowd trouble and a Belfast fixture
  two of them would not travel to. What outlives it is the touring side that adds
  the country that left.
- **`plot_99` Four Teams, Four Rules, since 1999.** Devolution hands three of the
  four what the fixture list handed all four in 1884. The associations resist an
  Olympic side. Then a pandemic runs the country the way the sport always had, and
  the phrase for it is _the four nations approach_, a sporting expression that had
  been waiting a hundred and forty years for a government to need it.

The group carries its own position, **the four teams**, and a pitch. Its Loses is
the one that ties back to `gb_england`: three of the four came out of the
arrangement with a team, a flag and an anthem, and the fourth has the team and the
flag and sings the state's song, because when the arrangement was made England did
not think of itself as one of four.

Every Cue has a non-state subject: a parish at Shrovetide, four thousand people at
a turnstile, four associations with four rulebooks, a fixture played every year
for a century, and four sides lining up for four anthems.

**One deliberate omission.** Ireland is named in plot 3 and nowhere linked. The
registry derives a group's `references` from exactly what its files link and the
design record treats those references as the membership, so a link would have put
Ireland in the United Kingdom's group, which is wrong in a way a website would
render. Checked after the build: `references` is the four and only the four.

Groups are not counted, so the registry stays at **0.319.0** with 319 cultures and
20 groups.

The changeset is `minor` because the guard requires it of any play add, and the
version reconcile then clamps it back: a `patch` here would survive the
reconcile and drift the version to `0.319.1`. The minor lands off the count and
is clamped to `0.<count>.0`, so the number does not move for a group.
