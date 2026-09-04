# Design of Record — Groups, Cross-Play Casting, and the Registry/Website Contract

**Status:** agreed design, now partly built. Nineteen groups exist under
`groups/`, the registry carries them, and `groups/dach/` is a full play with a
plot line, its own positions, its own persona and a pitch. Where this document
and the house disagree, the house is the record and this document is corrected;
§2.1 has been corrected once already, and says so.

**Date:** 2026-06-20, amended 2026-09-03

---

## 1. Problem

The house models cultures as full khai **plays**. We want to model **groups** of
cultures (DACH, NATO, the EU, …) — entities that are not owned by any single
culture, that several cultures belong to, and that a map/website needs to place
and cross-reference. The question was how a group fits the canon, how it
references its members, and what the website needs to read.

## 2. The model

### 2.1 Groups are plays

A group is a full khai **play**, anchored by `play_*.md`, living in a shared
top-level `groups/` collection parallel to `cultures/`. "Culture" vs "group" is a
**kind** of play (`kind ∈ {culture, group}`), not a different type. The kind sets
the conformance minimums:

- a **culture**-play requires a `pitch_` tuned against Hofstede source data (and
  the rest of the canon);
- a **group**-play is defined by casting **≥1 member play**, and **may carry a
  `pitch_`**.

Groups are **not counted** in the version: the minor stays the **culture** count.

> **Correction, 2026-09-03.** This section previously read "a group-play has
> **no** `pitch_` (an alliance has no Hofstede score)". That is wrong, and the
> reasoning is where it went wrong: **a pitch is a tone, not a score.** Its
> chapters are Tenor, Undertow, Nerve and Echo, and no number appears in any of
> them - the Hofstede table lives in a culture's `REFERENCES.md` and never in the
> pitch file. What a group lacks is the source data, not the tone. DACH's tone is
> the sound of a meeting going through a paragraph, with the comedy underneath
> that after a thousand years of inheriting, invading and administering each
> other, what the three agreed on was the commas; a play that cannot say that has
> lost something real.
>
> The rule also only ever existed here. The house's conformance accepts a group
> pitch: 378 tests pass with `groups/dach/pitch_dach.md` in place, and nothing in
> `tests/house.test.mjs` or the kit ever refused one. A minimum stated in a design
> document and in no gate is a minimum that binds only whoever reads the document,
> which in practice meant every group went without a pitch for no reason.

### 2.1.1 A group play chains plots

A group-play's `## Triggers` chains its plots, exactly as a culture-play's does.
This was never written down, and the omission had a measurable cost: **19 of 19
groups had a Triggers chapter that linked no plot**, three prose blocks each,
essays where an arc belongs. Six had zero or one plot at all, and `groups/dach/`
had a plot file on disk that its own play never referenced - the word "plot" did
not appear in `play_dach.md`.

A group's arc is what its members did **together**, and it is usually not a
treaty: DACH's runs from a written form that spread because it sold, through the
1901 conference, to a reform the public rejected. `order_the_passport.md` applies
to a group exactly as it does to a culture, and a group is the easier place to
get it wrong, because the obvious material for an alliance is the alliance.

### 2.2 Casting is type-agnostic

A play (and a plot within it) casts **whatever khai type the scene needs** —
persona, place, position, process, piece, pitch, **or another play**. This is
already the canon: `castingCoverageErrors` requires only that a plot cast ≥1
element of its play's `Company`, of any type. The repo's current persona-only
plot law is _stricter than the canon_ and is removed (see §4).

### 2.3 Ownership + resolvable casting (retiring strict isolation)

The old "strict per-culture isolation" rule (a culture's files never link outside
their own directory) is **retired**. It is replaced by:

> **Every file is owned by exactly one play's directory (no duplication). Any
> play may cast any file by a relative link that must resolve to a real owned
> file.**

- **Ownership** prevents duplication: _give the group what the group owns, leave
  the culture what the culture owns._ A nation's figure (e.g. Adenauer) lives in
  that nation; a group **casts it by reference** rather than copying it. A group
  adds its own file only when no member already owns it. (This is an **authoring
  guideline** — reviewers enforce it; no test can know a persona "should have"
  lived in a culture.)
- **Resolvable casting** is the safety net, and it is _stronger_ than isolation:
  the engine's `checkLinks` resolves every `.md` link on disk (`existsSync`
  against the file's directory). A cross-directory cast written as a correct
  relative path (e.g. `../../cultures/germany/persona_adenauer.md`) both
  validates **and proves the cast target exists**. A broken cast is a caught
  error — referential integrity comes for free.

What is surrendered: "each culture ships as a standalone zip." That is acceptable
— flattening/zipping for deployment is the **consumer's** concern (see §3.5), and
the source stays clean as nested directories.

### 2.4 The `play_` vertex

A `play_` anchor is a play's **identity** and the graph's **vertex**: globally
unique, the unit a registry entry and a cross-play reference key on. It is **not**
a privacy fence (that role is gone with isolation). For _casting_ purposes a
`play_` is just one more type; for _referencing_ purposes it is the public handle.
The graph of play→play casts may contain **cycles** (Germany↔NATO) — the cycle
ban only applies to the engine composition tree (`engineMembers`), not to content
`Company` links.

## 3. Registry & website contract

A group described as "a referencing entry" (website) **is** "a play that casts
plays" (khai). The two ends meet in one **discriminated union**, switched on
`kind`.

### 3.1 Entry shape

```jsonc
{ "id": "germany", "kind": "culture", "title": "Germany", "description": "…", "iso": "DE" }
{ "id": "esperanto", "kind": "culture", "title": "Esperanto", "description": "…" } // non-mappable: no iso
{ "id": "dach", "kind": "group", "title": "DACH", "references": ["germany", "austria", "switzerland"] }
```

