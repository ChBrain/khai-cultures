---
---

**Steps 4 and 5, on a group whose 1, 2 and 3 were already done.**

The working order is now: **decide a group, identify its cultures, move the tongues
they need (editing them as part of the move), move the cultures, then move or
create the group.** This is the first group run under it, and it starts at step 4
because #601 had already, without naming it that way, done 1 through 3: the group
is `the_four_nations`, the members are the four UK nations, and `es_es` was the
one tongue standing in the way — Henry VIII's Projection reaches into peninsular
Spanish through Catherine of Aragon, and a published production carries no `../`.

So this is two moves.

**`gb_england -> @chbrain/khai-cultures-gb-england`**, 0 own link files and 13
inbound. It was already at **0 dead, 0 waived, 17 in Company**, with nine plots
spanning `plot_00 the_angelcynn` to `plot_99 the_question_nobody_answers`.

**`the_four_nations -> @chbrain/khai-cultures-the-four-nations`**, 0 own link files
and 0 inbound, depending on all four members by name:

```
@chbrain/khai-cultures-gb-england, -gb-northern-ireland, -gb-scotland, -gb-wales
```

**Production packages 64 → 65**, and this is the **third group package** in the
house, after the Nordics and the Baltics.

`gb_england`: 0 dead. `the_four_nations`: 0 findings — it was brought whole in
#590, when its dead `persona_the_secretary` was staged in `plot_99`.

## One consequence of the new order, worth stating now

Under the old discipline a tongue moved byte-identical, because editing it during
the move authored the culture that held it and charged it for every dead Company
element. **The new order removes that constraint honestly rather than by
exception**: the group's cultures are authored at step 4 regardless, since a
migration adds packaging files and an addition is not a relink. A tongue edit at
step 3 therefore costs them nothing they were not already paying.

The one case that still wants care is a tongue held by a culture **outside** the
group being run — editing it would charge a culture nobody opened. That is a check
to make at step 3, not a reason to keep the old rule.

**And a debt this unlocks.** `et`, `lv`, `lt` still read `title: "the Estonian
Language"` and so on where the package writes the bare name, and `ar` still reads
`"Saudi Arabic"` — all deferred because fixing them would have authored their
cultures. Those cultures are now packages and no longer hold those files, so
**editing them authors nothing at all**. That is a package-only follow-up, now
free to take.

## Two things the walls caught on the way

**The isolation wall found a link that had always been wrong and had never cost
anything.** Both the README and REFERENCES named the state above the four with a
relative link, `../../../khai-cultures-united-kingdom/play_united_kingdom.md`.
Under the umbrella that resolved; as a package it escapes the unit, and a
published production cannot carry it.

The fix is not to rewrite it as a package specifier. **The United Kingdom is not a
fifth member of the four nations** — it is the state above them, and this group
exists to stage what the four made with each other, which is emphatically not the
Union. The house had already written that rule two paragraphs further down the same
file, for Ireland: _named in prose and nowhere cast, because the registry derives a
group's `references` from exactly what its files link._ So `united_kingdom` is now
named and not linked, on its own house's rule. Verified after the rebuild: the
group's `references` are still exactly `gb_england, gb_northern_ireland,
gb_scotland, gb_wales`.

**And a process fault of mine, twice now.** The migration rewrites a link in place
without re-padding the markdown table it sits in; a later `prettier` pass re-pads
it. If the commit happens between those two, the commit is not canonical — and the
prettier wall does not catch it, because it checks the working tree while every
ratchet reads the commit. It bit `the_four_nations` and `these_islands` in #601 and
`these_islands` again here. The fix is mine to make, not the house's: **run the
formatter in the same command as `git add`, never in an earlier one.**
