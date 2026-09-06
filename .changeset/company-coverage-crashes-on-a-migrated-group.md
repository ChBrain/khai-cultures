---
---

**A wall that throws says nothing while looking as though it failed on the content.**

Migrating the nordics group turned `company-coverage` red with a stack trace, not
a finding:

```
FAIL  company-coverage
        tests/company_coverage.mjs:264
        if (superseded.length) stale.push([id, superseded]);
        TypeError: Cannot read properties of undefined (reading 'length')
```

**Two lists disagree by design, and nothing joined them.** `authoredCultures`
answers in _units_, and a migrated group is a unit. `cultures()` deliberately is
not — the note in `culture_sources.mjs` says it outright, _a migrated group is a
unit and not a culture_, because the minor IS the culture count and a group must
never move it. So `gate()` was handed `nordics`, asked `coverage("nordics")` for
it, and `cultureDir` correctly returned null.

Then the second fault fired. Three of `coverage()`'s four returns carried only
`{ dead, waived, company }`, while the gate destructures `superseded` too. The
early return for an unknown directory was reached for the first time, and the
wall crashed on the next line.

**Both are fixed, and neither by making the group look like a culture.**

- `coverage()` returns all four keys from every path, via one `empty` constant.
  A missing directory now reports instead of throwing.
- `gate()` charges only ids the culture list actually holds, **and prints the
  ones it skipped**: `N authored unit(s) are not cultures and are not charged by
this wall`. Skipping a group is right; skipping it silently is the fault
  `relinkNote` already exists to prevent, and this wall should not have a quieter
  exemption than that one.

Fixing only the missing key would have been worse than the crash: the gate would
have printed `Company coverage OK: "nordics" is at zero` about a group it never
looked at.

One regression test in `house.test.mjs`, running without a diff: `coverage()`
answers with all four keys as arrays, for a migrated group, for an id that does
not exist, and for real cultures. **379 tests pass.**

Note what is _not_ changed here. `subnational-conformance` and `plot-zero` read
the same unit list and both treat the migrated group as a culture, and both pass
on it — `plot-zero` because the group genuinely does span `plot_00` to `plot_99`.
That is a coincidence rather than a decision, and it is worth an order rather
than a patch: whether a group is a culture for a given wall is currently answered
once per wall, by accident.
