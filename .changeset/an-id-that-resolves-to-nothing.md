---
---

**Two walls answered green for a question they never asked.** `company_coverage.coverage()`
and `culture_conformance.conformance()` both begin by resolving an id to a directory, and
both used to return an empty result when that failed. So `eu` (a group) and
`nonexistent_xyz` (a typo) came back with the same spotless report as a culture that had
actually been read — no dead Company entries, no blocking findings, nothing owed.

Both now refuse, naming the id and the module that should have been asked instead.

This overturns a deliberate choice, so the reasoning matters. The empty return was
introduced to fix a real bug: three of `coverage`'s returns carried only three of its four
keys, and the gate destructured `superseded` off the missing one and died on a TypeError
raised deep inside itself — a failure that says nothing while looking as though the content
was at fault. Four keys everywhere was the right fix, and it still holds.

But a TypeError from a missing key and a named refusal are not the same failure. One is a
wall falling over; the other is a wall answering. `plot_zero.mjs` already refuses this exact
case, in these words: _fail closed, loudly, and never in the direction of green_. The house
was holding two policies for one situation, and now holds one.

Nothing in the house was relying on the silence. The whole suite passes at 415, and the one
test that asserted the old behaviour is split in two: the shape guarantee stays, held over
cultures that resolve, and a second test holds the refusal.

Worth recording, because it corrects an earlier reading: **groups are not unwatched.**
`group_coverage.mjs` answers for them with its own ledger — `unlinked`, `orphans`, `broken`,
`dead`, `noOrigin`, `noPresent`, `plots`, `entries` — behind the `group-ratchet` wall. The
fault here was never that nobody looks at groups; it was that the culture modules answered
for them anyway, and answered clean.
