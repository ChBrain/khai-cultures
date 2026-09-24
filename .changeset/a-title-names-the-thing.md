---
---

**A seventeenth wall: the front matter already says what a node is, so the title
should not open by saying it again.** A file whose front matter reads `khai: place`
and whose next line reads `title: "Place: Corti"` spends the reader's first three words
on something they were just told.

The house had already decided this, in the only way that counts. `play` (340 nodes),
`instructions` (126) and `order` (19) carry the prefix **not once**. Against those 485,
342 nodes across the other nine types carry it — so this is drift, not a second style.

It is also an era rather than a disagreement: **28 units hold all 342, and 291 hold
none**, the largest five being Corsica, Alsace, Brittany, Glarus and Aargau. The units
that have the habit have 14 to 27 each, which is exactly what makes "touch a unit, clean
it" a single mechanical pass.

The separator is the whole test, and it is what keeps real names safe:

| title                  | verdict                                           |
| ---------------------- | ------------------------------------------------- |
| `Place: Corti`         | fault                                             |
| `Plot - U Riacquistu`  | fault                                             |
| `Place de la Concorde` | **fine** — that is what the place is called       |
| `Plan B: the fallback` | **fine** — the separator does not follow the type |

So the rule lands in two pieces, as `order_a_name_reads_as_prose.md` did. `house.test.mjs`
holds `play`, `order` and `instructions` at zero **outright**, across packages and
management both, so the settled types can never drift back. `khai-type-titles` is a
**ratchet over written units** for the other nine, because 28 packages cannot be repaired
in one lane.

The wall was proved against a planted fault before it was trusted: a title changed to
`"Place: Weimar"` in `de_thuringia`, gate run, exit 1 naming the file — then reverted.
`management/orders/order_a_title_names_the_thing.md` records the rule and carries the 342
as targets.
