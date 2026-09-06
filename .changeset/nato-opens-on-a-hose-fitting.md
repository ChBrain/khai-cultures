---
---

**No group in this house is a harder passport case than this one.**

`groups-and-references.md` §2.1.1 warns that a group is the easy place to get
`order_the_passport` wrong, "because the obvious material for an alliance is the
alliance" — and NATO's obvious material is a treaty article, a summit table and
an accession list, with nothing else offering itself. All four Cues duly opened
on states: _the Soviet Union holds eastern Europe_, _the Cold War hardens_, _the
Wall falls_, _the nations of the East ask to come in_.

Plus the group ratchet's usual four: three themed Trigger entries linking none of
the four plots beside them, no `plot_00`, no `plot_99`, no own Company.

**Every Cue now opens on a person.** Three merchant seamen of three nationalities
on the same tanker. Aircrews landing coal into a blockaded city every few minutes
for eleven months. A farmer in Lower Saxony who learns his field has a number and
that a foreign brigade will drive across it once a year and the state will pay him
for the crop. A Bavarian conscript whose exercise is cancelled, then the next one,
and then his barracks is a business park. A Polish officer who spent his career
learning Soviet doctrine in Russian, sent on a language course at forty-one.
Somebody in a call centre spelling a surname.

## `plot_00` The Convoy, 1939 to 1945

**The alliance is named after an ocean, and this is the ocean.** Five years and
eight months without a pause, the longest campaign of the war, fought by civilians
in civilian ships. The crews are the point: merchant seamen of every nationality
on both shores, in a fleet stitched together out of whoever has hulls — Norway's
merchant fleet does not go home when the country falls in 1940 but goes over to
the Allied side and is run from London and New York.

What is learned here is **not** that the West should have an alliance. It is
narrower and more durable: that the ocean is not a moat, that keeping a lane open
is done by people who are not soldiers, and that ships from eight countries can
only sail in one formation if somebody agreed in advance what the signals mean.
`the same words` starts on a signal lamp, four years before anyone drafts a treaty.

## `plot_99` Alpha Bravo Charlie, and the Nozzle

The alliance's most-used export is **a way of saying letters aloud**, spoken daily
by pilots, coastguards and call-centre staff on every continent, almost none of
whom have heard of it. Behind it sit several thousand agreements at the altitude of
a hose fitting: one fuel, a shareable cartridge, a pallet that fits every hold, a
casualty tag anyone can read. Almost nobody in the thirty-two has read one; all of
them depend on all of them.

**The thing the alliance is famous for is a promise, and a promise cannot be tested
without being spent. The thing it does every day is small and continuously
verifiable.** The first is what gets debated; the second is what would decide
anything, and it is also what quietly loses every budget round, because a fitting
that has never had to fit looks exactly like an expense.

## Its own Company

- **`position_the_same_words`** — not a language and not translation: an agreed set
  of words, shapes and fittings so narrow no conversation is possible through it
  and so exact no misunderstanding is either. It orders that the standard beats the
  preference every time, which is also where its resentment comes from: the
  standard is usually somebody else's and everybody knows whose.
- **`persona_the_technician`** — a sergeant on a four-month rotation turning around
  aircraft that are not her air force's, with four hundred words of the English the
  alliance runs on. Her gap is the opposite of every other persona's in this house:
  **the exact part of her job is the part where language is not involved.** Her
  Shadow is that her competence is an argument she is never in the room for.

## Numbers

`node tests/group_coverage.mjs --report`: **16 of 21 owing → 15**, findings **64 →
60**. `nato: 0 finding(s)`. Staging: 0 findings.

REFERENCES credits two things precisely because they are easy to state loosely: the
spelling alphabet was made for **civil aviation** and adopted by the alliance, not
invented by it; and the line about a merchant seaman's wages stopping when his ship
sank refers to the first years of the war in the British service, a practice ended
by agreement during it.

## Two READMEs, one of them mine to fix

Each group's `README.md` lists its plots by hand, and both were stale: NATO's
listed four, and **the EU's still listed four after the previous pull request
added two** — an omission from #591 rather than a pre-existing one, so it is
corrected here rather than left. Both now list the full line and name the group's
own Company. NATO's README also had em-dashes throughout, which the house writes
as `-`; those are normalised, and the same rule caught one in the new persona
before the commit.

## What is not happening here

Neither group is becoming a package, and neither can yet. `migrate_culture.mjs
--group` refuses both, and says why:

```
eu cannot migrate yet:
  - 20 of 27 member(s) are still under the umbrella
nato cannot migrate yet:
  - 24 of 32 member(s) are still under the umbrella
```

A group's manifest has to depend on its members by name, so the members go first.
That is precisely why the group ratchet was built to read **both homes**: the
content debt can be paid now, in place under the umbrella, and the migration
happens whenever the member walk reaches twenty and twenty-four more cultures.
