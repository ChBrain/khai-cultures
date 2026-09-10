---
khai: order
title: "A Plot Line Runs Forwards"
declared: "A Plot Line Runs Forwards"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-10"
---

# Order: a Plot Line Runs Forwards

**The numbers between plot_00 and plot_99 are a chronology, or the brackets mean
nothing.**

`order_plot_zero.md` gave the origin its own number and held the present at 99 so
that an origin found later could be prepended and a plot appended before the
present, with no renumbering of anything. That whole arrangement rests on one
assumption nobody checked: that the middle runs forwards.

## What was actually there

| What                                             | How many |
| ------------------------------------------------ | -------- |
| units with dated plots                           | 255      |
| units whose dated plots are **not** in order     | **23**   |
| of those, already shipped as production packages | 9        |
| of those, groups rather than cultures            | 2        |
| of those, umbrella cultures                      | 12       |

The worst are not close calls:

| Unit                  | Dated plots, in file order                                  |
| --------------------- | ----------------------------------------------------------- |
| `gb-northern-ireland` | 1609, 1921, 1912, 1998, 1795, 1884, 1985                    |
| `sweden`              | 1523, 1928, 1944, 1921, 1756, 1938, 1939                    |
| `saxony-anhalt`       | 1517, 1925, 1945, 1916, 1990                                |
| `south_carolina`      | 1861, 1745, 2006                                            |
| `us_virginia`         | 1607, 1789, 1781 — the Constitution before Yorktown         |
| `es-canary-islands`   | 1496, 1492 — Columbus's stop after the conquest it preceded |

## The finding this order was written for

`es_canary_islands` shipped at #670 with a plot_00 and a plot_99 written around
it. Its middle already ran 1496 then 1492, and the hand that wrote the brackets
never looked at what it was bracketing. The wall added here refuses that change
when replayed against it, which is the only reason to trust it.

That is the failure worth naming, and it is not carelessness about dates. It is
that **a plot line is easy to read as a list and hard to read as a sequence.**
Three files in a directory, each internally consistent and well written, will not
announce that the second happened before the first. The reader checks each plot;
nobody checks the order. It is the same class of invisibility
`order_plot_zero.md` describes about the floor: nothing looks wrong, because the
thing that is wrong is a relationship and not a file.

## Why this is a counter's business and the rest is not

Whether a plot is the right plot, whether its Cue is a true origin rather than a
state date wearing the number, whether the line covers what matters — none of
that is decidable, and `order_the_defining_question.md` protects it from counters.

Whether 1492 comes after 1496 is arithmetic. This wall holds the arithmetic and
nothing else, and it reads it off two things the house already writes down: the
number in the filename and the year in the prose.

## What it excludes, and why

- **`plot_00` and `plot_99` never take part.** They are the origin and the
  present, deliberately outside the chronology they bracket. An origin is not the
  earliest event in a sequence; it is the answer to a different question.
- **An undated plot is skipped, not failed.** A plot naming no year makes no
  claim about when, which is legitimate — several plots in this house are written
  that way on purpose.
- **Two plots may share a year.** The rule is non-decreasing, not increasing. A
  play staging two things from 1936 is not disordered, and a wall that said
  otherwise would be answered by moving a date.
- **The year is taken from `declared:` first and the Cue second, first year
  winning.** These are written subject-first — _"The Grand Ole Opry Founding
  1925"_, _"In November 1925, WSM radio…"_ — so the first year is the subject and
  a later one is context.

## What it cannot decide

Given `01:1955` and `03:1880` it cannot tell whether the numbering is wrong or a
date is. It reports the pair and says so. The remedy is usually a renumber, and a
renumber is a rename and a relink that authors nothing — the same probe result
the id rename rests on — but choosing between renumbering and correcting a date
is a reading.

## How it is held

A ratchet, on plot prose a change writes, with renames followed by content. A
culture migrating out of the umbrella moves its plots unaltered and owes nothing.
Writing a plot_00 into a line whose middle runs backwards owes the fix.

Twenty-three units are out of order today and the house is green, because the
ratchet fires on what a pull request opens. **Twenty-three plot lines renumbered
in an afternoon to clear a counter would be twenty-three lines nobody read**, and
some of them would be renumbered the wrong way, because in several the question
is whether the date is right and not whether the number is.

## Targets

- [x] Measure it: 23 of 255 units with dated plots run backwards somewhere; 9 are
      shipped packages, 2 are groups, 12 are umbrella cultures
- [x] Establish that the fault is invisible by construction: each plot reads
      correctly on its own and only the relationship is wrong
- [x] A wall that holds only the arithmetic, reading the number in the filename
      and the year in the prose, and deciding nothing else
- [x] Exclude the brackets, skip undated plots, allow a shared year
- [x] Walk directories rather than ids, so cultures, groups and migrated packages
      all reach it and it cannot go quiet on migration
- [x] Verify it refuses the change that prompted it, #670, when replayed
- [x] Verify it passes a change that wrote plots into an ordered line, #673
- [x] Register it in the gates as `plot-order`
- [ ] `es_canary_islands` first, because it is the one this house shipped knowing
      better, and its fix is a renumber of two plots
- [ ] The nine shipped packages, as each is next touched, never as a sweep
- [ ] The two groups, `the_four_nations` and `these_islands`, which belong to the
      group ratchet's walk
- [ ] The twelve umbrella cultures, inside the change that authors each of them —
      eleven are American and fall inside that walk, and `andorra` waits on the
      `ca_ad` deferral
- [ ] Read the eleven American lines for the harder question this wall cannot
      ask: 35 of 48 open in 1800 or later, four in the twentieth century, and
      `tennessee` opens in 1925 with three plots spanning twenty-nine years
