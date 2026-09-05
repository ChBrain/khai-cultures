# What earns a variety file

The tongues package holds one position per language variety, each written in that
variety. This records the test a variety has to pass to get one, why the test
exists, and the three Bavarian decisions that produced it.

## The test

A variety gets a file when its distinguishing feature can be **named and sourced**:

1. **The rule**, stated as a rule — "MHG `uo` > `ou`, not `ua`".
2. **A minimal pair, both sides written** — `Brouda` (Nordbairisch) / `Bruada`
   (Mittelbairisch).
3. **Categorical or gradient** — does it hold across the whole area, or shade off?
   Only a categorical feature can be exhibited in prose.
4. **Visible in writing** — a difference that lives in intonation or voice quality
   cannot go in a text file.
5. **Sourced to the right side** — for a variety that crosses a border, the feature
   has to be attested on the side being written, not on the famous side.

One feature is enough if it runs through every word. That is what makes Nordbairisch
writable: the diphthongs fall the other way in every second word, so the file
demonstrates itself.

## Why the test exists

Because the house wrote four files that failed it before anyone noticed, and each
failed the same way — **the better-known name standing in for the actual tongue**:

| file                             | what it actually held                                |
| -------------------------------- | ---------------------------------------------------- |
| `de_de_by`                       | Bairisch features under "das bayerische Hochdeutsch" |
| `bar`                            | Munich's Mittelbairisch under the family's name      |
| `position_bayerisch_schwaebisch` | the Allgäu's tongue under Augsburg's name            |
| `position_fraenkisch`            | one real feature and two gestures                    |

A file that cannot say what it is **is** the thin file. It reads as content and
counts as coverage and teaches the next reader something false.

## Three ways it can fail, and only one of them is a flag

| the author…                                         | mechanism          | file                |
| --------------------------------------------------- | ------------------ | ------------------- |
| cannot **name** what the variety is                 | hard stop          | none                |
| cannot **write** it, and has no source to ground it | provenance gate    | none, until sourced |
| **can** write it, but no speaker has read it        | `review: "native"` | ships               |

The middle one was found by applying the rule and is the reason it is written here.
Sorbian shipped because the prose could be produced and khai's own gate confirmed it
read as Upper Sorbian. Frisian did not, because nothing can check it — franc has no
model for `frr` or `stq` — and prose written blind and flagged `review: "native"`
would be a lie by mislabel: that flag says _no speaker has read this_, not _the
author was guessing_.

**Named but unsourced writing.** A variety may be perfectly identifiable and still
unwritable by the hand at the desk. Get source text, or leave the position unwritten.
The answer is not a flag; it is a source.

## Not the same as `review: "native"`

`review: "native"` says _no speaker has read this prose_. Tarifit carries it, and it
is the right answer to doubt about idiom — it lets a tongue exist while its wording
waits for a reader.

The hard stop is the prior question: _is there a system here to write at all._ No
flag covers that, and none should, because the answer changes what the file is
rather than how good it is.

## Three decisions this produced

### Ostmittelbairisch — no file

Researched and declined. The west/east Central Bavarian split is real as a bundle of
isoglosses, but the bundle is **gradient and anchored in Austria**: its strongest
realization follows Vienna's pull westward along the Danube, and the boundary is
described as shifting and hard to draw even there. It is not coterminous with Lower
Bavaria, which the reference description places inside Central Bavarian in its
Danube, Isar and Inn valleys.

Usable contrasts exist — `vui`/`vü`, `Fejd`/`Föd`, `oans`/`âns` — and every one of
them is gradient, so prose written from them would depend on a precise locality,
speaker generation and degree of dialect rather than on "eastern Bavaria". That
fails the test at point 3.

Mittelbairisch therefore stays one variety, the same call already made for
Ostfränkisch. **Niederbayern and the Bayerischer Wald differ culturally, not
linguistically, which makes them a place-and-persona question for the play rather
than a tongue question for the package.** The Wald is the clearest case: it sits near
a Central–North transition zone and has its own atlas tradition, which is what one
expects when locality matters more than a portable regional norm.

### Egerländisch — no file yet, with named criteria

