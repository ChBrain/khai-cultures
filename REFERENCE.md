---
updated: "2026-06-19"
---

# Cultures House: Reference

The warrant for the Cultures house and the contract for authoring one culture.
It mirrors a khai **plays** house: a culture is built, gated, and shipped exactly
like a play, because a culture **is** a play.

## Line of Work

Modelling cultures as **full khai plays** — a theatre of each culture. Each
`cultures/<id>/` is one country staged as a production: anchored by a
`play_<id>.md` and cast from the canon's elements the same way a staged play is.
Authoring a culture is staging the country, where every beat, role, place,
practice, and object is drawn from that culture and the whole is tuned to its
Hofstede profile through a single pitch.

A culture is complete only when it uses **every** khai type, at the mandatory
minimums:

- `play_` — the culture itself (the anchor): exactly one.
- `pitch_` — the Hofstede layer: one.
- `plot_` — a historical event (history is the plot line): three or more, and
  **each plot casts the historic personas of that event**.
- `persona_` — the people: at least two **defining** personas (in generational
  tension), plus the historic personas the plots cast.
- `position_` — a language position (a role the language encodes): one or more.
- `place_` — a place (the capital at minimum): one or more.
- `process_` — a cultural practice: one or more.
- `piece_` — a culture-defining artifact: one or more.

## Origin

The tuning data is **Geert Hofstede's model of national culture** (the cultural
dimensions). It is the silent source behind every culture's pitch. Each culture
cites its own scores and their provenance in its `cultures/<id>/REFERENCES.md`,
so the data is on record without ever entering the prose.

Historical events, figures, places, and artifacts are drawn from the public
record. Sources in the public domain are credited where they are used (in each
culture's `REFERENCES.md`), never claimed; the staging and the architecture are
original work.

## Restrictions

What the house refuses, and the laws it holds every culture to.

- **The pitch names no dimension.** Hofstede enters only as drama: the pitch is
  written _from_ the scores but never says "uncertainty avoidance", "power
  distance", or any dimension, and carries no numbers. The data lives in
  `REFERENCES.md`; the pitch is its invisible hand.
- **Own language.** A culture is written in its declared language; English is
  permitted only in section headings, the Owner block, YAML frontmatter, and
  link target paths. Enforced by `@chbrain/khai-language`.
- **Multilingual cultures fan out.** A culture with more than one language
  carries the corresponding khai files in **each** language.
- **Strict per-culture isolation.** A culture's files never link outside their
  own `cultures/<id>/` directory.
- **Credit, never claim.** Public-domain sources are attributed in
  `REFERENCES.md`.
- **No culture ships unverified.** The house test holds every culture to the
  canon, the wiring, the language policy, the casting laws, and the mandatory
  type set; `npm test` is green before a culture merges.

## Encoding

Each khai type carries a fixed cultural meaning. The mapping is the contract.

| khai type   | In a culture                                      | Minimum                                                                  |
| ----------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `play_`     | the culture itself (the anchor)                   | 1 (geo lives in `geo.json`, not frontmatter — see below)                 |
| `pitch_`    | the Hofstede layer (written from the data)        | 1                                                                        |
| `plot_`     | a historical event — history is the plot line     | 3 or more; each casts its historic personas                              |
| `persona_`  | the people                                        | 2 defining (generational tension) + the historic personas the plots cast |
| `position_` | a language position (a role the language encodes) | 1 or more                                                                |
| `place_`    | a place (the capital at minimum)                  | 1 or more                                                                |
| `process_`  | a cultural practice                               | 1 or more                                                                |
| `piece_`    | a culture-defining artifact                       | 1 or more                                                                |

Per culture, beyond the khai instances: a `README.md` (the culture's
front-of-house identity and its Estate link back to this house), a
`REFERENCES.md` (provenance: the historical sources behind the plots and
personas, public-domain credits, and the Hofstede source data), and a
`geo.json` (the culture's place on the map: `{ region, iso }`, with optional
`parent`/`state` for a sub-national culture). **`geo.json` carries the geo, not
the play frontmatter** — khai frontmatter keys are closed, so the play file
cannot hold `region`/`iso`. The website producer reads `geo.json` to emit the
map manifest (`available.json`); the language is the culture's declared
language, enforced by `@chbrain/khai-language`, not a frontmatter field here.

---

Worked example — Germany (`cultures/germany/`, anchored by `play_germany.md`,
with `geo.json` `{ "region": "europe", "iso": "DE" }`, declared language `de`):
the pitch dramatizes Germany's profile
without naming it (there is a correct way, found by competence not rank, said
plainly even when it stings; beneath it the long memory that something once went
catastrophically wrong, so the rules are a promise kept across time). Plots from
history (1517 Reformation/Luther, 1871 Reichsgründung/Bismarck, 1949 Grundgesetz
and Wirtschaftswunder, 1989/90 Mauerfall), each casting its historic personas;
two defining personas in generational tension; language positions (Sie/Du, the
Meister, the Beamte); places (Berlin, das Ruhrgebiet); processes (Pünktlichkeit,
Mülltrennung, Erinnern); pieces (das Grundgesetz, die Stolpersteine, das Brot).
