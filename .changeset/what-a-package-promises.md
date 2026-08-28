---
---

**What a package promises is now held against what it ships.**

Twice a package here has published a manifest describing content the tarball did
not contain, and both times nothing noticed, because nothing reads a tarball:

- the tongues package listed `files: ["*.md"]`, which reaches only the package
  root while all sixty varieties live in subdirectories — 5 files of 65, with
  every one of the 236 links in `cultures/**` still 404ing;
- the house listed `cultures/**` and not `groups/**`, so `registry.json` shipped
  describing nineteen groups and every path it named was absent.

Different mistakes, one failure: **the manifest is the promise and `files` is the
delivery, and nothing held them to each other.** Both were caught by hand, the
second only because the release made it worth going to look.

`tests/packing.test.mjs` now asks npm what it would put in the box and checks
every file the package's own manifest names is in it — the house against
`registry.json` (cultures, groups, and the registry itself), the tongues against
`khai.members`. It asks `npm pack --dry-run --json` rather than re-implementing
the glob semantics, because a second implementation of the packing rules is a
second thing to get wrong.

Verified against both original bugs by reintroducing them:

```
files without groups/**  -> × packs every group file the registry lists
files: ["*.md"]          -> × the manifest names 61 member(s) and 60 are not
                             in the tarball
```

`npm test` runs in the release workflow before the publish step, so this stands
between a hollow package and the registry.
