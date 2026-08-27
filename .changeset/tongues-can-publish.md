---
---

The tongues package becomes publishable. Three things were in the way, and the
first would have made a release a no-op.

**It packed 5 files of 65.** `files: ["*.md"]` reaches only the package root, and
all sixty tongues live in subdirectories — `de/`, `bar/`, `es/`. Published as it
stood it would have shipped a README, a REFERENCES and the root position, and
every one of the 236 links in `cultures/**` would still have 404ed. `**/*.md`
packs 65.

**Changesets could not see it.** There was no `workspaces` field, so the release
managed one package and the tongues package was invisible to it. Added now
because the moment is right: #373 showed that adding `workspaces` invalidates
pending changesets, and after the last Version Packages there are none. `npm ci`
still resolves, the lockfile moves by six lines, and the in-repo symlink still
works.

**The version rule needed a seat in the release.** The `version` script
reconciled the root against the culture count and nothing reconciled the tongues
package against its language count, so a changeset bump would have drifted it off
the rule. `build.mjs --write` now runs inside `version`, between `changeset
version` and the registry build, exactly as the registry build already does for
the root. Checked both ways: a bump to `0.20.1` survives, because a patch at the
same language count is what the rule allows, and a wrong minor would be pulled
back.

It still carries `private: true`, so it publishes nothing yet. That flip is the
owner’s, and everything it needs is now in place.
