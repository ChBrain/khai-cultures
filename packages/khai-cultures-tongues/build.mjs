// The package's own build: README and REFERENCES are rendered, never hand-kept.
//
// The house learned this the expensive way. The language-position manifest was a
// table somebody maintained by hand about files it did not contain, and by the
// time anyone checked it had drifted in seventeen places. This package will hold
// 320 varieties. So the split is fixed here at one: what is derivable is derived
// from the files themselves, and what is judged is data in provenance.json,
// written by whoever did the judging.
//
//   derived   the variety list, each tongue's own `language:` and declared name,
//             the count, the ordering
//   judged    which culture wrote it, whether its prose awaits a native reader,
//             and what the reading against the mnemonic found
//
// `node build.mjs --write` renders both files; running it bare reports drift and
// exits non-zero, which is what the house test runs. The render is passed through
// prettier with the repo's own config before it is written or compared, because a
// generated file and a formatter that disagree will rewrite each other forever.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { format, resolveConfig } from "prettier";
import { countItems, deriveVersionFrom } from "@chbrain/khai-tests";

const HERE = dirname(fileURLToPath(import.meta.url));

/** The package root: what it is to hold a tongue at all. Every anchor hangs here. */
export const ROOT_FILE = "position_language.md";

/** The collection the version counts: one directory per language, each with its anchor. */
export const COLLECTION = { dir: ".", key: "tongues", anchor: "position_language_" };

/** A language directory's anchor, by convention: `de/position_language_de.md`. */
const anchorOf = (lang) => `${lang}/position_language_${lang}.md`;

/** The language directories, sorted. A directory is a language iff it holds its anchor. */
export function languages(dir = HERE) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .filter((lang) => readdirSync(join(dir, lang)).includes(`position_language_${lang}.md`))
    .sort();
}
const field = (text, key) => new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m").exec(text)?.[1] ?? "";

/**
 * Every variety in the package, with what its own file declares. `file` is the
 * path inside the package, which is also the path a culture's specifier carries.
 */
export function varieties(dir = HERE) {
  const out = [];
  for (const lang of languages(dir))
    for (const name of readdirSync(join(dir, lang)).sort()) {
      if (!name.startsWith("position_language_") || !name.endsWith(".md")) continue;
      const file = `${lang}/${name}`;
      const text = readFileSync(join(dir, file), "utf8");
      out.push({
        file,
        lang,
        anchor: file === anchorOf(lang),
        tag: name.slice("position_language_".length, -3),
        declared: field(text, "declared"),
        language: field(text, "language"),
        // The tongue -> language edge, as data rather than prose. Named for the
        // width it forbids, not for speech: every file in this package is a
        // spoken tongue simulated through writing, so `spoken` would have been
        // the wrong word. This says only that nobody acquires this one first.
        motherTongue: field(text, "mother_tongue") === "false" ? false : true,
      });
    }
  return out;
}

/**
 * The composition tree, derived. Three levels, because the shape is three levels:
 * the root is the office of holding a tongue, each language anchors beneath it,
 * and each variety hangs from its own language. khai's `anchor`/`expressions`
 * shorthand flattens to two, so the members are listed - but derived here, never
 * kept by hand, which is the mistake this file exists to prevent.
 */
export function members(dir = HERE) {
  const out = [{ file: ROOT_FILE, type: "position", parent: null }];
  for (const lang of languages(dir)) {
    out.push({ file: anchorOf(lang), type: "position", parent: ROOT_FILE });
    for (const v of varieties(dir).filter((x) => x.lang === lang && !x.anchor))
      out.push({ file: v.file, type: "position", parent: anchorOf(lang) });
  }
  return out;
}

function provenance(dir = HERE) {
  return JSON.parse(readFileSync(join(dir, "provenance.json"), "utf8"));
}

/**
 * Members with no provenance entry, and entries naming no member. Held against
 * the whole tree rather than the varieties alone, because the root and the
 * language anchors were written here rather than carried in from a culture, and
 * that is exactly the kind of thing provenance exists to record.
 */
export function provenanceGaps(dir = HERE) {
  const known = new Set(members(dir).map((m) => m.file));
  const entries = provenance(dir);
  const recorded = new Set(Object.keys(entries));
  // An entry that exists but cannot be read is worse than a missing one, because
  // the gap check goes quiet while the rendered row goes blank. Three entries sat
  // like that for four pull requests: a trailing comma in the script that wrote
  // them made each a one-element array, `e.note` came back undefined, and
  // REFERENCES.md rendered an empty cell for Bavaria, Hesse and Saxony-Anhalt.
  const unreadable = (e) =>
    !e || typeof e !== "object" || Array.isArray(e) || !String(e.note ?? "").trim();
  return [
    ...[...known].filter((f) => !recorded.has(f)).map((f) => `${f}: no entry in provenance.json`),
    ...[...recorded]
      .filter((f) => !known.has(f))
      .map((f) => `${f}: provenance for no such variety`),
    ...[...recorded]
      .filter((f) => known.has(f) && unreadable(entries[f]))
      .map((f) => `${f}: provenance entry carries no readable note`),
  ].sort();
}

