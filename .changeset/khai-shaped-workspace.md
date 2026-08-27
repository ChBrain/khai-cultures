---
"@chbrain/khai-cultures": patch
---

The repository takes khai’s shape: a private workspace container with the
publishable packages beneath it.

khai’s root is `@chbrain/khai-workspace`, private and `0.0.0`, publishing
nothing; every package lives under `packages/` and they depend on each other by
ordinary caret range. This house’s root was trying to be both the workspace
container and the published package, which is the one combination changesets
refuses — that is what #416 hit and #417 backed out of.

So the house becomes a package. `cultures/`, `groups/`, `registry.json`, the
README, the REFERENCES, the licences and the playwright instructions move into
`packages/khai-cultures/`. The root keeps the tooling: the gates, the changesets,
the workflows, CLAUDE.md.

With that, `@chbrain/khai-cultures` can depend on `@chbrain/khai-cultures-tongues`
by range like any other package — resolved locally by the workspace, from the
registry by anyone who installs the house. Both are visible to changesets, both
publish, and the 236 links resolve for a consumer for the first time.

And the version question from the last round dissolves. A new or edited tongue
takes an ordinary `patch` changeset now, exactly like the house’s own content. No
git-diff against the last tag, no variety count, no publish-only-on-a-new-language
— the count rule goes back to fixing the minor and changesets does the rest, for
both packages.

Lanes redrawn to match: `culture/*` owns the two content trees,
`packages/khai-cultures/cultures/**` and `packages/khai-cultures-tongues/**`;
governance keeps the gates, the config, and the package’s own word about itself.
