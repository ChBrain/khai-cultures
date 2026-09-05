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

## A tongue is not a language, and this package counts the second

Sign and braille were proposed together, and between them they made the house say
out loud a distinction it had been carrying without needing. A **tongue** is an
office somebody holds and stands at a depth in, channel by channel. A **language**
is a system with its own grammar and lexicon. Every position here was both, so
nobody ever had to tell the two tests apart, and the package could be named for
the first while its version counts the second without the difference showing.

`position_language.md`, the root every tongue hangs from, already set the office:
**speaking and writing carry meaning out, hearing and reading let it in, thinking
runs underneath and never reaches the room.** So a candidate is asked two things,
not one: which channels does it hold in its own right, and is it a language.

|                     | out, live | in, live | thinking | out, durable | in, durable | a language |
| ------------------- | --------- | -------- | -------- | ------------ | ----------- | ---------- |
| a spoken tongue     | speaking  | hearing  | yes      | writing      | reading     | yes        |
| **a sign language** | signing   | watching | yes      | **none**     | **none**    | **yes**    |
| **braille**         | **none**  | **none** | **none** | writing      | reading     | **no**     |

### A sign language is both, and takes an anchor

The live pair maps without straining, because the channel names are functional
rather than anatomical: signing carries meaning out of a person and into a room,
watching lets it in, both need the other party present, and neither leaves a
record. That is exactly the work speaking and hearing do. Thinking runs underneath
as in any tongue.

What is absent is the durable pair, and it is absent rather than weak. There is no
orthography a signer uses to send a letter, keep a diary or publish, so a tongue
with a literature and a poetics has no archive in its own hand. That belongs in
the position's own **Loses**, which is the test of whether an exception is
admissible: the mnemonic absorbs it instead of being bent around it.

The consequence is mechanical and checkable. A persona holding a sign language can
be wired to `process_speaking_*`, `process_hearing_*` and `process_thinking_*` in
it, and **cannot be wired to `process_reading_*` or `process_writing_*` in it at
all** — not `drafted`, not `deciphered`, not at any depth, because there is no
channel to stand at a depth in.

One further consequence is that the file cannot be written in its own tongue, so
it is written in the surrounding written language and the provenance says so. That
exception is bounded to a language nobody can write. It never covers a spoken
variety this house happens to lack a source for, which is the middle failure above
and is answered by getting a source.

Sign languages get no shared anchor, ever. BSL and ASL are unrelated — ASL
descends from French sign and BSL does not — so each takes its own, the shape `co`
and `br` already have.

### Braille is a tongue and not a language, and hangs from the root

It has no grammar and no words, and it is nobody's. The same sixty-three cells
carry Arabic, Chinese, Greek and Hebrew, carry mathematics in their own codes and
carry music in a notation read the same way in Osaka and São Paulo, and the first
ten letters are the same cells in nearly every alphabetic braille because they
still follow the assignment Louis Braille made at fifteen.

It was first drafted as `en/position_language_en_brai.md`, a variety of English,
and that was wrong twice: it made braille English's property when English is only
one of the things poured into it, and it invited the next reader to hunt for a
minimal pair against English that cannot exist. Withdrawn and rewritten at the
package root.

**The root is what keeps the version honest.** `languages()` and the kit's
`countItems` both walk directories, so a position sitting at the top level is a
member, carries provenance, renders in both documents, and moves no number. The
minor is the language count, and braille is not one. `build.mjs` holds the slot as
`nonLanguages()`, and any future occupant goes in the same way: a manual coding of
a spoken language, speech-to-text, anything held in some channels without being a
system of its own.

Its own **Loses** is the finding stated plainly: three of the five channels, never
had. Nobody speaks braille, nobody hears it and nobody thinks in it, because the
thinking underneath belongs to whatever language is in the cells.

### Why sign is not the same proposition, and what would be

The obvious objection is that if braille is a medium then signing might be one
too. It is not, and the thing that settles it is that signing has a medium of its
own alongside it. **Signed English is to speech what braille is to print**: a
manual re-encoding of another language, no grammar of its own, whatever you pour
into it. BSL is not that, and Deaf communities distinguish the two sharply and for
exactly this reason.

|               | a re-encoding, no grammar of its own | a language         |
| ------------- | ------------------------------------ | ------------------ |
| touch         | braille                              | —                  |
| hand and eye  | a manual coding of a spoken language | BSL, and its kin   |
| sound and ear | —                                    | the spoken tongues |

So the two questions stay separate and both get asked. Braille passes the tongue
test and fails the language test. A sign language passes both and merely holds
three channels rather than five.

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
