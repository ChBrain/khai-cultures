---
---

**Retire the local walls the kit now holds, and match each retired assertion
to the check that covers it.**

`@chbrain/khai-tests` 0.4.2 and `@chbrain/khai-guard` 0.3.2 took over four
checks this house built locally, so the local copy is retired: two
implementations of one rule diverge. `tests/release.test.mjs` is covered by
`verifyRelease`, already wired in `house.test.mjs`. `tests/gates_manifest.test.mjs`
is covered by `verifyGatesAgainstCi` reading `ciPolicy` from
`khai-guard.config.json`, its own anti-vacuity (zero parsed jobs fails)
included. `tests/changesets.test.mjs`'s corpus rule (a changeset names a
package this workspace has) is `khai-guard changeset-check`'s `workspaceNames`
check since 0.3.1; its lane assertion, that `.changeset/**` is a rider and not
shared, moved into `house.test.mjs`, since the guard checks names and not
lanes. `tests/packing.test.mjs`'s manifest-promise and registry-promise
assertions are `checkPacking` and `checkRegistryPacking`, both now asked in
`house.test.mjs` off one pack; its exhaustive per-member check and its
`groups` collection check are not what `checkRegistryPacking` reads (it walks
only the primary collection, and only a shipped entry's anchor file), so both
stay local, in the same test, off the same box. The tongues assertion (every
`khai.members` file is packed) turned out to already be `checkPacking`'s own:
its `promised()` reads `khai.members` directly, so nothing needed moving there.

The local ASCII-filename test in `house.test.mjs` is retired for
`filenameErrors`, wired beside it; the kit's wall checks each unit's own
directory rather than the whole package tree, which is narrower by
`management/`, `groups/` and the package's own root files, none of which
carry a non-ASCII name today.

`tests/culture_sources.mjs` is now a thin adapter over the kit's
`resolveHouse` and `unitsOf` for finding the house and walking it, and over
`defaultRelink` for the relink rule itself - both byte-identical to what this
house wrote first. Two things stayed local on purpose, not as a shortcut but
because the kit's shape does not carry what this house's own callers need:
`pathCulture`'s monolith branch stays a string match on the path, because a
migration's diff carries a culture's old path after the directory it named has
already gone empty on disk, and a check keyed on "does this directory still
exist" reads that as the production package's duplicate rather than the same
culture's own rename; and `authoredCultures` keeps its own per-file grouping,
because the kit's `touchedUnits` answers "was this unit authored" as a whole
and hands back every changed file either way, where `plot_zero.mjs`'s gate
needs to know whether the PLOT files specifically were, not just something
else in the culture. Both are documented in place. Every baseline count and
every gate verdict reproduced exactly across the whole suite before this
landed.

`migration.test.mjs`'s scratch fixtures now declare `khai.collection` and a
workspace root manifest, because the resolver they prove is now the kit's
manifest-driven one rather than a hardcoded path; no test's assertion changed.

Ships nothing.
