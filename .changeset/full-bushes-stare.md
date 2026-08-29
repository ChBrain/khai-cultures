---
---

The lockfile records the umbrella's version again.

`#485` moved `@chbrain/khai-cultures` from `0.294.0` to `0.297.0` - the registry
build sets the minor from the culture count - but the branch never ran
`npm install` after that build, so `package-lock.json` was left describing a
version that no longer existed. A clean install reproduces exactly this one line,
which is how it was found.

Nothing ships: `package-lock.json` is not in any package's `files`, so this is an
empty changeset.
