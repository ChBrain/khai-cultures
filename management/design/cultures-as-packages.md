# Cultures as packages

**Status:** design of record for the package split, adopted 2026-08-25. The campaign it describes is directed by [Cultures as Packages](../orders/order_cultures_as_packages.md). Nothing here is built yet; the first buildable step is the canon question in §7.

## 1. The question

Should the Cultures house publish one package per culture (and per group, per crossing, plus one for the tongues), instead of the single package it ships today?

## 2. What the canon has

The `khai` monorepo keeps two folders of packages. **Engines** are atom domains wired into a chapter, carrying a WIRES card, a generated README and a Playwright wiring guide. **Composites** compose several engines into one read: `@chbrain/khai-composite-absorption` declares `members[]`, `requires[]` and a card, and depends on the atom engines it spans.

A **house** is different. `packages/khai-plays` is the house registry: one card per house, each declaring a `kind` (stage, work or canon), one `package` and one `repo`. Ten houses are registered. This one is registered as **`kind: "canon"`**, glossed by the registry as _plays other productions draw on as material_.

So one house, one repo, one package is written into the registry card, not merely conventional. A culture-as-package is neither an engine (no chapter wiring, no card) nor a composite (composites compose engines; a culture composes nothing, it is content). It is a shape the canon does not yet have.

## 3. Why split anyway

Because of what `kind: canon` promises. A future play staged in its own repo, set in Bavaria, must today depend on all 290 cultures, 14.6 MB of content, to cast one. No house does this yet: `khai-plays-buechner` depends on `@chbrain/khai-engine-spine` and nothing else. The material relationship the registry advertises has never been exercised, and the all-or-nothing dependency is the reason.

Per-culture packages make the promise cheap enough to keep. That is a stronger argument than per-culture install, independent versioning, or separate issue trackers, and it generalises: a stage house with twenty Buechner plays hits the same wall the moment someone wants to draw on one of them.

## 4. What the measurements say

Taken over the house on 2026-08-25.

| Measure                                            | Value                                                       |
| -------------------------------------------------- | ----------------------------------------------------------- |
| cultures / groups                                  | 290 / 19                                                    |
| content                                            | 7,215 files, 14.6 MB, median 25 files and 54 KB per culture |
| national / sub-national                            | 200 / 90 (US 51, ES 19, DE 16, GB 4)                        |
| cross-culture links                                | 699, over 420 culture-to-culture edges                      |
| of those, language positions                       | **691**                                                     |
| of those, culture-positions                        | 8                                                           |
| language-position links in total (own and foreign) | **2,913 across 1,837 files**                                |
| language varieties                                 | 320, unique basenames, each carrying its own `language:`    |
| dead Company entries                               | 1,201                                                       |
| links pointing into a sub-national directory       | 9                                                           |

Two of those decide the design. The cross-culture coupling is **not** a web of cultural dependency: it is one doctrine, that a persona's foreign tongue links the variety in its home culture. The Holy See is cast 42 times because it owns Latin, Saudi Arabia 40 times because it owns Quranic Arabic. And the 2,913 figure, not the 691, is the true cost of moving the tongues, because a culture links its own varieties too.

## 5. The units

**Tongues.** `@chbrain/khai-cultures-tongues`, holding the 320 language positions. This is the one unit with an existing kind: a composite over the language engine, declaring the same `requires` the engine declares (`on: persona, section: Projection, link: expression`) and filled with concrete varieties. A tongue is a cultural position, which is why it deserves a package; it simply is not a country's property.

**Crossings.** A referencing collection like groups, holding people whose lives span cultures, one package per phenomenon rather than per person. Eight personas qualify today, and they split in two: five crossings (Bosnia's Tarik, Canada's Jun, Texas's Elena, Navarre's Ane, Sierra Leone's Crowther) and three of an outsider filed inside the place they governed (Hong Kong's Chris Patten, Bahrain's Bibby, the Seychelles' Pierre Poivre). The second kind is filed backwards today: the colony depends on the metropole because the governor sits with the governed. A crossing depends on the cultures it spans, so the composite depends on the parts and never the reverse.

**Subcultures.** 88 of the 90 hold no link to their parent at all: a Bavarian holds `bayerische Kultur` and is, as staged, not German. The nesting belongs on the position (`bayerische Kultur` is held within `deutsche Kultur`), not on every persona, and as packages it becomes a declared dependency. That is 90 child-to-parent edges: a tree, acyclic, one edge per child, two levels, four parents. A tree in a dependency graph is fine; the 420-edge mesh was not.

**The umbrella.** `@chbrain/khai-cultures` remains, depending on all of them, and keeps the count: its minor is the number of culture dependencies rather than the number of directories. The identity survives the split, it only changes where the count is taken.

## 6. Naming, frozen before the first publish

npm names are effectively permanent, so the rule is settled before anything ships.