Nordbairisch in origin, so what could be written today is Nordbairisch with an
Egerland title. Its situation is writable — a variety that lost its ground and is
spoken without a territory — but that is a `Loses`, and a position needs a `Has`.

It earns a file on any one of: a phonological rule documented for Egerland rather
than the adjacent Oberpfalz; a stable Czech-contact lexical or morphosyntactic
feature evidenced in prose; a living orthographic practice used by Egerland speakers
or their descendants; or a corpus showing recurrence beyond a commemorative word
list. Until then it is Nordbairisch-origin heritage speech.

### North Frisian and Saterland Frisian — nameable, not yet writable

Researched. Both are recognised minority languages of Germany with ISO codes and
their own literatures, so the naming question never arises; what stops them is the
second failure above. `frr` takes the sibling shape with no anchor, and the first two
varieties to write are **Fering** — specifically Weesdring, which is what the
Nordfriisk Instituut grammar's examples are in — and **Mooring**, because those are
the two with modern practical grammars behind them.

Fering's `Orders` is already identified and is a good one. It has two definite-article
series, A and D, and the choice is not simply definite against indefinite: it decides
whether the referent is the ordinary identifiable thing or something more pointed,
bounded, owned, collective or substance-like. `a fask` is a fish; `at fask` is fish.
So the holder must decide, at every noun, **what kind of "the" this is** — a decision
neither German nor English asks for. It is attested for the mainland and Fering
cluster, Mooring and Karrharde included, and must not be promoted to a pan-North-
Frisian claim.

Saterland Frisian's is the vowel space, but not as raw inventory size. The often-cited
forty is a broad traditional accounting and the analysis is contested — one study
gives up to twenty stressed monophthongs and sixteen diphthongs, a later IPA
description ten and ten plus seven falling diphthongs. What survives the disagreement
is the office: length, quality and diphthongal movement do not collapse into a simple
spelling-to-sound system, so the tongue trains an ear for distinctions that German
orthography and German expectation flatten. The cost is auditory exactness, not a
failing writing system.

And the family fact both share, with its necessary qualification: Frisian's nearest
relative is English, not German — but that is historical subgrouping, not present-day
closeness, and both have lived under long contact with Low German, High German and
Danish. The honest sentence is that **Frisian holds open a West Germanic line in
which English is family and German is the surrounding pressure.**

### Danish — the anchor is in the wrong place

The house holds `da` inside `cultures/denmark`, which is precisely what the tongues
package exists to undo: a tongue held by a country. Danish should move into the
package as an anchor representing the standard written centre, with the Denmark
culture linking it like any other.

Beneath it belongs **Sydslesvigdansk**, the contact variety of the Danish minority in
South Schleswig, which is distinct from both Rigsdansk and Sønderjysk and is evidenced
rather than folk-labelled — a catalogue of twenty-nine morphosyntactic features across
151 informants. It earns a variety file, with one constraint: it is a non-focused
contact variety on a Standard Danish base and has no separate codified orthography, so
it is written in ordinary Danish spelling and its distinction rests on named contact
features, never on invented spelling.

### Alemannic — a gate, not a label

khai declined `gsw` for detection on measured grounds and offered to re-read the
grade against real prose. Admitting an Alemannic variety here wants: two independent
native or editorially attested sources; diagnostics recurring across the samples
rather than isolated spellings; a stated target region, because `gsw` is far too
broad to imply one voice; and `review: "native"` until a competent reader confirms
the prose holds together.

## A language with no form to write its family in

North Frisian forced this and the answer generalises. It is nine dialects across an
island/mainland split with poor mutual intelligibility, each with its own
orthography, and the authoritative teaching grammars are variety-specific — the
Nordfriisk Instituut publishes separate practical grammars for Fering and for
Mooring. There is no neutral North Frisian to write a family anchor in.

**So `frr` gets no prose anchor.** Its varieties sit as siblings, and `frr` stays a
group identifier in metadata rather than pretending to be a voiceable position. A
navigational index may exist; it carries no first-person text and is not a language
position.

The rejected alternative matters as much: letting Mooring carry the family, because
it is the largest and best resourced, would be the same substitution this house has
already undone four times — one variety speaking for its siblings. Convenience is
exactly how that fault gets made.