export function renderReadme(dir = HERE) {
  const v = varieties(dir);
  const p = provenance(dir);
  const rows = v
    .map((x) => `| \`${x.file}\` | ${p[x.file]?.tongue ?? "?"} | \`${x.language}\` |`)
    .join("\n");
  return `# khai-cultures-tongues

The tongues of the Cultures house: one khai **position** per language variety,
carrying what a tongue does to whoever holds it, written in that tongue.

A language position is a cultural position, which is why it is worth a package.
It is simply not a country's property: nobody owns Latin, and the Holy See was
cast forty-two times only because Latin was filed there. A variety belongs to the
speech community that speaks it, so it lives here and every culture that needs it
declares a dependency and links it by package specifier, which npm can check.

A position says what the tongue does to whoever holds it: what it gives them,
what its grammar forces them to mark, what it cannot say, how it shapes the mind
that thinks in it. Where it is spoken is not one of the four.

## Status

**Under construction, and private.** The varieties arrive one at a time,
narrowest first, as the walk described in the Cultures house design record
(\`management/design/cultures-as-packages.md\`) reaches them. **${v.length} landed.**

Before this package publishes it owes the composite ceremony: the WIRES card, the
Playwright wiring guide, \`index.mjs\`, and its own language check, since a variety
leaves the reach of the house's \`validateProjectLanguages\` when it leaves
\`cultures/\`. Until then \`private: true\` keeps it out of any release.

## Contents

| Variety | Tongue | Language |
| --- | --- | --- |
${rows}

<!-- Rendered by build.mjs. Edit provenance.json or the varieties, then run \`node build.mjs --write\`. -->
`;
}

export function renderReferences(dir = HERE) {
  const p = provenance(dir);
  const rows = varieties(dir)
    .map((x) => {
      const e = p[x.file] ?? {};
      const flag = e.review === "native" ? "**The prose is flagged for native review.** " : "";
      const from = e.from ? ` Came here from \`cultures/${e.from}\`, which wrote it.` : "";
      return `| \`${x.file}\` | ${flag}${e.note ?? ""}${from} |`;
    })
    .join("\n");
  return `# Tongues: References

Each variety carries the provenance of its own prose. What is recorded here is
what travels with the file when it leaves the culture that wrote it: who wrote
it, whether a speaker of the tongue has read it, and what the reading against the
position mnemonic found when it moved.

| Variety | Provenance |
| --- | --- |
${rows}

Content is CC-BY-NC-SA, code is MIT.

<!-- Rendered by build.mjs. Edit provenance.json or the varieties, then run \`node build.mjs --write\`. -->
`;
}

/**
 * Prettier's word is final, and it must be the same word the repo's own
 * `prettier --check` says, so the parser is never named here: it is inferred from
 * the path exactly as the command line infers it. Naming it costs a round -
 * `parser: "json"` renders a package.json compactly while prettier reserves
 * `json-stringify` for that filename and expands it - and the two then rewrite
 * each other forever, which is the failure this file's header was written against.
 */
const formatAs = async (raw, path) =>
  format(raw, { ...((await resolveConfig(path)) ?? {}), filepath: path });

/**
 * The manifest with everything derivable derived: the collection the version
 * counts, the composition tree, and the version itself. The minor IS the language
 * count, the same rule the house runs on its cultures and the same code -
 * `countItems` over one directory per language, `deriveVersionFrom` to reconcile.
 * A variety added to a language that is already here moves nothing; a language
 * added moves the minor. Computed, not counted, in both directions.
 */
/**
 * The half of the persona-wiring contract this package owns: which of its
 * tongues nobody acquires first. The other half, the widths a grip can take, is
 * owned by the language engine and read from its manifest - never copied here,
 * because a rule typed in two places is a rule that will disagree with itself.
 */
export const wiring = (dir = HERE) => ({
  noMotherTongue: varieties(dir)
    .filter((v) => !v.motherTongue)
    .map((v) => v.file),
});

export async function renderManifest(dir = HERE) {
  const path = join(dir, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf8"));
  pkg.version = deriveVersionFrom(pkg.version, countItems(dir, COLLECTION));
  pkg.khai = {
    ...pkg.khai,
    collection: COLLECTION,
    members: members(dir),
    wiring: wiring(dir),
  };
  return formatAs(JSON.stringify(pkg), path);
}

const GENERATED = ["README.md", "REFERENCES.md", "package.json"];

/** The rendered file as it will sit on disk. */
export async function rendered(name, dir = HERE) {
  if (name === "package.json") return renderManifest(dir);
  return formatAs(
    name === "README.md" ? renderReadme(dir) : renderReferences(dir),
    join(dir, name),
  );
}

/** Drift between what is on disk and what the sources say it should be. */
export async function drift(dir = HERE) {
  const out = provenanceGaps(dir);
  for (const name of GENERATED) {
    if (readFileSync(join(dir, name), "utf8") !== (await rendered(name, dir)))
      out.push(
        `${name}: out of date; run \`node packages/khai-cultures-tongues/build.mjs --write\``,
      );
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--write")) {
    for (const name of GENERATED) writeFileSync(join(HERE, name), await rendered(name));
    const pkg = JSON.parse(readFileSync(join(HERE, "package.json"), "utf8"));
    console.log(
      `tongues: ${languages().length} language(s), ${varieties().length} variety(s), version ${pkg.version}`,
    );
  } else {
    const d = await drift();
    console.log(d.length ? `tongues docs: ${d.length} finding(s)` : "tongues docs: in sync");
    for (const line of d) console.log(`  ${line}`);
    process.exit(d.length ? 1 : 0);
  }
}
