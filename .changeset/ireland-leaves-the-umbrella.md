---
---

**Ireland leaves the umbrella.**

`node tests/migrate_culture.mjs --culture ireland --write`: the directory moves to
`packages/khai-cultures-ireland`, the manifest declares
`khai: { class: "house", production: "ireland", anchor: "play_ireland.md" }`, and
the package depends on what it actually links and nothing else, the tongues
package and the two engines.

The tool reported no blockers and it was right, because the blocker was cleared in
the change before this one. Ireland held two tongues at the start of the week:
`ga_ie`, which left in the walk that took the nine United Kingdom tongues and
became the `ga` anchor, and `en_ie`, which left last release. A culture cannot
migrate while it holds a tongue, and Ireland now holds none.

Two inbound links were rewritten, both in the `eu` group, which casts Ireland in
its play and in `plot_02_the_widening.md` and now reaches it by specifier. Nothing
in Ireland's own files needed touching: the tool reported **0 own link files**,
which is what a culture looks like when its outbound references have already been
cleaned up by the tongue moves.

The count does not move. A migration is not an add, and the registry still reports
**319 cultures** at **0.319.0**, with Ireland's entry changing only its `source`,
from a path under the umbrella to `@chbrain/khai-cultures-ireland`. Production
packages: **52 packages, 0 findings**. Ireland's own walls are unchanged by the
move and were already clean: **0 dead, 0 waived, 18 in Company; 0 blocking, 0
advisory.**

Ireland is a sovereign culture and takes no parent code, unlike the four that were
renamed to `gb_*` this week: its id stays `ireland` and its package name follows
it.
