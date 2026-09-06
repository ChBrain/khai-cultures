# What a geo.json carries

`geo.json` holds the ISO code, and the website draws the map from it. This
records what else it may carry, and what it must never carry.

## `iso` stays one string

It is doing five jobs: the permanent npm package name, the id prefix the
conformance gate checks, the display name, the region colour, and the page URL.
A list cannot be a package name and cannot be a URL segment, so making `iso`
polymorphic breaks five consumers to serve a sixth.

## `covers` says what to paint

Some cultures are more than one shape. Germany never is - a Bundesland is both
the map and the culture, one code, one shape. France is, because its 2016
regions are administrative mergers and its departements, drawn in 1790 on the old
provinces, fit the cultures better. So the level is chosen per culture, and the
anchor and the drawing stop being the same thing.

```json
{ "iso": "FR-20R" }
{ "iso": "FR-BRE", "covers": ["FR-22", "FR-29", "FR-35", "FR-56", "FR-44"] }
{ "iso": "FR-6AE", "covers": ["FR-67", "FR-68"] }
```

The anchor names the culture; `covers` says what to paint. **Absent `covers`
means paint the anchor**, which leaves the three hundred cultures that are one
shape untouched.

Brittany is why the two must be allowed to disagree: `FR-BRE` is the anchor, and
the list includes `FR-44`, Loire-Atlantique, which holds Nantes, the ducal
capital, and sits outside the region.

## Internal borders stay

The renderer fills the listed units in one colour and keeps the hairlines
between them. That is deliberate. A dissolved outline is the visual grammar maps
use for states, so Brittany-with-Nantes drawn with a state's edge makes a claim
in the symbology that the data never made. Five units in one fill reads as
_these five places_; one hard edge reads as a country.

A true dissolve is a topology operation done offline, and it is worth it only
where the union genuinely is one official unit - `FR-6AE` being the case, since
the Collectivite europeenne d'Alsace really is a single body.

## Geometry stays out

The house has never shipped a real coordinate on purpose: `geo.json` holds `iso`
316 times and nothing else. It holds codes, and a renderer joins them to
boundaries offline.

Licence is the reason not to change that. GADM is not redistributable and not
licensed for non-academic use, which is fatal for published packages and is the
trap because it is the best source anyone reaches for first. OpenStreetMap is
ODbL with share-alike that propagates into derived data, and its relation ids are
explicitly unstable. geoBoundaries is CC-BY and carries France at both ADM1 and
ADM2, which is the join the departement-level cultures need. Natural Earth stops
at admin-1 and cannot supply them at all.

## Where `covers` cannot be written

Two French cases, and they differ in kind rather than degree.

**The French Basque Country** is roughly half of `FR-64`; claiming the whole
departement would be false. But a unit exists: the Communaute d'agglomeration
Pays Basque, created 1 January 2017, federating 158 communes. It has no ISO code,
so it can never be the `iso` - and it can be what `covers` points at, if `covers`
is allowed to carry namespaced non-ISO unit codes. The arrondissement of Bayonne
is the rung above and approximates it.

**Occitania** has no such answer at any depth. Its boundary is an isogloss, and
the smallest unit that could trace it is the commune, of which France has about
34,000. This is not a data-availability problem that can be spent out of.

So: do not draw. Label it, list its member cultures, record why in
`REFERENCES.md`, where this house already keeps its judgements. Not a point
either - a dot on Toulouse asserts that Occitania is at Toulouse, which is more
wrong than silence, and one dot among 315 filled regions reads as a bug.

A culture that cannot be drawn is not thereby not a culture. It is a culture this
house is not ready to ship, and saying so is the honest form of the ratchet.

## Identity, geometry and containment are three things

The French Basque case above proposed that `covers` be allowed to carry
namespaced non-ISO unit codes. Bornholm made it necessary to say **which**
namespaces, and answering that separated the question into three parts that had
been travelling together inside one string.

`iso` was doing five jobs. For a culture with no code of its own, four belong to
the id and one does not:

| the job                          | where it comes from, for a culture with no code                     |
| -------------------------------- | ------------------------------------------------------------------- |
| npm package name                 | the house id                                                        |
| conformance prefix               | the house id                                                        |
| display name                     | the house id                                                        |
| page URL                         | the house id                                                        |
| **region colour**                | **a boundary source, separately licensed and version pinned**       |
| administrative containment       | the enclosing ISO code, recorded as containment and not as identity |
| interlinking with other datasets | a global semantic identifier                                        |

