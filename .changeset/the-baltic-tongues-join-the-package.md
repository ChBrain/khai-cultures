---
---

**The tongue moves before the culture, and three cultures were holding theirs.**

`migrate_culture.mjs --culture estonia` refused, and said exactly why:

```
estonia cannot migrate yet:
  - holds its own language position(s): position_language_et.md. The tongue moves
    first ... A tongue is held by the speech community, not by the culture that
    happened to write it down.
```

Latvia and Lithuania hold theirs too. So this is tier one before tier two, and all
three go together for the same reason the Nordic tongues did: the three are one
walk, and splitting it would move the tongues count three times for no gain.

`et`, `lv` and `lt` into `packages/khai-cultures-tongues/`, and the diff says the
part that matters:

```
3 files changed, 0 insertions(+), 0 deletions(-)
```

**Byte-identical, deliberately.** This house has paid twice for the alternative:
#562 retitled four tongues during a move and authored three cultures with it, and
#576 repeated it on `ar`. A move that changes nothing is a relink and charges
nobody; a move that improves a title is authoring, and every culture that casts
the variety is then asked for a clean Company it never opened.

So one thing is left wrong on purpose. `position_language_et.md` still carries
`title: "the Estonian Language"` where the package's convention is the bare name -
`fi` is `"Finnish"`. `lv` and `lt` are in the same shape. **Fixing it here would
author Estonia, Latvia and Lithuania**, which are the next three pull requests and
have five to seven dead Company elements each. The titles get fixed in a
package-only follow-up, as `ar`'s did.

Inbound links retargeted to `@chbrain/khai-cultures-tongues/<lang>/…` across
twenty-nine files; every one of those is a link-target rewrite, so the ratchets
spare the cultures they touch.

Each move also needs a `provenance.json` record, and the tongues package's own test
refused the commit until all three had one - _no entry in provenance.json_, and
then _its record does not say how it is written_. Each record names what the
culture was actually holding:

- **`et`** - fourteen cases carrying place, direction and state without a
  preposition, and **three degrees of length on one and the same sound**, short,
  long and overlong, a contrast almost no other language in Europe makes. Finnic,
  so it is a relative of `fi` across the gulf and of nothing at all among its land
  neighbours — the fact the Baltics group has to keep accounting for.
- **`lv`** - diminutives on almost any noun or even adjective, two adjective forms
  where one ending already says whether a known thing or any such thing is meant,
  and three intonations on long syllables.
- **`lt`** - seven cases and two pitch accents that most Indo-European languages
  lost long ago, which is why it is described as the closest living language to
  reconstructed Proto-Indo-European.

`build.mjs --write`: **43 languages, 97 varieties, version 0.43.0**, with dependant
ranges synced across sixty packages.

Next: `estonia`, `latvia`, `lithuania`, each deepened to zero dead Company and
migrated in the same commit — and then `baltics` can become a package, which is
the point of the walk. It is the shortest group in the house at three members.
