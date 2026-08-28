---
---

Pin the release workflow, so it cannot silently stop calling this repo's scripts.

This house's release was down for four hours earlier without anything saying so,
and khai's was down for four consecutive runs the same way. Both had the same
cause: a dependabot bump to `changesets/action@v2`, which RENAMED its inputs
(`version` -> `version-script`, `publish` -> `publish-script`) and refuses to run
under the old names rather than falling back. `npm test` was green in every
failed run, because the failure sits in the last step of a job whose visible work
all passes, and the only downstream symptom is that a release does not appear.
Neither outage was caught by anything; both were noticed by a person wondering
where a Version Packages pull request had got to.

Five assertions: the two input names, the two scripts they name still existing
(pinning an invocation is worthless if the script is renamed away underneath it),
and that no `GITHUB_TOKEN` env var sits beside the `github-token` input -- v2's
second break, invisible until the first is fixed.

**The input NAME is pinned rather than just the script**, because the name is the
load-bearing half: under the wrong one the action does not degrade, it refuses.
And khai's equivalent test is the cautionary case -- written against v1, it went
on asserting the broken spelling was present and certified the failure through
four dead releases. A test that pins an external contract has to be re-pinned
when that contract moves.

**`push-with-git-cli` is deliberately NOT pinned here.** khai needs it because it
ships CLI entry points and v2 writes the release branch through the GitHub API,
which has no mode for an executable file. This house tracks zero executable
files, so the API path never meets one and the setting would be cargo. Copying a
pin that works elsewhere is how the wrong thing gets asserted confidently.

Ships nothing.
