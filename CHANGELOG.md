# @chbrain/khai-cultures

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
