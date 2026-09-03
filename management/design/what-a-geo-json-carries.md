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

## What this costs, and where the cost actually is

Per country, not per culture: one level decision, sometimes one source join.
Roughly one culture in ten wants a level other than its country's default, and
about one in fifty cannot be drawn at all. That rate is carryable indefinitely.

The cost that is not carryable sits in the website and not here: no script builds
the geo source files, and their provenance is a comment. That was fine for four
hand-cut files. France makes eight, with mixed sources and a per-culture level
choice, and a country reorganises - France did in 2016, and again for Alsace in 2021. The build script is worth writing before France, not after.
