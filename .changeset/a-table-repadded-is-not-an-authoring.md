---
---

**A defect reported twice, now blocking, and fixed where it belongs.**

When a culture migrates, every group that links it has that link rewritten from
`../../cultures/portugal/play_portugal.md` to
`@chbrain/khai-cultures-portugal/play_portugal.md`. **The specifier is longer than
the path.** When the link sits in a markdown table — which is how this house lists
group members — the column grows, and prettier re-pads **every row of that table**:
the rows about other members, which nobody touched, and the `---` separator, which
carries no content at all.

`defaultRelink` blinds link targets and then compares the text. Those re-padded
rows are not blinded, so it reads them as writing and calls the change an
authoring.

## What that cost

The group is then charged for whatever it already owed, by a pull request that
opened a culture and never opened the group. Measured three times:

- **`visegrad`**, when czechia left
- **`iberia`**, when portugal left — and this one blocked:

```
FAIL  group-ratchet  a group you write in must come out whole.
  iberia: 4 finding(s)
  3 Trigger entr(y/ies) link no plot: The shared peninsula; The age of discovery; The parallel paths
  1 plot(s) no Trigger entry chains: plot_01_tordesilhas_1494.md
  no plot_00 … no plot_99
```

**Not one of those four findings is portugal's.** All four are older than the change
that surfaced them, and paying them means writing three plots for a group nobody
opened. The diff that triggered it is, in full, one link and the padding around it:

```diff
-| PT  | Portugal | [portugal](../../cultures/portugal/play_portugal.md) |
+| PT  | Portugal | [portugal](@chbrain/khai-cultures-portugal/play_portugal.md) |
-| ES  | Spain    | [spain](../../cultures/spain/play_spain.md)          |
+| ES  | Spain    | [spain](../../cultures/spain/play_spain.md)                  |
```

The second pair is the whole bug: the Spain row is **identical apart from trailing
spaces**, and it is what made this an authoring.

## The rule

`relinkOnly` was a thin pass-through to `defaultRelink`. It is now this house's own
verdict: **the kit's answer, plus one case the kit cannot see.** Blind the link
targets as the kit does, and normalise **table column width**, which is layout and
not content.

`normaliseTables` is exported so a reader can run it. It touches only lines that
open and close with a pipe: collapses runs of spaces, and collapses `---` runs,
which are nothing but width.

**It is not a licence.** Everything else still counts — a word changed inside a cell
survives both normalisations and is an authoring. Three tests hold exactly that
boundary, using the iberia table verbatim.

The house now passes its own predicate to the kit's walks too — `touchedUnits` takes
`isRelink` and `authoredFiles` takes `relink` for precisely this — so every wall
that asks the question gets the same answer.

**Deliberately not pushed into the kit.** `defaultRelink` is a general rule; table
padding is a consequence of _this_ house's formatter and _this_ house's habit of
listing members in tables. The kit offers the seam and the house fills it.

## Measured against the change that found it

Portugal's own range, before and after:

```
before:  FAIL group-ratchet — iberia: 4 finding(s)
after:   4 group(s) were only relinked, moved or repackaged and are not charged:
         eu, iberia, lusophone, nato
         Group ratchet: no group authored.
```

`benelux` was the third group predicted to hit this, and now will not.

**None of the group debt is forgiven** — `iberia` still owes its Triggers chain, its
`plot_00` and its `plot_99`, and `group_coverage.mjs --group iberia` still reports
all four. What changes is who is asked to pay: the pull request that writes in the
group, and not the one that renamed a link inside it.
