---
---

The test suite's timeout is out of headroom, and local runs stopped matching CI.

**The timeout.** `khai-tests` failed on #489 with `Test timed out in 30000ms` on
the canon validation. It is not that pull request's content: measured on `main`
at 297 cultures, `every instance satisfies the language policy` takes **25.6s**
and `every instance validates against the canon` takes **16.5s**. The limit was
30s. The margin was gone, CI runners are slower than a laptop, and #489 is simply
the pull request that crossed the line - every one after it would have failed the
same way, intermittently, with a message that points at the wrong thing.

The timeout goes to 120s. That buys room rather than solving anything: at roughly
87 milliseconds of validation per culture, a house heading past 300 will spend
this again. The real fix is to make the canon scan cheaper, and that is its own
piece of work, named here so it is not rediscovered from another red build.

**The local/CI divergence, which is the more embarrassing half.** The script had
no `--exclude`, so vitest walked `.claude/worktrees/` and picked up the
`house.test.mjs` of every stale agent worktree left on the machine. On this one
there were four, so `npm test` ran the whole suite three times over three
different checkouts and reported **1653 tests** where CI reports **365**.

Every green run was genuinely green, so nothing shipped broken - but the number
quoted in the last several pull request bodies was inflated, and worse, the
triple run hid how close the real suite was to the wall: the copies are older and
smaller, and their timings sat comfortably under the limit while the real file
did not. The excludes are restored, and `npm test` now reports what CI reports.
