---
---

**Latvia is blocked by two Canadian tongues, which is less strange than it sounds.**

`migrate_culture.mjs --culture latvia` refused:

```
latvia cannot migrate yet:
  - persona_vike_freiberga.md links ../canada/position_language_en_ca.md ...
    Resolve it before the move: a published production carries no "../".
```

Vaira Vīķe-Freiberga spent her exile in Canada and returned to be Latvia's
president, so her Projection reaches into Canadian English and Canadian French.
Under the umbrella a `../` link resolves; in a published package it does not exist
at all. The tongues move first, as they did for `et`, `lv` and `lt` in #594.

`en_ca` into `en/` and `fr_ca` into `fr/`:

```
2 files changed, 0 insertions(+), 0 deletions(-)
```

Byte-identical, for the reason this house has now paid for twice.

**Both are genuine varieties rather than anchors in disguise**, which is the test
that matters when a file moves under an existing language. What each holds
distinguishes it from its anchor _and_ from its nearest sibling:

- **`en_ca`** - Canadian raising, so that _house_ the noun and _house_ the verb can
  differ by a vowel that starts higher before a voiceless consonant. And the
  orthography no other English has: **British `-our` and `-re` kept, American
  `-ize` taken** - a standard assembled from both neighbours rather than inherited
  from either.
- **`fr_ca`** - long stressed vowels breaking into two movements where the French
  of France holds one, and a closed question taking a final particle _tu_ with no
  relation to the pronoun: _Tu viens-tu?_

`build.mjs --write`: **43 languages, 99 varieties, version 0.43.0.** The language
count does not move, because a variety is not a language - and the umbrella's
minor does not move either, because a tongue is not a culture.

Inbound links retargeted; every one is a link-target rewrite, so `canada` is
relinked and not authored.

Next: `latvia`, whose four plots are written and whose Company is already at zero,
then `lithuania`, then `baltics` becomes a package.
