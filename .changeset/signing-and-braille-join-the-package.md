---
---

**Two positions the package had no shape for until this release: a language that
cannot be written, and writing that is not a language.**

`management/design/what-earns-a-variety-file.md` settles the rule; this ships what
it authorises. They go in different places, and the difference is the whole point.

**`bfi`, British Sign Language, takes an anchor of its own.** It is a language by
every part of the test except visibility in writing, and it fails that one totally
rather than partly, so this is the first position in the package **not written in
its own tongue**. What it holds is simultaneity, two hands and a face and a torso
and the space in front of the body all running at once, so one verb carries agent,
patient, path, manner and aspect where a spoken tongue has to queue them; grammar
on the face, where the headshake _is_ the negation rather than a comment on it and
a fluent signer with a still face is ungrammatical rather than flat; and the
signing space, where referents are placed and pointed back at, so there is no
sentence in this language that means _he told him he was wrong_ and leaves you
guessing.

Its **Loses** is where the exception stops being a problem and becomes the file's
best chapter. It cannot be written, so a tongue with a literature, a poetics and a
humour has no archive in its own hand and survives only as video, memory or
translation into the language of the country around it. Nine in ten deaf children
are born to hearing parents, so it passes sideways rather than down and the school
is the family. And the line was cut: from Milan in 1880 the schools of Europe sat
on the hands for most of a century. Britain recognised it in 2003 and legislated
in 2022, recent enough that people punished for using it are alive to see it.

Its **Drives** ends on the rarest thing in this package: a linguistic community
nobody is born into by descent. Every other position here is held by people who
were, in the main, handed it by their parents.

**`en-Brai`, English in braille, hangs under `en/` and adds no language.** The
provenance says NOT A LANGUAGE in its first four words, because the file must not
be mistaken for one: braille has no grammar and no lexicon, nothing in it differs
from English in phonology, grammar or word stock, and a reader hunting here for a
minimal pair will not find one because there is none to find. The tag is not an
invention - `Brai` is the ISO 15924 script subtag, and the standards already draw
the line this file is placed on, since `bfi` beside it is an ISO 639-3 language
code.

It earns a position anyway, because a script has an office. The cell is sized to
the fingertip, so exactly one character is under the finger and never any part of
the next: no glance, no peripheral vision, no skimming, and therefore no cheating
of the kind print allows constantly and quietly. The start of a sentence is behind
the finger rather than still on the page, so the reader holds far more than a
sighted reader of the same text. And it loses ground to audio, which supplies
access to books but not literacy, since spelling, punctuation and the ability to
write are not acquired by listening.

Written in print for the opposite reason to the sign file: not because it cannot
be set in its own medium but because it can, and a page of Unicode braille cells
would be the same text re-encoded rather than a second text.

`build.mjs --write` took the package to **0.35.0 at 35 languages and 88
varieties** - one new language and two new varieties, which is the count saying
out loud that only one of these two is a tongue - and updated the declared range
in the packages that depend on it. `bfi` is flagged `review: native`, and the flag
matters more here than anywhere else in the package, because a hearing author
writing about a signed language in a written language is at two removes rather
than one. `en-Brai` is not flagged: the prose is English and its readers read
English.
