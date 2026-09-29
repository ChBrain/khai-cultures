---
---

**The suite was one file in one worker, and two commands disagreed about what
a failure is.**

`npm test` carried `--test-timeout=120000` on the script; a bare
`npx vitest run` got vitest's 5000ms default. Two tests sit between those
numbers, so the short command reported failures that were not failures - read
as "slow container, green in CI" across five pull requests, when the truth was
that CI ran the other command. There is now a `vitest.config.mjs`, the timeout
lives in it, and the script is plain `vitest run`.

**Measured, then split.** 153s wall; `house.test.mjs` was 103s of it, and one
test - the language policy over 6,171 files - was 52s, half the suite. Vitest
parallelises across FILES, so 25 describe blocks in one file used one of four
cores.

The 25 blocks are now six topical files, and the language policy is two more,
split along the seam its own array literal already had: the umbrella (31.3s
measured) and the 113 productions (15.9s, median 116ms). The halves were
checked against the whole UNDER A PLANTED FAULT, because two empty finding
sets agreeing proves nothing.

**153s -> 72s.** The ceiling is now the umbrella at 38s.

507 tests became 516: +1 from splitting the language test, and +8 because
`migration.test.mjs` runs its path-typing rule over every `.mjs` in `tests/`
and there are eight more of them.
