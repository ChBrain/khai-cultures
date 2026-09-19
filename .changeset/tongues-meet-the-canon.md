---
---

**The tongues package is not in `productions()`, so its 154 instance files have
never reached the canon's frontmatter check. Run it once by hand and it finds
thirteen faults.**

This came out of #687, where `review: "native"` was refused the moment the same
key was used inside the umbrella. It passed in the tongues package not because
it is allowed, but because nothing looked.

Run the canon's own `validateInstanceFile` over all 154 and the result is small
and entirely real:

| finding                                   | files |
| ----------------------------------------- | ----- |
| en/em-dash where the house writes `" - "` | 6     |
| `unknown frontmatter key: review`         | 5     |
| `title/declared` does not match the H1    | 1     |
| missing the `Owner` chapter               | 1     |

Two of those no other wall in this house could have caught:

- **`fr/position_language_fr_ch.md`** carries `declared: "le français de Suisse"`
  and an H1 reading `le francais de Suisse`. An accent-stripped heading against
  correct frontmatter - and invisible to the diacritics wall, which reads the
  body's density and is perfectly satisfied by a file whose prose is otherwise
  full of accents.
- **`gallo/position_language_gallo.md`** has no `Owner` chapter at all.

The six dashes are the same `" - "` rule `production-packages` enforces on all
109 production packages. The tongues package is published exactly as they are
and was simply never asked.

## What the invented keys turned out to be, which is not what it looked like

Two keys are unknown to the canon, and they are **not the same finding**. This
change removes one and keeps the other, and the difference is the point.

**`review: "native"` is pure duplication.** `build.mjs` reads `review` off the
**provenance entry**, never off the frontmatter, and renders "The prose is
flagged for native review" into `REFERENCES.md` from there. 85 provenance
entries already carry it - including all five of the files that also wrote it
into their frontmatter. So the key is redundant, unread, and invalid, and
deleting it loses nothing: the flag it was trying to raise is already raised,
structurally, in the right place.

**`mother_tongue: false` is load-bearing, and it stays.** I removed it first and
caught the regression in the diff: `build.mjs` derives
`khai.wiring.noMotherTongue` from it, `tests/persona_wiring.mjs` consumes that,
and the list went to `[]`. It is the half of the persona-wiring contract this
package owns - which tongues nobody acquires first - and Swiss Standard German
and Liechtenstein Standard German are exactly that, written standards with a
dialect underneath. Deleting the key would have quietly switched the rule off
for both.

So the canon's closed key set and this house's own wiring genuinely disagree,
and the answer is not to delete the house's wiring. When the scan is extended to
cover this package, `mother_tongue` goes in as a declared extension via
`checkFrontmatter`'s `extra`, not as a fault to clear.

## Scope

Content only - this is the culture lane. `provenance.json`, `package.json`,
`README.md` and `REFERENCES.md` are untouched: `noMotherTongue` still lists both
files, and the generated docs rebuild byte-identical.

Extending the canon scan to this package is the other half and lives in `tests/`,
so it is a governance change and follows this one. With these thirteen cleared,
it can land green instead of arriving with a standing count.

This changeset is deliberately empty. The tongues package has never been
published, and its version is derived from the language count by its own build
(`deriveVersionFrom`), not bumped by changesets - so a releasing entry here would
bump from a version that was never released.