That gives two shapes, and a language takes whichever is true of it:

- **anchor plus varieties** — Bairisch, Swabian, German. A family that has a form
  its whole extent recognises.
- **siblings, no anchor** — North Frisian. A family that does not.

## A language with no writing, and writing with no language

Sign and braille were proposed together, and taken together they break the same
assumption from opposite ends. Every one of the eighty-six files in this package
is a spoken tongue simulated through writing, and `build.mjs` says so in its own
comment. That works because for a spoken tongue the language and the medium are
the same axis. They are not the same axis, and these two are the proof:

|                     | its own grammar and lexicon  | a written form of its own  |
| ------------------- | ---------------------------- | -------------------------- |
| a spoken tongue     | yes                          | yes                        |
| **a sign language** | **yes**                      | **no**                     |
| **braille**         | **no, it carries another's** | **yes, that is all it is** |

A sign language is a language you cannot write. Braille is writing with no
language of its own. The package has room for both, and they go in different
places, because the standards that name them already know the difference: `bfi`
is an ISO 639-3 **language** code, and `Brai` is an ISO 15924 **script** code.

**A sign language is a tongue and takes an anchor.** It passes every part of the
test above except point 4, visibility in writing, and it fails that one totally
rather than partly. So the file is written in the surrounding written language
and the provenance says so in as many words. That is not a licence, and it does
not extend to spoken varieties: a spoken tongue that cannot be written here is
unwritten because the hand at the desk lacks the source, which is the middle
failure above and is answered by a source. A sign language cannot be written by
anyone, and no source will change it.

What keeps this honest is that the inability is not a hole in the file. It is the
most important thing about the language and it belongs in the position's own
**Loses**: a tongue with no orthography has no archive of its own, keeps no
letters and no diaries, and is recorded only on video or in transcription into
somebody else's language. The mnemonic absorbs the exception instead of being
bent around it, which is the test of whether an exception is real.

Sign languages do not form one family and must never be given a shared anchor.
BSL and ASL are unrelated; ASL descends from French sign and BSL does not. Each
takes its own anchor, the shape `co` and `br` already have.

**Braille is not a tongue and takes no anchor.** It has no grammar and no
lexicon; it is English, or German, or Arabic, set in cells. It therefore hangs
under the language it writes, as `en-Brai` under `en/`, where it adds a variety
and not a language and the count stays honest. Its file is written in ordinary
print for the opposite reason to the sign file: not because it cannot be written
in its own medium, but because it can, and doing so would produce the same text
re-encoded rather than a second text. A transliteration is not a translation, and
a page of Unicode braille cells would demonstrate the point by making it
unreadable rather than by stating it.

It still earns a position, because a script has an office even when it has no
lexicon: what it gives its holder, what it forces at every use, what it cannot
do, and how it sorts the world are all answerable for a medium. What it may never
do is claim to be a variety of the language in the sense the test above means.
Nothing about `en-Brai` differs from English in phonology, grammar or word stock,
and the provenance must say that plainly so the next reader does not go looking
for a minimal pair that cannot exist.

## Sourcing a variety, when it is written

For any variety grounded in attested text rather than the author's own command, the
provenance entry carries where it came from. `variety` and `orthography` are not
optional editorial detail for a language with more than one of either — they are the
difference between a source and a gesture.

```yaml
source_text:
  language: stq
  variety: Ramsloh | Scharrel | Strücklingen | unspecified
  orthography: as stated by the edition
  source: { author, title, publisher, year, pages_or_permalink }
  excerpt_status: attested
  use: "syntax and idiom reference; do not imitate beyond source support"
```

## Where to look, for the next hand

Attested prose beats reconstruction, and these are the source layers for Bavaria:

- _Sprachatlas von Niederbayern_
- _Sprechender Sprachatlas Bayerischer Wald und Böhmerwald_
- Sprechender Sprachatlas von Bayern — ~1,600 locations, recordings from 70
- BayDat, the Bavarian dialect database
- the Bavarian Academy's _Bayerisches Wörterbuch_ word maps

Select from an actual point — Passau, Freyung-Grafenau, Deggendorf, Straubing —
rather than treating a region as a single voice.
