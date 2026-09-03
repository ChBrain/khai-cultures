# What a geo.json carries

`geo.json` is the smallest file in the house and the most load-bearing. It holds
the ISO code, and that code is the id, the permanent npm package name, the
parent-nesting check, and on the website the display name, the region colour, the
parent and whether a page exists at all. It is not a cartographic key. It is the
primary key of the entire consumer surface.

This records what else it may carry, and what it must never carry.

## Geometry stays out, permanently

The house has never shipped a real coordinate on purpose. Across 316 cultures
`geo.json` holds `iso` 316 times and `lat`/`lon` eleven times, and those eleven
are an artefact of one generator, not a decision. They are removed here.

Three reasons, and the third is decisive.

**Licence.** GADM is not redistributable and not licensed for non-academic use
without permission, which is fatal for published npm packages and is the trap,
because it is the highest-quality source anyone would reach for first.
OpenStreetMap is ODbL, whose share-alike can propagate into derived data. Natural
Earth is public domain and too coarse below the first administrative level to
help with the cases that are actually hard. Keeping geometry out means never
answering this question three hundred times.

**Stability.** OSM relation ids are explicitly not stable; admin relations have
been recreated and reassigned. Useful as a hint, useless as a key. Wikidata is
the opposite: a merge leaves a redirect and deleting a redirect is forbidden, so
a QID is a good _secondary_ identifier. It can never be the primary one, because
`Q1450` is not a legible package name and the package name is permanent.

**Projection.** The renderer already owns projection, and it owns it in a way
that is not longitude and latitude: Spain ships with the Canaries as a
fake-coordinate inset and the United States as a pre-projected Albers composite
in pseudo-degrees. The moment a culture file carries real coordinates, two
systems disagree about what a coordinate means and every file needs a field
declaring which space it is in. Never introducing coordinates keeps that field
from ever having to exist.

## Extent: the code, or the honest alternative

Most cultures need nothing beyond the code. A few cannot be described by one
code, and the failure mode to guard against is not drawing badly - it is drawing
**silently**, where a confident wrong boundary and an honest absence look
identical to a renderer.

So extent is stated only when the code is not the whole answer. The formalism is
Cohn and Gotts's egg-yolk representation of a region with an indeterminate
boundary: an inner region certainly in, an outer region possibly in, the truth
somewhere between.

```json
{ "iso": "FR-20R" }

{ "iso": "FR-BRE", "extent": {
    "kind": "graded",
    "core":    ["FR-BRE"],
    "maximal": ["FR-BRE", "FR-44"],
    "asOf": "2016" } }

{ "iso": "FR-YT", "extent": { "kind": "disputed", "asOf": "2011" } }
```

**Absence means crisp.** A bare `{"iso": …}` asserts that the code is the extent.
Writing `"kind": "crisp"` into three hundred files would add a field to say
nothing and would dull the signal it exists to carry: a positive assertion is
only visible when it is rare.

**The kinds.** `graded` carries `core` and `maximal`. `disputed` says the extent
is contested by parties who would not accept each other's answer. `undrawn` says
the house declines to draw it, which is a stronger claim than a boundary, because
a boundary can only be wrong and a recorded refusal can be right.

**It is codes, never shapes.** A list of ISO codes is projection-free by
construction, so it survives the Albers composite and the Canaries inset without
either becoming a special case. Handing a renderer member units also lets it
choose a non-territorial symbology - hatching, stipple, feathered edges, labels
over territory - where handing it one merged polygon has already chosen the
state-shaped grammar for it, which is how a cultural area gets read as a claim.

**`asOf` is not optional.** A list of codes has a vintage and a country can
invalidate it without telling you: France redrew its regions in 2016, and
`FR-6AE` for Alsace only came into being in 2021 while the territory still sits
inside Grand Est. The single `iso` has a vintage for the same reason; state it
wherever it is load-bearing.

**The reasoning goes in REFERENCES.md, not here.** `geo.json` stays
machine-readable. The house already has the place where a judgement is recorded
and argued with - the defining question and what is deliberately not staged both
live in REFERENCES. A `note` field would become a second, worse REFERENCES that
no gate reads and no author opens.

## A condition, found on the first real case

The egg-yolk only works where the code vocabulary can go finer than the unit the
map draws. Occitania is the test: its core cannot be expressed as
`FR-OCC` minus Roussillon, because a code list cannot subtract. It has to be
built from departements, which ISO 3166-2:FR provides. Where a country offers no
level below the one that is wrong, `graded` is unavailable and the honest answer
is `undrawn`.

## Groups have no extent at all, and DACH shows why that matters

None of the nineteen groups carries a `geo.json`. A group's member list is
therefore its only statement of what it covers, and a member list is a boundary
pretending to be a roster.

`dach` names three members. **Liechtenstein appears nowhere in the group** - not
in the play, the README, the REFERENCES or the plot - although it is
German-speaking, Alemannic, inside the Swiss customs union, uses the franc, and
is already a culture in this house. It is not excluded on grounds. It is absent
because the acronym has four letters and none of them is L.

Extent lets the group say what it means without renaming itself:

```json
{
  "extent": {
    "kind": "graded",
    "core": ["DE", "AT", "CH"],
    "maximal": ["DE", "AT", "CH", "LI"],
    "asOf": "2026"
  }
}
```

The gap between the two lists is the interesting part, which is the whole point
of the formalism. It also names what is missing: South Tyrol and the
German-speaking Community of Belgium belong to the maximal and neither exists in
this house yet, so the group currently reads as complete when it is not.

Note what has happened to the mechanism. For a culture, `core` and `maximal`
describe a boundary nobody agrees on. For a group, the identical pair describes
**membership** nobody agrees on. One formalism doing two jobs is an argument for
it, not a coincidence.

## Not decided here

- Whether groups gain a `geo.json` at all, or carry extent in their play.
- Whether the tongues should carry a Glottocode. Glottography holds 13,000-plus
  language areas keyed on exactly that, and it would make 73 varieties joinable
  to an open dataset without any of this schema. It is cheap and it is separate.
- What a renderer does with `undrawn`, which is its business and not this
  house's.
