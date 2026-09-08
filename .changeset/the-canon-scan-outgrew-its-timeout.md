---
---

**#622 failed CI on a timeout, and it was not #622's fault.**

One job of fifteen went red — `khai-tests`, which carries prettier and conformance —
and inside it exactly one test of 397:

```
✓ 396 passed
✗ every instance validates against the canon (zero findings)
  Error: Test timed out in 120000ms.
  ❯ tests/house.test.mjs:87:3
```

## Measured before anything was changed

That test validates **every instance in every content collection** against the
canon, and then **every migrated production against its own package root**. It is
O(house), and the house is deliberately growing.

Run the way the suite runs it — the same `--exclude` flags, the same 120s ceiling:

| branch                                           | canon scan    |
| ------------------------------------------------ | ------------- |
| `main`                                           | **71 746 ms** |
| `culture/netherlands-leaves-the-umbrella` (#622) | **71 467 ms** |

**279 milliseconds apart, with the branch faster.** The change in front of it did
not cause this. `main` sits at the same 72s and would fail the same way on the next
pull request from anyone.

(The first attempt to measure it was wrong and worth recording: running
`npx vitest run tests/house.test.mjs` on its own picks up the stale worktrees under
`.claude/` and drops the suite's own timeout flag, so it reported 1578 tests, five
copies of this one, and failures that were only the 5s default. The numbers above
use the script's exact flags.)

## What is changed

The test now carries **its own 600s limit** instead of the suite's 120s. The suite
default stays where it is on purpose: **a test that should take a second must still
fail fast**, and raising the global ceiling to accommodate one slow scan would blind
every other test in the file.

72 seconds of headroom on this machine is none at all on a CI runner, which is
exactly the gap #622 fell through.

## What is not changed, and should be said plainly

**This buys time and is not a fix.** The scan grows with the house, and the house is
supposed to keep growing — 319 cultures and 72 packages today, and the umbrella
still holds most of them. When this bites again the answer is **to make the scan
incremental**, validating what a diff touched rather than the whole house, and not
to raise the number a third time. That is written into the test's own comment so the
next person meets it there rather than here.

No wall is weakened: the scan still runs over everything and still expects zero
findings. Only the clock moved.
