---
---

Close the changeset hole while it is still empty, and give a changeset a lane.

Nothing is wrong here today; every changeset in the house names a real package.
That is the reason to write the wall now. The misfits house accumulated **nine**
changesets declaring `khai-misfits` against a package named
`@chbrain/khai-misfits`, over two weeks, with every gate green, and
`changeset version` threw on the first of them and took that release down for two
days -- `npm test` passing in every failed run, and no symptom but a Version
Packages pull request that stopped moving.

`khai-guard changeset-check` now reads the package name and not just the level,
which is the wall going forward. But it reads the changesets a pull request
**touches**, so it prevents the next wrong name and cannot sweep a backlog. This
is the corpus-wide half, and the two are complementary rather than redundant.

**This house is the harder case, and is why the guard's rule takes the workspace
names rather than the publishable ones.** There are two publishable packages plus
a private root container, so a wall judging names against one manifest would be
wrong about the other, and one that dropped private manifests would be wrong
about the root. Existence is not a question about publishing.

**And `.changeset/**` moves from `shared` to `riders`, with a governance
fallback.** `shared` is for build artefacts, which are never the whole of a
change, so a shared path owns no lane and `khai-guard branch` refuses -- _this
change is not one lane_. A changeset repair is a change whose whole content is
`.changeset/**`, so the fix for an outage like the one above would have had
nowhere to be committed, which is precisely what happened in the misfits house.
A rider already means what was wanted: it rides the lane of the change it
accompanies, exactly as a management order does, and homes to a fallback when it
rides alone. The house already had the primitive; this path had not been given
it.

Both halves were run against a broken state and fail on it.
