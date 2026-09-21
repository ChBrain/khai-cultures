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

## What a year is, and why four digits was not enough

The first draft read `1[0-9]{3}|20[0-2][0-9]`, which cannot express a year before
1000 or after 2029. **An inexpressible year is not an error; it is silence.** Nine
middle plots name a year the wall could not see, and it reported each of their
lines as checked:

| Unit          | Plot      | Names   |
| ------------- | --------- | ------- |
| `armenia`     | `plot_01` | 301     |
| `armenia`     | `plot_02` | 405     |
| `san_marino`  | `plot_01` | 301     |
| `es-asturias` | `plot_01` | 722     |
| `holy-see`    | `plot_03` | 754     |
| `es-navarre`  | `plot_01` | 778     |
| `iceland`     | `plot_01` | 930     |
| `denmark`     | `plot_01` | ca. 965 |
| `greenland`   | `plot_01` | 982     |

That is the worse of the two failures this wall can have, because it arrives as a
pass. And it made its own findings misleading in the other direction too:
`iceland` reads `01:930 02:1000`, so what looked like a line opening at the year
1000 was a line opening at the earliest year the pattern could say.

Three digits are now a year as well, under two rules that are both measured and
not guessed:

- **Four digits outrank three wherever both appear in the same field.** This is a
  precedence, not a guess about which number comes first. _"The Indianapolis 500
  Inauguration 1911"_ and _"The Route 128 Tech Boom 1970"_ are real declared names
  that put a non-year number before the year, and a plain widening dates them 500
  and 128.
- **One and two digits are refused outright.** _"Mai 68"_, _"Kovo 11"_ and
  _"1989/90"_ all mean a year and none says which century, while _"60 men"_ and
  _"the 19th century"_ are not years at all and read identically. Malta's
  shipwreck of AD 60 stays undated for that reason, and undated is legitimate.

The upper bound is now stated as a number rather than hidden in a pattern, and it
stops at 2100 — because the same prose that carries years carries counts, and
_"3000 people"_ is not the year 3000. The old bound of 2029 would have expired
without saying so.

Measured across all 1334 middle plots before the change was kept: **nine plots
gain a year, none moves, and none loses one.** It was checked that way round on
purpose. A reader that changes an existing answer has to be argued about; this one
changes none, so the widening adds nothing to the standing count of lines out of
order — it adds nine plots to what the wall can see.

**A year before Christ is still inexpressible, deliberately.** The only one in the
house is France's _"Alésia et les ancêtres choisis, 52 av. J.-C."_, and it sits in
a `plot_00`, outside the chronology by construction. A BC middle plot would read
as undated and be skipped — silence again, but silence that cannot misorder
anything. Reading one means reading an era marker in every language the house
writes in, and that is a larger change than this one.

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
- [x] Use it once, and repair what using it exposed: the wall did not charge a
      renumber, because a renumber carries its bytes unaltered and a content
      comparison reports nothing changed — so the first fix the wall demanded
      would have passed it unexamined
- [x] Repair the deeper fault the same replay exposed, in this wall and in
      `diacritic_conformance.mjs` both: the scope was read from the working tree
      rather than from the commits, so replaying any range that was not checked
      out resolved every path against the branch in hand and came back empty. A
      gate that goes quiet when it cannot find a file passes for the wrong reason
- [x] Stop a test asserting a census: the first draft asserted that
      `es_canary_islands` was among the offenders, and the next change fixed
      `es_canary_islands` and the test failed. A wall's tests hold its contract,
      which does not move, not its findings, which are meant to reach zero
- [x] Widen what counts as a year: the four-digit pattern could express neither a
      year before 1000 nor one after 2029, so nine dated plots read as undated and
      their lines reported as checked. Four digits outrank three in the same field,
      one and two digits are refused, the upper bound is named rather than hidden,
      and the change gives nine plots a year without moving any existing one
- [ ] A year before Christ, when a middle plot needs one. Today the only BC date
      in the house is France's `plot_00`, outside the chronology by construction,
      and a BC middle plot reads as undated rather than misordered. The fix is an
      era marker read in every language the house writes in
- [ ] Malta's `plot_01`, whose AD 60 is a two-digit year this wall will not read
      and should not guess at
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
