# @chbrain/khai-cultures

## 0.5.1

### Patch Changes

- 76b117d: Adopt `@chbrain/khai-engine-language`: install the language engine and wire every persona's `## Projection` to the language-crossing width it holds (speaking/writing/thinking × mother-tongue/borrowed/worn/carried). This activates the engine layer (previously the house installed no engine, so its wiring was never enforced) and models language as process per persona — natives in their mother tongue, Sönke borrowing Danish across the border, Merle wearing English, Luther and Storm forging the written mother tongue.
- 25d0b39: Align the house to the upgraded engine: declare the `groups` referencing collection (anchored by `play_`, referencing `cultures`, not counted) and register `nds` (Plattdeutsch) in `khai.languages`; add a `group/*` branch lane; fix the language test (it pointed at the non-existent `root/plays`, silently no-op) to validate `cultures/`; document groups, the registry `kind`/`iso` shape, and the language path in `REFERENCE.md`. `registry.json` gains an empty `groups` array.
- 9411077: Fix the count-driven add gate to match the real culture anchor (`play_*.md`, not the legacy `culture_*.md`), and correct CLAUDE.md to describe the full play canon. Adding a culture is once again changeset-free per the documented versioning model.
- 23b4130: Germany: declare `language: de` on the play (per-play language, now that the engine enforces the language policy) and trim `geo.json` to iso-only (the website derives region/parent from the ISO code).
- 3086050: REFERENCE: document the language engine — how khai engines are installed and enforced, and the rule that every persona links its language-crossing width in its Projection. Also correct the worked example's geo to the iso-only shape.
- 470ad90: Retire strict per-culture isolation in favour of ownership + resolvable casting, and make the plot-casting law type-agnostic, aligning the gates and the REFERENCE contract with the approved design of record. Geo contract restated as iso-required with region/parent/name as website-derived optional overrides. (Repo-side deltas only; the groups collection and registry changes await the khai-tests engine work.)
- dd76464: Upgrade the khai engine (khai-tests 0.1.26, khai-language 0.1.4, khai-arch 0.1.19, khai-guard 0.1.12, khai-rules 0.1.6). The registry build now stamps each entry with its `kind` and folds in the `iso` from a `geo.json` sidecar, so `registry.json` gains `kind: "culture"` and `iso` on every entry.

## 0.1.2

### Patch Changes

- 8a46e49: Correct the authoring contract: a culture's geo (region, ISO) lives in a
  per-culture geo.json sidecar, not in play frontmatter (khai frontmatter keys
  are closed). Document geo.json as a required per-culture file alongside README
  and REFERENCES.
- b49cca3: Germany: add `geo.json` (`{ region: "europe", iso: "DE" }`) so the website map producer can place Germany on the world map. Sidecar data only; no change to the culture content or the count.

## 0.1.1

### Patch Changes

- a3d2552: Define and enforce the culture authoring contract. Anchor the cultures
  collection on the play file (a culture is a play); recast REFERENCE.md as the
  LORE warrant carrying the contract (every khai type, history as plots, the
  Hofstede-from-data-never-named pitch, own-language, per-culture README +
  REFERENCES); and gate it in the house test: every culture uses all eight khai
  types, >=3 plots each casting a persona, >=2 personas, and its own
  README + REFERENCES. Green on the empty house.

## 0.0.1

### Patch Changes

- bb67b32: Raise the Cultures content house: a flat khai house that indexes a `cultures`
  collection (the new `@chbrain/khai-tests` collection support) and is governed
  exactly like a plays house — package wiring, computed-minor numbering, the
  guard lanes, husky, CI, and the conformance test. The `cultures/` content
  folder is seeded next; content is authored later.
- 575f26b: Seed the empty `cultures/` content folder. The house now ships its content
  directory (still empty); cultures are authored later. The registry stays the
  empty bill at the current culture count.
