---
---

**The follow-up two migrations promised, taken now that it costs nothing.**

Eleven base anchors carried a `title` that named something other than the tongue
they anchor. The package's rule is plain and 88 of 101 files already keep it: the
**H1 and `declared` carry the endonym**, and `title` carries the **bare English
name**. `de` is "German" over `das Deutsche`; `cy` is "Welsh" over `yr iaith`; `gd`
is "Scottish Gaelic" over `a' Ghàidhlig`. Every one of the ~90 variety files does
it. The exceptions were all anchors, and all of them arrived that way from the
culture that used to hold the file.

| was                       | now          |
| ------------------------- | ------------ |
| `Saudi Arabic`            | `Arabic`     |
| `the Danish Language`     | `Danish`     |
| `the Estonian Language`   | `Estonian`   |
| `the Irish Language`      | `Irish`      |
| `the Croatian Language`   | `Croatian`   |
| `the Icelandic Language`  | `Icelandic`  |
| `the Lithuanian Language` | `Lithuanian` |
| `the Latvian Language`    | `Latvian`    |
| `the Russian Language`    | `Russian`    |
| `the Slovene Language`    | `Slovene`    |
| `the Swedish Language`    | `Swedish`    |

**This is the release the notes were written for.** `ar` recorded it in as many
words — _ONE THING DELIBERATELY LEFT WRONG FOR ONE RELEASE ... the title is
corrected in a follow-up inside the package where it touches no culture_ — because
changing it during the move would have made the move an edit instead of a rename
and charged `saudi_arabia` for five dead Company elements. `et` recorded the same
deferral for itself and for `lv` and `lt`, whose three cultures carried seventeen
dead elements between them.

Every one of those cultures is a package now and none of them holds these files
any more, so the correction **authored nothing**. Measured: the registry rebuild
came back byte-identical, **319 cultures at 0.319.0**, and the tongues package is
unmoved at **44 languages, 101 varieties, 0.44.0** — a title is not a language.

## One more thing the pass found

`es_es` declared itself **`el espanol de Espana`**, stripped of both diacritics,
in the frontmatter and in the H1 that has to match it. Its eight siblings in the
same directory all carry theirs — `el español andaluz`, `el español ceutí`, `el
español melillense`. It arrived that way from `spain` in #601 under the
byte-for-byte rule. It now reads **`el español de España`**.

## Two anchors deliberately left alone, and they are not the same case

**`no` stays `Bokmål and Nynorsk`, declared `målstriden`.** This looks like the
same fault and is not one: its own provenance argues the case — _already correctly
named and already the anchor, which makes it the exception in a walk of four
corrections_ — and the body backs it up. Norwegian's defining fact is that it has
no normed spoken standard at all, only two written norms, and målstriden is the
name of exactly that. The anchor is about the situation because the situation is
the language. A documented decision is not debt.

**`bg` stays as it is, and is reported rather than patched.** It reads
`title: "Cyrillic and the Bulgarian Language"`, declared `кирилицата`, and its
body does not mention Cyrillic once: `## Has` is verbal aspect and the renarrative
mood, `## Orders` is the postposed definite article, `## Loses` is the case system
it gave up, `## Drives` is the habit of marking how you know what you say. That is
the Bulgarian language, start to finish. Unlike `no`, **nothing argues for the
naming** — the provenance note calls the file the anchor and describes only the
language.

So the file is misnamed twice over, in `title` and in `declared`. Correcting only
the `title` would leave it _less_ coherent than it is now, since the H1 would still
declare a script the file never discusses; correcting `declared` changes what the
position **is**, and having just found one lookalike that turned out to be
deliberate, that is a decision to put in front of the Human rather than to take on
my own. It came in at #598, and I wrote the note that failed to challenge it.

## Provenance

Twelve notes amended, and **the diff is 12 insertions and 12 deletions** — one line
per note, no re-sort. #594 buried three new records under a 424/403 whole-file
re-sort and was unreviewable; that is not repeated here.
