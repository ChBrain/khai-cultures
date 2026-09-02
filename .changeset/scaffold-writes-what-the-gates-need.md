---
---

**The scaffold now writes what the gates require, and asks for the rest.**

`tests/house.test.mjs` fails a culture that is missing `README.md` or
`REFERENCES.md`. `tests/new_culture.mjs` wrote neither. Two cultures reached a
pull request missing one each, and both were found by the gate rather than by
the author - the second one after the first had already been fixed by hand,
which is the definition of a gap that belongs in the tool.

Both are now written. The README names the culture. The REFERENCES arrives
carrying the defining question rather than as an empty heading, because that is
the file the house designates for the answer and for recording what is
deliberately left unstaged.

**The advisory checked four things where the gate checks nine.** "Still to stage"
knew about the culture-position, `plot_00`, `plot_99` and personas. It did not
know that a culture needs at least one of every khai type, at least three plots
and at least two personas, so a scaffold could satisfy every line it printed and
still fail. It now asks for what `house.test.mjs` asks for, and says how many you
have when the count is short.

Verified both ways on a throwaway culture: satisfying the advisory passes the
completeness suite (1480 tests, 0 failed), and removing the README again fails
it with `missing README.md`. An unedited scaffold still reports 46 placeholder
chapters to `khai-staging`, which is the point of the TODO markers and unchanged.

**Correction.** #515 said the scaffold writes `title:` capitalised and
`declared:` as typed, so six files failed conformance on a leading article. That
was wrong: the scaffold emits no `declared:` key at all, and its `title:` and H1
already agree. The mismatch was hand-written, not generated, and there is nothing
to fix here.
