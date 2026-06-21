import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { validateProject } from "@chbrain/khai-tests";
import { referenceCard } from "@chbrain/khai-arch";
import { validateProjectLanguages } from "@chbrain/khai-language";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const culturesDir = join(root, "cultures");

// The khai types every culture must field. A culture is a full play, so the set
// is the play canon; the cultural meaning of each is the house contract
// (REFERENCE.md): plot = a historical event, position = a language position,
// place = the capital, piece = a culture-defining artifact, pitch = the Hofstede
// layer, persona = the people.
const REQUIRED_TYPES = [
  "play_",
  "pitch_",
  "plot_",
  "persona_",
  "position_",
  "place_",
  "process_",
  "piece_",
];

function cultureIds() {
  if (!existsSync(culturesDir)) return [];
  return readdirSync(culturesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name);
}

// Every culture in the house conforms to the canon. Green on an empty house (no
// cultures yet); as cultures land under cultures/, each is validated against its
// khai type, the wiring the installed engines declare, and the cultures registry.
describe("Cultures house: content conforms to the canon", () => {
  it("every instance validates against the canon (zero findings)", () => {
    // Scope the canon scan to the content collections (cultures/ + groups/).
    // management/ is the voice layer, not content: it is chain-owned wiring held
    // to the blueprint (see the management test below), and it carries no
    // declared culture, so the installed content engines (the language engine in
    // particular, which requires every persona to link a language-crossing leaf
    // in its Projection) must not run over the management cast — the chain's
    // Choregos (Pericles, Nicias) speaks no culture's tongue.
    const contentDirs = ["cultures", "groups"]
      .map((d) => join(root, d))
      .filter((d) => existsSync(d));
    const results = contentDirs.flatMap((dir) => validateProject({ root, contentDir: dir }));
    const errors = results.flatMap((r) => r.errors.map((e) => `${r.file}: ${e}`));
    expect(errors).toEqual([]);
  });

  it("the management cast is complete: every position has a persona", () => {
    // The voice layer mirrors a plays house (REFERENCE.md, the blueprint in
    // @chbrain/khai-stage): the shared core is held verbatim and each position
    // is held by a named persona. Engine wiring is out of scope here (see above),
    // so this checks only the casting law: a needed position without a persona is
    // a failure. Run `npx khai-tests management check .` for the full blueprint
    // convergence gate.
    const mgmt = join(root, "management");
    if (!existsSync(mgmt)) return;
    const files = readdirSync(mgmt).filter((f) => f.endsWith(".md"));
    const positions = files.filter((f) => f.startsWith("position_"));
    const linked = new Set();
    for (const p of files.filter((f) => f.startsWith("persona_")))
      for (const m of readFileSync(join(mgmt, p), "utf8").matchAll(/position_[a-z0-9_]+\.md/g))
        linked.add(m[0]);
    const orphans = positions.filter((p) => !linked.has(p));
    expect(orphans, `unheld positions: ${orphans.join(", ")}`).toEqual([]);
  });

  it("every instance satisfies the language policy", () => {
    // Point the validator at the content collection; its default (root/plays)
    // does not exist in a cultures house, which would silently no-op the check.
    const results = validateProjectLanguages(root, { contentDir: culturesDir });
    const errors = results.flatMap((r) => r.errors.map((e) => `${r.file}: ${e}`));
    expect(errors).toEqual([]);
  }, 30000);

  it("house reference warrant conforms to LORE", () => {
    const refPath = existsSync(join(root, "REFERENCES.md"))
      ? join(root, "REFERENCES.md")
      : join(root, "REFERENCE.md");
    expect(existsSync(refPath)).toBe(true);
    const refText = readFileSync(refPath, "utf8");
    expect(() => referenceCard(refText)).not.toThrow();
  });

  // Note: strict per-culture isolation was retired in favour of ownership +
  // resolvable casting (see REFERENCE.md and the design of record). A play may
  // cast a file in another play's directory; the engine's link check
  // (validateProject, above) is the guard — it proves every cast resolves to a
  // real owned file, so a broken cross-play link is already a finding there.
});

// The mandatory setup: a culture is a complete theatre. Every culture/<id>/
// fields the full khai type set and the casting laws (REFERENCE.md). Empty house
// registers no per-culture cases, so it stays green until the first culture lands.
describe("Cultures house: every culture is a complete theatre", () => {
  it("the cultures/ collection folder exists", () => {
    expect(existsSync(culturesDir)).toBe(true);
  });

  for (const id of cultureIds()) {
    it(`culture "${id}" uses every khai type with the mandatory minimums`, () => {
      const dir = join(culturesDir, id);
      const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
      const count = (prefix) => files.filter((f) => f.startsWith(prefix)).length;
      const errors = [];

      for (const t of REQUIRED_TYPES) {
        if (count(t) < 1) errors.push(`missing ${t}*.md`);
      }
      if (count("play_") !== 1)
        errors.push(`exactly one play_ anchor required, found ${count("play_")}`);
      if (count("plot_") < 3) errors.push(`>=3 plot_ (history) required, found ${count("plot_")}`);
      if (count("persona_") < 2) errors.push(`>=2 persona_ required, found ${count("persona_")}`);

      // Casting is type-agnostic: a plot casts whatever khai type the scene
      // needs, not necessarily a persona. The canon already enforces coverage
      // (every plot casts >=1 element of its play's Company, any type) via
      // validateProject above, so the per-plot check is left to the engine.

      // Front matter: a culture carries its own README + REFERENCES, like a play.
      for (const doc of ["README.md", "REFERENCES.md"]) {
        if (!existsSync(join(dir, doc))) errors.push(`missing ${doc}`);
      }

      expect(errors, `culture "${id}": ${errors.join("; ")}`).toEqual([]);
    });
  }
});
