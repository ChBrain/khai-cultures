---
---

Pass the release PAT to changesets/action through its `github-token` input.
The v1 to v2 bump broke the release twice, and #361 only fixed the first half:
with the inputs renamed the action now starts, then refuses to run because a
`GITHUB_TOKEN` env var is set to something other than its `github-token` input,
which defaults to the built-in token. The PAT moves into the input; only
`NODE_AUTH_TOKEN`, which npm reads during publish, stays in env. The PAT cannot
be dropped in favour of the default, since GITHUB_TOKEN suppresses workflow runs
on the commits it makes and the Version PR would never get CI. Tooling only.
