---
---

`pre-push` runs the gates.

It ran `khai-guard` alone, which checks lane and source/test separation and
nothing else. Two culture branches went past it failing six of eleven walls and
were announced as "successfully validated" - validated by running a registry
BUILDER and an advisory reporter that always exits 0. Neither can fail, so
neither found anything, and nothing between the author and the remote disagreed.

It now runs `npm run gates`, whose list `tests/gates_manifest.test.mjs` holds to
ci.yml. A couple of minutes, most of it the conformance suite, against a CI round
and a review spent on something the author could have seen.

It also runs `npm ci --dry-run` first. The gates runner says plainly that it uses
the installed `node_modules` and that "a lockfile or manifest mismatch is
invisible to it"; that mismatch failed all ten jobs of one pull request at the
install step, in under twenty seconds each, with no log naming a lockfile. Half a
second here buys that back.

Watched failing before shipping: on a stale lockfile, and on a red wall.
