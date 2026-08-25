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

const HERE = dirname(fileURLToPath(import.meta.url));
const field = (text, key) => new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m").exec(text)?.[1] ?? "";

/** Every variety in the package, with what its own file declares. */
export function varieties(dir = HERE) {
  return readdirSync(dir)
    .filter((f) => f.startsWith("position_language_") && f.endsWith(".md"))
    .sort()
    .map((file) => {
      const text = readFileSync(join(dir, file), "utf8");
      return {
        file,
        tag: file.slice("position_language_".length, -3),
        declared: field(text, "declared"),
        language: field(text, "language"),
      };
    });
}

function provenance(dir = HERE) {
  return JSON.parse(readFileSync(join(dir, "provenance.json"), "utf8"));
}

/** Varieties with no provenance entry, and entries naming no variety. */
export function provenanceGaps(dir = HERE) {
  const known = new Set(varieties(dir).map((v) => v.file));
  const recorded = new Set(Object.keys(provenance(dir)));
  return [
    ...[...known].filter((f) => !recorded.has(f)).map((f) => `${f}: no entry in provenance.json`),
    ...[...recorded]
      .filter((f) => !known.has(f))
      .map((f) => `${f}: provenance for no such variety`),
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

/** The rendered file as it will sit on disk: prettier's word is final. */
export async function rendered(name, dir = HERE) {
  const raw = name === "README.md" ? renderReadme(dir) : renderReferences(dir);
  const config = (await resolveConfig(join(dir, name))) ?? {};
  return format(raw, { ...config, parser: "markdown" });
}

/** Drift between what is on disk and what the sources say it should be. */
export async function drift(dir = HERE) {
  const out = provenanceGaps(dir);
  for (const name of ["README.md", "REFERENCES.md"]) {
    if (readFileSync(join(dir, name), "utf8") !== (await rendered(name, dir)))
      out.push(
        `${name}: out of date; run \`node packages/khai-cultures-tongues/build.mjs --write\``,
      );
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--write")) {
    for (const name of ["README.md", "REFERENCES.md"])
      writeFileSync(join(HERE, name), await rendered(name));
    console.log(`tongues: rendered README and REFERENCES for ${varieties().length} variety(s)`);
  } else {
    const d = await drift();
    console.log(d.length ? `tongues docs: ${d.length} finding(s)` : "tongues docs: in sync");
    for (const line of d) console.log(`  ${line}`);
    process.exit(d.length ? 1 : 0);
  }
}
