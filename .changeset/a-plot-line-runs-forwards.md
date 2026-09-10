---
---

A wall that reads whether a plot line runs forwards.

`order_plot_zero.md` gave the origin its own number and held the present at 99 so
an origin found later could be prepended and a plot appended before the present
with nothing renumbering. That whole arrangement rests on one assumption nobody
checked: **that the middle runs forwards.**

**Measured: 23 of 255 units with dated plots run backwards somewhere.** Nine are
already shipped as production packages, two are groups, twelve are umbrella
cultures. They are not close calls — `gb-northern-ireland` runs 1609, 1921, 1912,
1998, 1795, 1884, 1985; `sweden` runs 1523, 1928, 1944, 1921, 1756, 1938, 1939;
`us_virginia` puts the Constitution before Yorktown.

**And one of them is mine.** `es_canary_islands` shipped at #670 with a plot_00
and a plot_99 written around a middle that already ran 1496 then 1492 — Columbus's
provisioning stop numbered after the conquest it preceded. I wrote the brackets
and never looked at what I was bracketing. The wall refuses that change when
replayed against it, which is the only reason to trust it.

The failure is worth naming precisely, because it is not carelessness about
dates: **a plot line is easy to read as a list and hard to read as a sequence.**
Three files in a directory, each internally consistent and well written, will not
announce that the second happened before the first. The reader checks each plot;
nobody checks the order. Same class of invisibility `order_plot_zero.md` names
about the floor — what is wrong is a relationship, not a file.

**Why it is a counter's business.** Whether a plot is the right plot, whether its
Cue is a true origin, whether the line covers what matters — none of that is
decidable, and `order_the_defining_question.md` protects it. Whether 1492 comes
after 1496 is arithmetic. This wall holds the arithmetic and nothing else, read
off two things the house already writes down: the number in the filename and the
year in the prose.

**What it excludes.** `plot_00` and `plot_99` never take part — they are the
origin and the present, deliberately outside the chronology they bracket. An
undated plot is skipped rather than failed, because naming no year is a
legitimate choice and several plots here are written that way. Two plots may share
a year: the rule is non-decreasing, not increasing. The year comes from
`declared:` first and the Cue second, first year winning, because these are
written subject-first.

**What it cannot decide.** Given `01:1955` and `03:1880` it cannot tell whether
the numbering is wrong or a date is. It reports the pair and says so. A renumber
is a rename and a relink that authors nothing — the same probe result the id
rename rests on — but choosing between renumbering and fixing a date is a
reading.

**Held as a ratchet**, on plot prose a change writes, renames followed by
content. A culture migrating out of the umbrella moves its plots unaltered and
owes nothing; writing a plot_00 into a line that runs backwards owes the fix.
Verified both ways: it refuses #670, and passes #673, which wrote two plots into
an ordered line.

Twenty-three are out of order today and the house stays green. Renumbering them
in an afternoon to clear a counter would be twenty-three lines nobody read, and
some would be renumbered the wrong way, because in several the question is
whether the date is right and not whether the number is.

Adds `tests/plot_sequence.mjs`, seven unit tests in `house.test.mjs`,
`management/orders/order_a_plot_line_runs_forwards.md`, and the `plot-order` gate
with its CI job. Fifteen walls now.

One thing this wall deliberately cannot ask, recorded in the order as an open
Target: the eleven American lines it flags are also the ones whose _shape_ is
weak — 35 of 48 open in 1800 or later, four in the twentieth century, and
`tennessee` opens in 1925 with three plots spanning twenty-nine years. Order is
decidable; that is not.
