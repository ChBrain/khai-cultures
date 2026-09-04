---
---

**The nine tongues of the United Kingdom leave their cultures. Nothing is
rewritten on the way, and the reason is a ratchet.**

England, Scotland, Wales and Northern Ireland each held their own languages as
files inside the culture, which is the arrangement this package exists to undo.
Nine files move. Two are renamed on arrival and two more had to come with them,
because a variety cannot hang from an anchor that does not exist.

| moved                                              | to                             | why                   |
| -------------------------------------------------- | ------------------------------ | --------------------- |
| `en_gb_eng`, `en_gb_sct`, `en_gb_wls`, `en_gb_nir` | `en/`                          | the anchor was there  |
| `cy`, `gd`                                         | `cy/`, `gd/`                   | anchors in themselves |
| `sco_gb_sct`                                       | `sco/position_language_sco.md` | renamed to the anchor |
| `sco_gb_nir`                                       | `sco/`                         | hangs from it         |
| `ga_ie` (from `ireland`)                           | `ga/position_language_ga.md`   | renamed to the anchor |
| `ga_gb_nir`                                        | `ga/`                          | hangs from it         |

The two renames are the correction the Danish note already wrote down: a tongue
held by a country is the thing being undone. Neither file argued otherwise.
`sco_gb_sct` declared _the Scots tongue_ and every chapter in it was family-wide;
`ga_ie` declared _an Ghaeilge_ and had nothing of the Republic in it. The region
tag was the culture's, not the file's. Irish had to be fetched from outside the
four, because the alternative to moving a perfectly good anchor was writing a
second one beside it.

**Four arrived wanting work, and the work is deliberately not here.** Read
against the mnemonic on the way through, `en_gb_eng` is the `en` anchor entire,
`sco_gb_nir` is three quarters of the Scots anchor now sitting directly above it,
`ga_gb_nir` repeats the Irish anchor in three chapters of four, and `cy` has lost
its circumflexes. Each provenance entry names the fault and names the material
that should replace it.

They are not fixed in this step, and that is a structural fact rather than a
preference. A file in `cultures/<id>` that moves byte for byte is a rename, and
the two house ratchets spare a culture that was only relinked or moved. Edit one
byte of it and the same move becomes an authoring of that culture, which charges
it for every dead Company element and for sub-national wiring it does not have:
19 elements across England, Wales and Northern Ireland, and a rename of all three
ids to `gb_*`. That is the cultures campaign, and it is not the price of moving a
tongue. So the move lands whole, every culture stays relink-only, and the four
rewrites follow inside this package, where they touch no culture at all.

The other five move clean. `en_gb_sct`, `en_gb_wls` and `en_gb_nir` were already
spending their chapters on themselves, and `gd` and the two new anchors need
nothing. Every non-English file is flagged `review: native`. Six tongues, no
speaker.

`build.mjs --write` took the package to 0.34.0 at 34 languages and 86 varieties
and updated the declared range in the 53 packages that depend on it. Five
cultures gave up a file and keep the tongue by specifier; three more elsewhere,
in Fiji, Jamaica and Japan, had held England's English across a culture boundary
and now hold it by specifier too, which is one cross-culture link class gone.
