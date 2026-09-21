---
---

**The plot-order wall could not express a year before 1000 or after 2029, so nine
dated plots read as undated and their lines were reported as checked.**

An inexpressible year is not an error; it is silence, and silence from a wall
arrives as a pass. The pattern was `1[0-9]{3}|20[0-2][0-9]`. These nine plots name
a year it could not see:

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

It also bent the findings the other way. `iceland` now reads `01:930 02:1000`, so
what looked like a line opening in the year 1000 was a line opening at the
earliest year the pattern could say.

## Two rules, both measured rather than asserted

**Four digits outrank three wherever both appear in the same field.** A
precedence, not a guess about which number comes first, and this is where a plain
widening breaks: _"The Indianapolis 500 Inauguration 1911"_ and _"The Route 128
Tech Boom 1970"_ are real declared names that put a non-year number before the
year, and a wider pattern alone dates them 500 and 128.

**One and two digits are refused outright.** _"Mai 68"_, _"Kovo 11"_ and
_"1989/90"_ all mean a year and none of them says which century, while _"60 men"_
and _"the 19th century"_ are not years at all and read identically. Malta's
shipwreck of AD 60 stays undated for that reason, and undated is a legitimate
state in this wall.

The upper bound is now a named constant at 2100 rather than a hidden one at 2029,
because the same prose that carries years carries counts and _"3000 people"_ is
not the year 3000.

## What it changes

Measured across all 1334 middle plots before this was kept:

|                         | before | after   |
| ----------------------- | ------ | ------- |
| dated middle plots      | 682    | **691** |
| units with dated plots  | 254    | **255** |
| plot lines out of order | 20     | 20      |
| existing years moved    | -      | **0**   |
| existing years lost     | -      | **0**   |
| plot-order tests        | 8      | **13**  |

Checked that way round on purpose. A reader that changes an existing answer has to
be argued about; this one changes none. All nine newly readable years sit at the
front of their lines, so nothing new goes out of order and the standing count of
twenty is untouched.

Each half was verified by breaking it: narrowing the pattern back fails both the
fabricated test and the one that asks the house itself, and removing the
precedence fails the Indianapolis case alone. The corpus test is the one that
matters - fabricated strings keep passing against a reader no file exercises.

## What it still cannot read

**A year before Christ, deliberately.** The only one in the house is France's
_"Alésia et les ancêtres choisis, 52 av. J.-C."_, and it sits in a `plot_00`,
outside the chronology by construction. A BC middle plot reads as undated and is
skipped - silence again, but silence that cannot misorder anything. Reading one
means reading an era marker in every language the house writes in, which is a
larger change than this and is now a Target.

No package content changes here; this is the governance lane.
