#!/usr/bin/env node
// Start a culture from the canon, instead of from memory of it.
//
// Ten cultures have now arrived with the same seven defects: `Event` where the
// canon says `Action`, a play carrying `Taxonomy` and `Owner` and missing
// `Triggers`, personas with no `type`. Ten identical defect sets is not ten
// mistakes, it is one template being reused, and reading a rule does not
// overwrite a template - the corrected rules were on the base commit of every
// one of the last nine.
//
// The fix is to stop asking anyone to remember the shape. `@chbrain/khai-arch`
// has shipped `templates` for all nine types the whole time - complete files,
// right chapters, right order, right frontmatter. This stamps them.
//
//   node tests/new_culture.mjs <id> --iso <CODE> [--parent <culture>]
//   node tests/new_culture.mjs <id> --add plot:die_trennung_1833
//   node tests/new_culture.mjs <id> --add persona:fritz --add place:liestal
//
// It decides no content. It never picks how many personas a place has, which
// plots it stages or what any of them say - that is the staging, and a tool
// that guessed at it would be the template again in a new costume. It
// guarantees only that whatever you ask for arrives in the shape the canon
// requires.
import { templates } from "@chbrain/khai-arch";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  readdirSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const argv = process.argv.slice(2);
const id = argv.find((a) => !a.startsWith("--"));
const flag = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i < 0 ? null : argv[i + 1];
};
const adds = argv.reduce((a, v, i) => (argv[i - 1] === "--add" ? [...a, v] : a), []);
if (!id || !/^[a-z0-9_]+$/.test(id)) {
  console.error(
    "usage: node tests/new_culture.mjs <id> --iso <CODE> [--parent <culture>] [--add <type>:<name>]",
  );
  process.exit(2);
}

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const pkgName = `@chbrain/khai-cultures-${id.replace(/_/g, "-")}`;
const dir = join(root, "packages", `khai-cultures-${id.replace(/_/g, "-")}`);
const today = new Date().toISOString().slice(0, 10);
const stem = id.replace(/^[a-z]{2}_/, "");
const Title = stem
  .split("_")
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(" ");
const wrote = [];

// A template, with its placeholders and its frozen stamp date filled in. The
// body prose stays: it is the canon's own account of what the chapter is for,
// and it is what the author replaces. It also means an unedited file fails
// `khai-staging` as a placeholder, which is correct - a scaffold is not a
// culture.
function stamp(type, name, title) {
  const t = templates[type];
  if (!t) {
    console.error(`no template for type "${type}" (have: ${Object.keys(templates).join(", ")})`);
    process.exit(2);
  }
  let text = t.text
    .replace(/\[title\]/g, title)
    .replace(/^(\s*)date: ".*"$/m, `$1date: "${today}"`);
  // Every chapter is marked unwritten. The template's prose is the canon's
  // account of what the chapter is FOR, which is the right thing to read and the
  // wrong thing to ship: it is long enough and plain enough that `khai-staging`
  // passes it silently, so a scaffold nobody edited would reach a pull request
  // looking green. The marker is what makes it loud. Delete it as you write the
  // chapter - while it stands, staging names the file and the chapter.
  text = text.replace(
    /\n## ([^\n]+)\n/g,
    (m) => `${m}\nTODO: write this chapter; the prose below says what it is for.\n`,
  );
  const file = join(dir, `${type}_${name}.md`);
  if (existsSync(file)) {
    console.log(`  exists  ${type}_${name}.md`);
    return;
  }
  writeFileSync(file, text);
  wrote.push(`${type}_${name}.md`);
  console.log(`  ${type.padEnd(8)} ${type}_${name}.md`);
}

