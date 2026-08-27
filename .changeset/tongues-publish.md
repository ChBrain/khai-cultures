---
"@chbrain/khai-cultures": patch
---

The tongues package publishes, and the house pulls it.

Four things were between it and a working release, and the first would have made
the release a no-op.

**It packed 5 files of 65.** `files: ["*.md"]` reaches only the package root and
all sixty tongues live in subdirectories, so a publish would have shipped a
README, a REFERENCES and the root position while every one of the 236 links in
`cultures/**` still 404ed. `**/*.md` packs 65.

**Changesets could not see it.** No `workspaces` field, so the release managed one
package. Added in the window the last Version Packages opened: #373 showed that
adding it invalidates pending changesets, and there were none.

**Its version rule had no seat in the release.** `build.mjs --write` now runs
inside the `version` script, where the registry build already sits for the root,
so a changeset bump cannot drift the package off its language count.

**And it was private, and a devDependency.** `private` is gone and it carries the
same `publishConfig` the root already uses — GitHub Packages, public access — so
nothing global changed. It moved to `dependencies` at `^0.20.0`, because a package
must pull what its content links: installing the house now installs the tongues.

After this release the 236 links resolve for the first time for anyone who
installs the house rather than checking it out.
