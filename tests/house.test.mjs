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

// The basenames of every strictly-local markdown link in a file. Mirrors the
// isolation walk's parser, so "casts a persona" reads casting the same way.
function linkedBasenames(text) {
  const re = /\]\(([^()\s]+)\)/g;
  const out = [];
  let m;
  while ((m = re.exec(text))) {
    const target = m[1].split("#")[0];
    if (!target || /^[a-z]+:\/\//i.test(target)) continue;
    out.push(target.split(/[/\\]/).pop());
  }
  return out;
}

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
    const results = validateProject({ root });
    const errors = results.flatMap((r) => r.errors.map((e) => `${r.file}: ${e}`));
    expect(errors).toEqual([]);
  });

  it("every instance satisfies the language policy", () => {
    const results = validateProjectLanguages(root);
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

  it("every culture is isolated (no relative links pointing outside its directory)", () => {
    const errors = [];
    // Green on a house whose content folder is not present yet (e.g. before the
    // cultures/ seed lands): nothing to walk, nothing to isolate.
    if (!existsSync(culturesDir)) {
      expect(errors).toEqual([]);
      return;
    }

    function walk(dir) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
          walk(fullPath);
        } else if (entry.name.endsWith(".md")) {
          // Only check files inside a culture subdirectory (a child of cultures/)
          const relativeDir = dirname(fullPath)
            .slice(culturesDir.length)
            .replace(/^[/\\]+/, "");
          if (!relativeDir) continue;

          const content = readFileSync(fullPath, "utf8");
          const re = /\]\(([^()\s]+)\)/g;
          let m;
          while ((m = re.exec(content))) {
            const target = m[1].split("#")[0];
            if (!target || /^[a-z]+:\/\//i.test(target)) continue;

            // Relative link must be strictly local (no traversal or folder nesting)
            if (target.includes("..") || target.includes("/") || target.includes("\\")) {
              errors.push(`${fullPath}: relative link "${m[1]}" escapes local culture directory`);
            }
          }
        }
      }
    }

    walk(culturesDir);
    expect(errors).toEqual([]);
  });
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

      // Casting law: a plot is a historical event, so it casts the historic
      // personas of that event — it must link at least one persona_ in this dir.
      for (const plot of files.filter((f) => f.startsWith("plot_"))) {
        const casts = linkedBasenames(readFileSync(join(dir, plot), "utf8")).some((b) =>
          b.startsWith("persona_"),
        );
        if (!casts)
          errors.push(`plot ${plot} casts no persona (a historical event must cast its figures)`);
      }

      // Front matter: a culture carries its own README + REFERENCES, like a play.
      for (const doc of ["README.md", "REFERENCES.md"]) {
        if (!existsSync(join(dir, doc))) errors.push(`missing ${doc}`);
      }

      expect(errors, `culture "${id}": ${errors.join("; ")}`).toEqual([]);
    });
  }
});