- national: `@chbrain/khai-cultures-<id>`
- sub-national: `@chbrain/khai-cultures-<cc>-<id>`, `cc` being the lowercased ISO country code from `geo.json`
- groups: `@chbrain/khai-cultures-group-<id>`; crossings: `@chbrain/khai-cultures-crossing-<id>`; tongues: `@chbrain/khai-cultures-tongues`
- underscores in ids become hyphens in names

The ids themselves are cleaned rather than patched. `georgia_us` exists because Georgia the country and Georgia the state collided in a flat namespace; under the rule it becomes `us_georgia` and the suffix disappears with the collision that caused it. `texas` becomes `us_texas`, `schleswig_holstein` becomes `de_schleswig_holstein`, `scotland` becomes `gb_scotland`. Registry ids are the website's URLs, so 90 of them change; that break is accepted, since the website is to be rebuilt regardless.

## 7. Order of work

1. Attach `ChBrain/khai` with push. Read access is not enough for a canon PR.
2. Answer the canon question: does the world grow a **production** kind, and can a house card say one house, many packages? Everything except the tongues waits behind this. If the answer is no, per-item delivery goes through khai-pack, which already names `culture` as an example bundle kind, and steps 5 to 7 of this list are still worth doing.
3. Write the production contract in khai, modelled on the composite contract minus the WIRES card.
4. Prove it on one real production end to end: validate, workspace-link, changeset, publish.
5. Workspaces skeleton here, holding exactly the house as it is. Reversible, and it proves the tooling.
6. **The walk.** Migrate the tongues variety by variety, ordered by fan-in ascending, batching about ten cultures per pull request. Each batch pays four things at once and leaves those cultures finished: links rewritten to package specifiers, dead Company entries to zero, id renamed to the clean form, and the parent nesting link added where the culture is sub-national.
7. Crossings, then cultures, then groups as packages; then the umbrella takes the count; then the registry build aggregates packages instead of scanning a tree.
8. Repo split, or not. Last, and possibly never.

## 8. Why the walk is orderable

The migration looked un-waveable: the 320 files can live in only one place, so the moment they move, every unrewritten link is red. Ordering by variety dissolves it. **258 of the 320 varieties are linked by exactly one culture**, their own; 282 by two or fewer; 294 by three or fewer. Only six are wide: `en_gb` at 95 cultures, `fr_fr` at 53, `la` at 37, `en_us` at 25, `ru` and `ar_sa` at 24.

So the narrow 258 go first, in single-culture or small-batch pull requests, each paying its own coverage. By the time the walk reaches `en_gb`, most of its 95 cultures are already at zero, and the widest variety is the cheapest to land. The debt is paid front-loaded, the ratchet needs no exemption, and the house is never red.

The renames ride the same walk for the same reason. Only nine links in the house point into a sub-national directory, and eight of them are language positions that the walk removes anyway. Rename after the tongues move and a 90-directory campaign breaks exactly one link.

## 9. Protection

Two tiers, because they catch different things.

**The touch ratchet**, on pull requests, per touched culture, the shape already proven by the coverage gate: touch a culture and its id must conform, its dead entries must be zero, its nesting must be declared.

**The publish gate**, so nothing dirty ever leaves. Per package, checking the name against the rule, zero unwaived dead entries, a declared parent dependency where the culture is sub-national, the canon and language checks, and one complete invariant: **no `../` anywhere in a published package**, which catches every unmigrated link in a single pass. Enforced twice, by `prepublishOnly` in each generated manifest so a manual publish is stopped too, and by a release-workflow step that runs before `changeset publish` so the failure is readable.

Publishing therefore becomes the reward for being clean, not a checkpoint passed once.

## 10. What was considered and rejected

**A big-bang migration with a gate exemption.** Superseded by §8; the fan-in ordering makes the exemption unnecessary, and an exemption for mechanical diffs would have been a hole in the ratchet from its second month.

**Per-culture repositories now.** The benefits that survive a workspace split are separate issue trackers and separate ownership, against 300 sets of workflows, secrets and branch protection, one engine bump becoming 290 dependency pull requests, and every house-wide pass becoming a fan-out. Deferred to last, and it may never be worth it.

**A name-override field for the legacy ids.** Cheaper, and it would have preserved `georgia_us` forever. Clean ids were chosen with the extra work understood.

**Nesting on the persona.** Making every Bavarian hold two culture-positions stretches the mixed-heritage rule to cover something that is not mixed heritage. Bavarianness is a way of being German, not a second passport, so the position carries it.

**Publishing cultures one at a time as they become clean.** Elegant, and it would leave the umbrella as a hybrid for months, holding unmigrated cultures as content while depending on migrated ones as packages. Cleanup is incremental; the split itself is one motion at the end.

## 11. Open

The canon question in §7 step 2 is the only true blocker. Everything before it is measurement and everything after it is downstream. Push access to `ChBrain/khai` is the practical prerequisite.