- **`kind` is explicit** on both kinds (no inferring group-ness from the presence
  of `references`).
- **`references` are id-keyed** (the play vertex id), **never** ISO. ISO is a geo
  attribute a culture owns; it is resolved `id → entry → iso` when geo is needed,
  and id-keying lets a group reference a non-mappable culture.
- **`references` are build-derived**, never authored: the source of truth is the
  group play casting its members; the registry entry is its projection. (Derived
  ⇒ referential integrity, per §2.3.)

### 3.2 `iso` is the one required geo fact

Per mappable culture, `geo.json` carries **only** `{ "iso": "DE-BY" }` (ISO
3166-1 for a country, 3166-2 for a subdivision). `region`, `parent`, and display
`name` become website-derived from ISO atlases (UN M49 macro-regions; ISO names
are preferred over our own invention) and are optional overrides, not stored
fields. `state` is dropped. A culture with no `iso` is non-mappable: it lists in
downloads, does not place on the map, and can still be referenced by a group —
the union handles it for free.

### 3.3 `iso` folded into the registry

`buildRegistry` merges each item's optional `geo.json` into its entry, so the
website reads **one** manifest instead of a registry-plus-N-`geo.json` join.
Culture and group become a single discriminated union end-to-end.

### 3.4 Registry stays native; the union is produced website-side

The engine's `registry.json` is **generic, keyed by collection name** (a plays
house emits `plays: […]`; we emit `cultures: […]`), and shared across all khai
houses. So:

- **`registry.json`** (khai `buildRegistry`) stays native: `cultures: […]` (with
  `kind`/`iso`) **+** `groups: […]` (with `kind`/`references`). The pure content
  projection. No assets.
- **`available.json`** (website `build-downloads.mjs`) flattens the two arrays
  into the discriminated **`entries[]`** union, enriches with `asset`/`size`, and
  stamps `schemaVersion`/`release`/`downloadBase`. This is what the website reads.

A canonical `entries[]` _inside_ `registry.json` is deliberately **not** adopted
here: it is a cross-house registry-format break (every house, `verifyRegistry`,
the count logic) and deserves its own engine RFC. The single-shape payoff lands
in `available.json` regardless, and the no-join win comes from §3.3.

```jsonc
// available.json (website-produced)
{
  "schemaVersion": 2,
  "release": "0.1.1",
  "downloadBase": "/downloads/cultures/",
  "entries": [
    {
      "id": "germany",
      "kind": "culture",
      "title": "Germany",
      "iso": "DE",
      "asset": "germany.zip",
      "size": "39.4 kB",
    },
    {
      "id": "dach",
      "kind": "group",
      "title": "DACH",
      "references": ["germany", "austria", "switzerland"],
    },
  ],
}
```

### 3.5 Groups are lens-only in v1

A group entry carries **no** `asset`; `build-downloads` assembles no group zip.
v1 renders a group as the collection lens + a labelled set of member links. A real
"download DACH as one zip" is the embedded-closure packaging discussed
separately — namespacing/flatten included — and is **consumer-side**, deferred.
khai stays clean either way.

## 4. Routing — what lands where

### → khai · engine (`@chbrain/khai-tests`, generic, benefits every house)

- Support a **referencing collection** (`groups/`): walk it, derive `references`
  from each group play's member casts, tag `kind:"group"`, and **exclude it from
  the version count** (minor stays = culture count).
- **Merge an optional per-item `geo.json`** into each registry entry (so `iso`
  lands on cultures; absent = non-mappable). Generic, not cultures-specific.
- Add the **`kind`** discriminator (`"culture"`/`"group"`) to emitted entries;
  update `verifyRegistry` to accept the richer shape.

### → khai · repo (`khai-cultures`)

- `geo.json` → **iso-only** (allow ISO 3166-2); drop `region`/`state`. (`DE`
  stays for Germany.)
- `package.json` `khai` config: declare the **groups referencing collection**.
- `REFERENCES.md` rewrite: groups-are-plays; **ownership + resolvable casting**
  (retire isolation); geo iso-only; generalize the plot-casting rows to "casts
  the elements the event needs".
- `tests/house.test.mjs`: **remove** the isolation test and the persona-only plot
  law; add **kind-based** conformance (group minimum: ≥1 member cast). A group
  pitch is permitted - see the correction in §2.1.
- _(later)_ `groups/` content, e.g. `groups/dach/`.

### → website

- `build-downloads.mjs`: read native registry, **union → `entries[]` + enrich
  with `asset`/`size`** → `available.json` (`schemaVersion: 2`, `release`,
  `downloadBase`).
- `culture-tree.ts`: **parent-from-iso** (`DE-BY`→`DE`); consume `kind:"culture"`.
- Two atlases: **ISO 3166 names** + **UN M49 region→CVI**.
- **Group lens + collection** component: read `kind:"group"`, resolve
  `references`→`iso` for the highlight.
- Page reads the **v2 manifest**; group-as-zip deferred.

### → shared (this document, mirrored both ends)

The entry contract of §3.1: explicit `kind` (both kinds), `iso` optional,
`references` id-keyed and build-derived, non-mappable = omit `iso`.

## 5. Decisions locked

- Fold `iso` into the registry — **yes**.
- `entries[]` discriminated union — produced **website-side**; `registry.json`
  stays native two arrays (`cultures[]` + `groups[]`).
- Groups downloadable — **lens-only v1**; bundle deferred.
- Members keyed by **id**; `references` **derived**, never authored.

## 6. Explicitly out of scope here

No engine code, no `geo.json` edits, no `REFERENCES.md`/`tests` rewrite, no
`groups/` content. Those land as the §4 deltas once this paper is approved.
