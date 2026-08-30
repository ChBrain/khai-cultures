---
---

`npm run preflight` now checks that `package-lock.json` matches the manifests
before it runs a gate.

It did not, and the gap was mine. PR 496 added a workspace package and its
dependencies without regenerating the lockfile. Preflight reported 10/10 because
it uses the `node_modules` already on the machine; CI installs with `npm ci`,
which refuses a lockfile that does not match, and every one of the ten jobs
failed at the install step in under twenty seconds - not one of them on its own
content, and the logs said nothing about a lockfile.

`npm ci --dry-run` is the same check CI's install makes and costs half a second.
It has been watched failing on a real mismatch, not assumed to work: a runner
that reports PASS because it looked at nothing is worse than no runner.