So the rule is: **the house id is the identity, an ISO code records containment,
geometry comes from a pinned boundary source, and a global identifier does the
interlinking.** Bundling all four into `iso` worked for three hundred and nineteen
cultures because each of them happened to be an ISO unit. It was never the design.

### Which namespaces, and what they cost

Researched for Bornholm and reported as general:

| system              | Bornholm                        | scope           | stability                   | licence                                  |
| ------------------- | ------------------------------- | --------------- | --------------------------- | ---------------------------------------- |
| ISO 3166-2          | none of its own; inside `DK-84` | global          | strong                      | usable as codes                          |
| Danish municipality | `400`                           | Denmark only    | strong since 2003           | public nomenclature, check dataset terms |
| NUTS 3              | `DK014`                         | **Europe only** | strong, but versions revise | check per product                        |
| Wikidata QID        | `Q769680`                       | global          | stable entity id            | **CC0**                                  |
| GeoNames            | `2623664`                       | global          | stable                      | CC-BY, attribution                       |
| geoBoundaries       | ADM2                            | global          | versioned, must be pinned   | CC-BY                                    |
| OpenStreetMap       | a relation exists               | global          | **ids explicitly unstable** | ODbL                                     |

Two conclusions the house should hold to. **NUTS is a second axis and never a
replacement**, because it stops at Europe and this house does not. And **Wikidata
QIDs are the interlink of choice**: CC0, global, stable, and available for
historical and non-administrative regions that no administrative system carries.

On the CC0, three precisions, because a licence line in a design record gets
quoted later by someone who will not re-check it:

- The house stores an **identifier and not content**, which is the safest use
  available. A QID is a short string and almost certainly not a copyrightable work
  at all, so the licence is a belt over braces rather than the thing doing the
  work.
- CC0 waives copyright **and sui generis database rights**, which is the clause
  that matters in the EU and is exactly what ODbL does not do. Attribution is
  requested and not legally required.
- CC0 does **not** cover trademark or patent, warrants nothing about third-party
  rights, and does not extend to media files, which carry their own licences. None
  of those bite on an identifier.

The adjacent trap is not Wikidata and is worth naming here because the two get
conflated: **Wikipedia text is CC BY-SA**, with a share-alike obligation that
propagates into derived work. Citing a Wikipedia article as a source is ordinary;
lifting its prose into a published package is a different licence from the one
this section is about.

**Unverified from inside the house.** These statements are written from knowledge
and the licensing page could not be reached from the build environment, which
blocks egress. They are stable and long-standing rather than obscure, and they
should still be confirmed against `wikidata.org` before the first package actually
ships a QID.

For the colour, geoBoundaries stays what the section above already made it, with
one addition: the release is pinned, because a boundary dataset that moves under a
published package is a silent change to what a culture is.

### Bornholm, worked

It is the second instance of the French Basque case and the easier one. The Basque
Country has a unit that only approximates it; Bornholm is **coterminous** with a
municipality and with a NUTS 3 region at once, so `covers` has an exact answer as
soon as it may carry a namespaced code. Identity `dk_bornholm`; containment
`DK-84`; interlink `Q769680`; colour from a pinned ADM2 release.

That it sits administratively inside the Capital Region is the whole reason it
cannot take an ISO code as identity. Painting `DK-84` and calling it Bornholm
would stage a Baltic island with its own dialect as a part of Copenhagen.

Occitania is unaffected by any of this and stays undrawable: its boundary is an
isogloss and no namespace at any depth fixes that. The rule from the section above
holds unchanged — label it, list its members, record why, and do not draw.

## What this costs, and where the cost actually is

Per country, not per culture: one level decision, sometimes one source join.
Roughly one culture in ten wants a level other than its country's default, and
about one in fifty cannot be drawn at all. That rate is carryable indefinitely.

The cost that is not carryable sits in the website and not here: no script builds
the geo source files, and their provenance is a comment. That was fine for four
hand-cut files. France makes eight, with mixed sources and a per-culture level
choice, and a country reorganises - France did in 2016, and again for Alsace in 2021. The build script is worth writing before France, not after.
