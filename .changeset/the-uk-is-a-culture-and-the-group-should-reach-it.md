---
---

**A correction to #602: I de-linked the United Kingdom on an assumption I never tested, and the assumption was wrong.**

The isolation wall was right that
`../../../khai-cultures-united-kingdom/play_united_kingdom.md` could not survive the
move — under the umbrella it resolved, as a package it escapes the unit. But there
were two ways to answer it, and I picked the wrong one **without measuring**:
I removed the link, reasoning that linking a culture from a group's files would
make it a member, which is the rule this house states for Ireland.

Measured, with the link restored as a package specifier and the registry rebuilt:

```
references: ["gb_england", "gb_northern_ireland", "gb_scotland", "gb_wales"]
```

**A group's `references` are derived from the play's Company, not from what README
and REFERENCES mention.** The United Kingdom is a culture in this house and a
package of its own, and a group that names the state above its members should be
able to reach it. So the link is restored, by specifier.

The two rules are genuinely different and the REFERENCES note now says so, because
conflating them is exactly the mistake I made:

- **Ireland is not linked at all**, in this group and in `these_islands`, because
  the question there is one of **membership** — a link in the play would put it in
  the wrong group, and that is wrong in a way a website would render.
- **The United Kingdom is linked, by specifier**, because the question here is only
  one of **reachability** — it is not a fifth nation and linking it does not make it
  one.

## And a wall that did not catch the consequence

A published package that links `@chbrain/khai-cultures-united-kingdom` must depend
on it, or the link fails closed at install — the whole argument of
`order_cultures_as_packages`. With the link present and the dependency absent,
`production-packages` reported **0 findings**.

Checked house-wide, that was the only such case in sixty-five packages, so the
convention is real and the wall simply does not read README and REFERENCES for it:

```
packages linking a @chbrain package they do not depend on: 1
   khai-cultures-the-four-nations -> @chbrain/khai-cultures-united-kingdom
```

The dependency is declared here. **The gap in the wall is reported and not patched**
— that is a `tests/**` change and belongs in the governance lane, not in this one.

`the_four_nations`: **0 findings**, references unchanged, production packages
**65**, 0 findings.
