---
---

`npm run preflight` runs every gate CI runs, locally, before the push.

There are ten, spread across `khai-guard`, `npm test` and seven `tests/*.mjs`
invocations with their own flags. Knowing that list was tribal: run eight of ten
and you learned about the other two from a red pull request; run none and you
learned nothing until review.

The list is not written down twice. It is read from `.github/workflows/ci.yml`,
so a gate added to CI is a gate this runs the same day - and if the workflow's
shape ever changes under it, the script exits 2 rather than reporting that
nothing is wrong. A second hand-maintained copy of the truth is the failure this
house has already had once.

It also refuses to be quietly wrong about what it tested: the gates read
committed history, so a dirty working tree is reported before the run and again
after it, because a green preflight on the previous commit is not a green push.