if (!existsSync(dir)) {
  const iso = flag("iso");
  if (!iso) {
    console.error("a new culture needs --iso (e.g. CH-AG); geo.json is not guessable.");
    process.exit(2);
  }
  // Every dependency range the scaffold writes is read from the workspace as it
  // stands, never typed. A hardcoded `^0.27.0` against a workspace at 0.28.0 is
  // unsatisfiable -- a caret on a 0.x minor does not reach across it -- so npm
  // falls through to the registry and 404s. That is what shipped with Corsica,
  // and a typed range is wrong the moment anything it names is released again.
  // tests/migration.test.mjs catches it, but only after the package is written.
  const rangeFor = (name) => {
    for (const p of [
      join(root, "packages", name.replace("@chbrain/", "")),
      join(root, "node_modules", name),
    ]) {
      const manifest = join(p, "package.json");
      if (!existsSync(manifest)) continue;
      try {
        const { version } = JSON.parse(readFileSync(manifest, "utf8"));
        if (version) return `^${version}`;
      } catch {}
    }
    // Not resolvable here is not the scaffold's call to guess at. Say so and let
    // the author decide, rather than writing a number nothing was measured from.
    throw new Error(
      `cannot resolve ${name} from the workspace or node_modules; ` +
        "run `npm install` before scaffolding, so the range is measured and not typed",
    );
  };

  const parent = flag("parent");
  mkdirSync(dir, { recursive: true });
  console.log(`${pkgName}\n`);

  // The manifest. `production` is the culture id and `anchor` is the play file:
  // one pull request put the filename in `production`, and that single field
  // produced eight findings. `files` is not optional - without it the package
  // publishes empty and no gate says so.
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify(
      {
        name: pkgName,
        version: "0.1.0",
        description: `khai cultures: ${id}, one culture staged as a khai play.`,
        license: "SEE LICENSE IN LICENSE and LICENSE-CODE",
        repository: { type: "git", url: "git+https://github.com/ChBrain/khai-cultures.git" },
        type: "module",
        files: ["*.md", "geo.json", "coverage-waivers.json", "LICENSE", "LICENSE-CODE"],
        khai: { class: "house", production: id, anchor: `play_${stem}.md` },
        publishConfig: { registry: "https://npm.pkg.github.com", access: "public" },
        dependencies: {
          ...(parent
            ? (() => {
                const n = `@chbrain/khai-cultures-${parent.replace(/_/g, "-")}`;
                return { [n]: rangeFor(n) };
              })()
            : {}),
          "@chbrain/khai-cultures-tongues": rangeFor("@chbrain/khai-cultures-tongues"),
          "@chbrain/khai-engine-language": rangeFor("@chbrain/khai-engine-language"),
          "@chbrain/khai-engine-spine": rangeFor("@chbrain/khai-engine-spine"),
        },
      },
      null,
      2,
    ) + "\n",
  );
  writeFileSync(join(dir, "geo.json"), JSON.stringify({ iso }) + "\n");
  for (const l of ["LICENSE", "LICENSE-CODE"]) {
    const src = join(root, "packages/khai-cultures", l);
    if (existsSync(src)) copyFileSync(src, join(dir, l));
  }
  console.log(`  manifest package.json, geo.json (${iso}), licence pair`);

  stamp("play", stem, Title);
  // The pitch may not carry the play's declared name: two kinds sharing one
  // title is a display-title collision, and it caught three cultures in a row.
  stamp("pitch", stem, `${Title} Key`);

  writeFileSync(
    join(dir, "playwright_instructions.md"),
    `---
khai: instructions
title: "${id
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")}"
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.1.0
  date: "${today}"
---

# Instructions: ${id
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")}

How a Playwright wires this culture into a play. You wire by linking this
package's culture-position from your own content; nothing here is edited. Which
tongue a persona holds is the tongues package's instructions, and how well they
hold it is the language engine's. This covers only which culture they belong to.

## Human

- Decides whether a persona belongs to this culture.

## Agent

- Links this culture's \`position_culture_*.md\` from the persona that belongs here.
- Edits nothing in this package.

## Collaboration

- The Playwright wires; this package is read, never rewritten.

## Knowledge

${parent ? `- The culture-position nests on \`@chbrain/khai-cultures-${parent.replace(/_/g, "-")}/position_culture_*.md\`.` : "- The culture-position stands on its own; this is not a sub-national culture."}

