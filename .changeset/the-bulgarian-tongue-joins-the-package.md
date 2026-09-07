---
---

**Third tongue block in three cultures, so this time I looked ahead.**

`migrate_culture.mjs --culture lithuania` refused: `persona_basanavicius.md` links
`../bulgaria/position_language_bg.md`. Jonas Basanavičius spent a quarter of a
century as a doctor in Bulgaria before returning to sign Lithuania's
independence, so his Projection reaches into Bulgarian, and a published production
carries no `../`.

`bg` into the tongues package:

```
1 file changed, 0 insertions(+), 0 deletions(-)
```

**What it holds is worth naming.** Aspect across nearly every verb, and above all
the **renarrative mood** — a verb form by which the speaker marks whether they saw
a thing themselves or are repeating it from someone else. Most Slavic languages
have no such thing. _A language that grammaticises the difference between witness
and hearsay_ is worth recording as exactly that, and the provenance record says so.

`build.mjs --write`: **44 languages, 100 varieties, version 0.44.0.**

## The finding, which changes the shape of the walk

This is the third pull request in a row that had to move a tongue before a culture
could migrate — `et/lv/lt` in #594, `en_ca/fr_ca` in #596, and now `bg`. Each time
I discovered the block by running the migration and reading the refusal. **That is
one blocker at a time, and it is why the last three turns each cost a round trip.**

So this time I ran the check across the whole remaining walk first, and the answer
is that the tongues are the bottleneck, not the cultures:

| Culture     | Tongue blockers |     | Culture                                    | Tongue blockers |
| ----------- | --------------- | --- | ------------------------------------------ | --------------- |
| spain       | **5**           |     | portugal                                   | 2               |
| croatia     | **3**           |     | belgium                                    | 1               |
| bulgaria    | **3**           |     | luxembourg                                 | 1               |
| italy       | 2               |     | poland, hungary, greece                    | 1 each          |
| netherlands | 2               |     | slovenia, slovakia, romania, cyprus, malta | 1 each          |

Seventeen of the eighteen cultures I checked are blocked on at least one tongue.
The EU group needs twenty of them and NATO twenty-four, so **the fastest route to
those two group packages runs through the tongues package, not through the
cultures** — and it wants to be planned as one sweep rather than discovered one
refusal at a time. That is worth an order, and it is the thing to decide next.

Meanwhile `lithuania` is written, at zero dead Company, and blocked only by this.
