---
---

**A report that hides rows now says so, and every check can be asked about one
culture.**

The coverage report prints the worst twenty cultures. Around two hundred and
fifty carry debt, so it was hiding two hundred and thirty-eight rows and saying
nothing about it. `--report | grep egypt` for a culture below the cut printed
nothing, nothing was read as zero, and a culture carrying four dead Company
entries went into a branch as clean. The gate caught it, which is the gate
working — but the report had already lied by omission, and to a grep a hidden
row and an absent one are the same thing.

So the line where the list stops now names what is missing:

```
  ... and 238 more culture(s) NOT SHOWN. This list is the worst 20; do not read
  a culture's absence from it as zero. Use --all, or --culture <id> for one.
```

`--all` prints every row. **`--culture <id>` answers for one culture directly**,
and all three checks take it — coverage, sub-national conformance and persona
wiring — even though only coverage truncates, because the safe habit is asking
about a culture rather than filtering a list that may not contain it.

A test pins the notice: with more cultures in debt than the report shows, the
output must carry it. Removing the line fails the test, which was checked by
removing the line.
