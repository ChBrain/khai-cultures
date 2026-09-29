// The language policy over the whole house, split in two so the box can use
// more than one core on it.
//
// This was one test of 52 seconds, which was half of a 153-second suite, and
// vitest parallelises across FILES: one test in one file is one worker,
// whatever else is idle. The work was already two independent halves in a
// single array literal - the umbrella's own cultures, and each migrated
// production rooted on itself - so the split is along a seam that was already
// there, not a new one cut for speed.
//
// MEASURED BEFORE SPLITTING, because "it is the same work" is a claim and not
// a fact: the umbrella is 31.3s and the 113 productions are 15.9s together,
// median 116ms each. And the halves were checked against the whole under a
// PLANTED FAULT, not just on a clean tree - a German paragraph dropped into a
// culture's culture-position was reported identically by both, because two
// empty finding sets agreeing proves nothing at all.
//
// Two corrections compounded into the runtime here. khai-language 0.1.24
// derives the scanned chapter set from khai-arch instead of a hand-typed list
// of fifteen, which added 43% of the house's prose; and trimming khai.languages
// from 34 to 18 switched detection back on for sixteen languages, English among
// them. The 120000 timeout stays on both halves: it is a ceiling against a hang,
// not a budget either half is near.

import { describe, it, expect } from "vitest";
import { validateProjectLanguages } from "@chbrain/khai-language";
import { productions } from "./culture_sources.mjs";

describe("Cultures house: the language policy holds in every production", () => {
  it("every migrated production satisfies the language policy", () => {
    // Each production is rooted on itself: a published package is the whole of
    // what its reader gets, so it is validated as one and not as part of a
    // workspace that will not travel with it.
    const results = productions().flatMap((p) =>
      validateProjectLanguages(p.dir, { contentDir: p.dir }),
    );
    const errors = results.flatMap((r) => r.errors.map((e) => `${r.file}: ${e}`));
    expect(errors).toEqual([]);
  }, 120000);
});
