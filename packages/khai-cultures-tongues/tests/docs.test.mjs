import { describe, it, expect } from "vitest";
import { drift, provenanceGaps, varieties } from "../build.mjs";

// The package's own docs are rendered, not kept. The house has already paid once
// for a hand-maintained table about files it did not contain: the language
// manifest had drifted in seventeen places before anyone counted. This package
// will hold 320 varieties, so the table can never be the thing anyone maintains.
describe("tongues: the docs are rendered, never kept", () => {
  it("every variety has provenance, and every provenance a variety", () => {
    const gaps = provenanceGaps();
    expect(gaps, gaps.join("; ")).toEqual([]);
  });

  it("README and REFERENCES match what the sources render", async () => {
    const d = await drift();
    expect(d, d.join("; ")).toEqual([]);
  });

  it("renders at least the variety that has landed", () => {
    expect(varieties().length).toBeGreaterThan(0);
  });
});
