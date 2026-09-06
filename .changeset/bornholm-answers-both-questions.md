---
---

**The Bornholm research came back, and it settled the map question and refuted
half of what was about to be written about the tongue.**

Two design records are amended. Nothing is staged yet: this is the design the
research was for.

## The map

`what-a-geo-json-carries.md` had already proposed, from the French Basque case,
that `covers` be allowed to carry namespaced non-ISO unit codes. Bornholm made it
necessary to say **which** namespaces, and answering that split one string into
three jobs that had been travelling together:

**The house id is the identity, an ISO code records containment, geometry comes
from a pinned boundary source, and a global identifier does the interlinking.**
Bundling all four into `iso` worked for three hundred and nineteen cultures
because each of them happened to be an ISO unit. It was never the design.

The identifier inventory is recorded with scope, stability and licence, and two
conclusions are held to. **NUTS is a second axis and never a replacement**,
because it stops at Europe and this house does not. **Wikidata QIDs are the
interlink of choice**: CC0, global, stable, and available for historical and
non-administrative regions no administrative system carries. geoBoundaries keeps
the colour, with the release pinned, because a boundary dataset that moves under a
published package is a silent change to what a culture is.

The CC0 claim is written out rather than left as two letters, because a licence
line in a design record gets quoted later by someone who will not re-check it. The
house stores an identifier and not content, which is the safest use available;
CC0 waives database rights as well as copyright, which is the clause ODbL lacks;
and CC0 covers neither trademark nor media files, none of which bites on an id.
The adjacent trap is named too, since the two get conflated: Wikipedia text is
CC BY-SA with share-alike, so citing an article is ordinary and lifting its prose
into a package is not. All of it is flagged unverified from inside the house: the
licensing page could not be reached, because the build environment blocks egress.

Bornholm turns out to be the second instance of the French Basque case and the
**easier** one: the Basque Country has a unit that only approximates it, while
Bornholm is coterminous with a municipality and a NUTS 3 region at once, so
`covers` has an exact answer the moment it may carry a namespaced code. Occitania
is unaffected and stays undrawable, because an isogloss is not fixed by any
namespace at any depth.

## The tongue

`what-earns-a-variety-file.md` gains the Bornholmsk decision, and it is the first
in that document written **after** research rather than after a walk.

**Three genders: confirmed**, with the paradigm recorded — `ejn horra`, `en peia`,
`eð hu:z` against `en dreng`, `en pige`, `et hus`. It is a paradigmatic contrast
and not a single controlled minimal pair, and that gap is written down rather than
filled.

**The stød claim: half right, and the wrong half was the one about to become the
file's spine.** No stød is confirmed. The proposed Swedish-style pitch accent is
**refuted** — the literature describes a distinct intonation and specifies that
neither glottal stop nor pitch accent is used. The spine survives as a contrast by
absence against a `da` anchor that names the stød as one of Danish's two defining
possessions, but it is a narrower claim than the one that was nearly written.
Written from memory, that file would have asserted a tonal system the literature
denies.

**Writability: the third case, not the middle one.** No normative orthography
exists, but there is an established dialect-orthography tradition and a current
editorial convention maintained by the Bornholmsk Ordbog project, which is what a
file follows and what provenance records — as a convention, never as a standard.
Continuous attested prose is reachable, and Kuhre's 1938 folk narratives are the
best of it because they are aligned sentence by sentence with Danish, roughly a
thousand pairs, which is what lets a writer check rather than guess.

So it ships with `review: "native"`, and the flag carries its full weight: written
from the sources, not from the ear. And its Loses has to say that the speaker base
has shifted hard to Standard Danish over about two decades and the corpus is
largely speakers aged sixty and up — living and endangered at once.

## What the renderer answered

The separation was put to the website side before any entry shipped. All four
questions came back decided, and one settles something this record has carried
unresolved since France.

**Paintability is decided by geometry and never by ISO** -
`paintable = entry.kind === "culture" && entry.geo != null`. That generalises _no
geo, no fill_ into something better than the house had, and produces a row nobody
here had thought about: **a culture can hold an ISO code and still not be drawn.**
An ISO code buys nothing on the map. Listing without painting is confirmed cheap
and first-class, with no fill, no polygon and no centroid marker, which would
pretend to a territory the culture does not have.

**The geometry build belongs to the website**, which closes a question this record
has been carrying: it has long said the geo build script is worth writing before
France rather than after, without saying whose it is. The package declares
identity, containment, a selector and source metadata; the website reads a pinned
release into immutable artifacts with a provenance manifest, and the browser never
resolves upstream geography live. So the house ships no geometry and now also
ships no fetch.

**The QID goes in the entry as an identifier and never a payload**, with the
condition the house would have asked for anyway: a page must render if Wikidata is
unavailable. They explicitly rejected reverse-resolving by name or ISO, which is
what a consumer reaches for when the id is missing and is ambiguous exactly where
this registry is getting more culturally accurate.

**And one requirement came back the other way:** an untyped `parents` array lets a
page render two parents and not label them, so the registry emits the relation
typed as `host` and `kin`. That is recorded in the order rather than here.

## What is still open

The research declined to establish three things and said so, which is the answer
the request asked for. The **1658 conditions** — the island giving itself back to
the Danish crown on terms — are a locally powerful account whose exact wording and
legal form are not verified, so they must not be staged as a contract. And the
**present**: the ferry, the energy project and the smokehouses are not established
by anything retrieved, while the population line is solid, 43,245 in 2006 to
38,966 in 2025.

Governance only. No tongue, no culture, no region is written by this.
