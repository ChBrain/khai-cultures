---
---

**One of the three links the new wall found. The other two are priced, not
guessed at, and left.**

#606 added the `links` wall and left its own three findings unrepaired. This pays
the one that is genuinely free and reports the two that are not, with the cost
measured rather than assumed.

## What is fixed

**`fr_brittany`** had one stale reference out of ten. `plot_04` was inserted
(Going to Paris) and Nantes became `plot_05`; the table at line 126 and the prose
at line 185 were both renumbered and **line 77 was not**. It read
`[plot_04](plot_04_naoned_er_maez_1941.md)`, and the paragraph around it is
explicitly about Nantes — the `geo.json` case, the culture and the administrative
region not being the same shape, the reason `place_naoned` and
`position_ar_pempvet_departamant` exist at all.

**It shipped inside a published package**, which is the whole argument for the
wall: a link that resolves in this workspace and nowhere else is not a link.

`fr_brittany` is at **0 dead**, so it takes the authoring without owing anything.

## What is reported

**`arizona`** has REFERENCES pointing at two files that do not exist, because
somebody renumbered its plots into chronology and the table kept the old numbers:

| Subject                 | points at                            | is actually                          |
| ----------------------- | ------------------------------------ | ------------------------------------ |
| Central Arizona Project | `plot_02_central_arizona_project.md` | `plot_03_central_arizona_project.md` |
| Code Talkers (1942)     | `plot_03_code_talkers.md`            | `plot_02_code_talkers.md`            |

The files on disk read 1919, 1942, 1968 in order and are right. Each row names a
file that does not exist while the file it means sits beside it under the other
number.

**I claimed in #606 that this repair was blocked by two dead Company elements,
and then claimed here that it was free. Both were guesses; the gate settled it.**
`blindLinks` replaces `](target)` and nothing else — the **label is prose**. So
`[plot_02_…](plot_02_…)` becoming `[plot_03_…](plot_03_…)` changes prose and
authors the culture. Changing only the target would be a relink and would leave a
visible filename that lies, which is worse than the dead link.

So `arizona` must be written in, and behind that stand two things:

- **2 dead Company elements** — `persona_ramon.md`, `process_copper_smelting.md`
  — and it has no `plot_00` and no `plot_99`, so staging them touches the plot
  line and pulls in an origin and a present.
- **The sub-national conformance debt**, which is not arizona's alone:
  **59 sub-national cultures do not conform**, two blocking findings each. Arizona
  must be renamed `us_arizona` and its culture-position must link its parent.
  Renaming a culture id is permanent — the npm name follows it — and it is the
  work `order_stage_the_united_states.md` is for.

A two-character repair standing in front of a 59-culture rename is not a repair to
smuggle through on a link wall. It is named here and left.

## Where the wall stands

```
links: 1 unit(s) owing, 2 finding(s)
```

From 2 units and 3 findings. Both remaining findings are `arizona`'s, and both are
behind that door.

## The correction worth keeping

The lesson is not about arizona. It is that **`relinkOnly` is the only authority
on whether a change authors a culture**, and it reads the committed blobs. A
string handed to `defaultRelink` is not the same question — its third and fourth
arguments are git refs and a root, not text — and answering from the shape of a
diff, as I did twice here, gets it wrong in both directions.