## System

- Depend on \`${pkgName}\` and link by path from your content.
`,
  );
  console.log(`  instructions playwright_instructions.md`);

  // A culture carries its own README and REFERENCES, like a play, and
  // `tests/house.test.mjs` fails the culture without them. Two cultures reached
  // a pull request missing one each, both found by the gate rather than by the
  // author, so the scaffold writes them instead of leaving them to memory.
  writeFileSync(
    join(dir, "README.md"),
    `# ${id}\n\nThis package stages ${Title} for the khai content house.\n`,
  );
  // REFERENCES is where the defining question is answered and where a decision
  // to leave something unstaged is recorded, so the file arrives asking for
  // both rather than as an empty heading.
  writeFileSync(
    join(dir, "REFERENCES.md"),
    `# References

This is a creative staging; sources are generic historical encyclopedias (e.g. HLS).

## The defining question

TODO: answer it here, and delete this line.

**What defines ${Title}, and does the play stage it?** Coverage is a counter and
cannot tell you whether a play is true. Take the words the play uses about itself
in its Arc, Name, Stakes and pitch, and ask which of them appear in a plot.

Record what is deliberately NOT staged, and why, so the next hand argues with a
reason instead of asking the question again.
`,
  );
  console.log(`  front matter README.md, REFERENCES.md`);

  // The umbrella keeps the reference or the culture is unreachable to installers.
  const up = join(root, "packages/khai-cultures/package.json");
  const u = JSON.parse(readFileSync(up, "utf8"));
  u.dependencies[pkgName] = "^0.1.0";
  u.dependencies = Object.fromEntries(Object.entries(u.dependencies).sort());
  writeFileSync(up, JSON.stringify(u, null, 2) + "\n");
  console.log(`  umbrella now depends on ${pkgName}`);

  // A package that has never been published declares no bump: its manifest
  // version IS its first release. Only the umbrella takes the minor.
  const cs = join(root, ".changeset", `add-${id.replace(/_/g, "-")}.md`);
  writeFileSync(cs, `---\n"@chbrain/khai-cultures": minor\n---\n\n${Title} joins the house.\n`);
  console.log(`  changeset .changeset/add-${id.replace(/_/g, "-")}.md (umbrella minor only)`);
}

for (const a of adds) {
  const [type, name] = a.split(":");
  if (!type || !name) {
    console.error(`--add wants <type>:<name>, got "${a}"`);
    process.exit(2);
  }
  stamp(
    type,
    name,
    name
      .replace(/^\d+_/, "")
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
  );
}

const have = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
const count = (p) => have.filter((f) => f.startsWith(p)).length;
const need = [];
// What `tests/house.test.mjs` requires of a culture, asked here instead of two
// gate runs later. It listed four things while the gate checks nine, so a
// scaffold could look complete and fail on a missing type or a third plot.
for (const t of ["pitch_", "position_", "place_", "process_", "piece_"])
  if (!count(t)) need.push(`at least one ${t}*.md (--add ${t.slice(0, -1)}:<name>)`);
if (!have.some((f) => f.startsWith("position_culture_")))
  need.push("a culture-position (--add position:culture_<name>), nesting its parent's");
if (!have.some((f) => f.startsWith("plot_00")))
  need.push("a plot_00: the origin, not the founding (see orders/order_plot_zero.md)");
if (!have.some((f) => f.startsWith("plot_99"))) need.push("a plot_99: the present");
if (count("plot_") < 3) need.push(`at least three plots, the history; you have ${count("plot_")}`);
if (count("persona_") < 2)
  need.push(
    `at least two personas, each holding a position and linking a tongue with a grip on it; you have ${count("persona_")}`,
  );

console.log(`\nEvery file above is the canon's own template, prose and all. Replace the
prose: unedited, it reads as a placeholder and khai-staging says so.`);
if (need.length) {
  console.log("\nStill to stage:");
  for (const n of need) console.log(`  - ${n}`);
}
console.log(`\nThen: npm install && npm run registry && npm run gates`);
