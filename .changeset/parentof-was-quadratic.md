---
---

**#623 raised a timeout. It should have found the bug. This finds the bug and puts
the timeout back.**

The canon test took 69 seconds and timed out on CI. #623 gave it a 600s limit on the
reading that the scan is O(house) and the house is deliberately growing. **That
reading was wrong**, and the measurement that shows it takes one probe:

```
umbrella validateProject : 1.5s   (247 cultures + 14 groups)
productions loop         : 65.5s  (72 packages)
```

**247 cultures in a second and a half against 72 packages in sixty-five is not
scale. It is a bug.** The slowest five packages were `gb-england`,
`gb-northern-ireland`, `ch-aargau`, `ch-st-gallen`, `gb-scotland` — every one of
them sub-national, which named the culprit before the profiler did.

## What it was

```js
export function parentOf(code) {
  for (const id of cultureIds()) if (iso(id) === code) return id;
  return null;
}
```

`iso(id)` reads that culture's `geo.json` from disk. So `parentOf` is a linear scan
over the whole house with a file read at every step — **836ms a call** — and
`production_packages.findings` calls it **once per sub-national package**, inside a
loop over every package.

That is **O(house × packages)**, and roughly **22,000 reads of the same ~319 files**
in one test. Both factors are things this house is deliberately growing, so it was
getting worse in two directions at once.

## What it is

An ISO-code index, built once on first use and held for the process — correct for a
test run, which reads a fixed tree.

|                  | before | after    |
| ---------------- | ------ | -------- |
| productions loop | 65.5s  | **2.4s** |
| whole canon scan | 69s    | **3.8s** |

**Seventeen times faster, and it changes no answers**: 397 tests pass as before, the
sub-national report still reads exactly **59 not yet conforming**, and `parentOf`
still returns `united_kingdom`, `switzerland`, `germany`, `spain`, `usa`, `france`,
and `null` for a code nobody holds. The map keeps the first match, which is what the
loop did.

## And the timeout goes back to the suite default

The 600s override from #623 is removed, deliberately, because **a tight timeout is a
regression detector.** At 600s this exact fault could come back and cost a minute a
run with nobody noticing; at the suite's 120s it announces itself. The test's comment
now says so, and says that the first question next time is _what became quadratic_,
not _what number to raise_.

## On sharding, which was the other option on the table

Splitting the long runner across CI jobs would have worked — the loop is one
independent package after another, which is exactly the shape that shards. It would
also have **parallelised the waste**: the same 22,000 redundant file reads spread
over more machines, still growing quadratically, with the symptom hidden behind more
hardware.

Worth keeping in the pocket for when the scan is genuinely large. It was not
genuinely large.
