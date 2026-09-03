---
---

**Eleven cantons get their ISO code in the canonical case, and the gate starts
working.**

ISO 3166-2 codes are uppercase. Eleven cantons stored theirs lowercase, and it
was never cosmetic: `parentOf` compares the stored string as stored, so `"ch"`
never matched Switzerland's `"CH"`, the parent came back null, and the entire
nesting branch of `subnational-conformance` was skipped for those eleven. The id
half passed anyway, because it lowercases before comparing, and so does the
package name. Exactly one consumer read the string as stored, and it was the gate.

All eleven now resolve to Switzerland, and the check runs on them for the first
time. It finds nothing, because #535 wrote the nine missing parent links first.
That ordering was the whole point: normalising before those nine landed would
have dropped nine blocking findings in one commit, on the thinnest cultures in
the set.

`geo.json` is now 316 uppercase codes and no lowercase ones, and
`registry.json` was rebuilt to match: it mirrors the code, so eleven entries went
stale the moment the source changed. `tests/migration.test.mjs` caught that,
which is the registry's single-writer rule doing its job.

The general lesson is worth more than the eleven files: a gate keyed on exact
string equality does not fail loudly when the key is malformed - it silently
exempts whatever fails to match, and reports itself green. This one hid for
eleven cultures across two country-level campaigns.
