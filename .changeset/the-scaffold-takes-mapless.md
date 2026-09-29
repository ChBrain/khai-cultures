---
---

**`new_culture.mjs` takes `--mapless`.**

`--iso` was mandatory under the refusal "geo.json is not guessable", which was
right about the thing that matters and wrong about the only shape a culture can
have. It is now one of two, and still a flag either way: the tool cannot guess,
so "I forgot the code" must never be the same keystroke as "this people holds
no ground". `--iso` and `--mapless` together are refused as a contradiction.

A mapless scaffold writes no `geo.json`, drops it from `files`, and derives its
host from the id prefix exactly as `culture_conformance` reads it - printed, not
silent, and refused when the prefix names no culture. The wall blocks on the
host link, so a scaffold without it would hand the author a package that cannot
pass.

Three tests hold the refusals, each asserting a non-zero exit AND an untouched
`packages/`: a guard that fires after `mkdirSync` has already left a package
behind.
