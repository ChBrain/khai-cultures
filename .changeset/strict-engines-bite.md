---
---

`engine-strict=true` has been in `.npmrc` for as long as the file has existed,
and it has never refused anything, because nothing declared an engine range for
it to enforce.

The root now declares `"engines": { "npm": ">=11" }`. npm 10 writes a lockfile
without the platform-optional entries npm 11 requires; that lockfile installs
fine on the machine that wrote it and fails every CI job at `npm ci`. Fribourg
lost a round to exactly this, and the failure names `lightningcss`, not npm.

Verified both directions in the same tree: npm 10.9.7 now exits 1 with
`notsup Required: {"npm":">=11"}`, npm 11.19.1 exits 0. `npm run` is untouched -
only the install family checks engines - so `npm run gates` still runs on either.

No node range. `.nvmrc` says 24 and every workflow reads it with
`node-version-file`; node was never what broke, and declaring it here would only
be a second place to keep the same number right.
