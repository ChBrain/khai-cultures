import { describe, it, expect } from "vitest";
import { join } from "node:path";
import {
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { resolveHouse } from "@chbrain/khai-tests";
import { coverage, cultureIds as coveredCultureIds, touchedCultures } from "./company_coverage.mjs";
import { conformance, parentOf } from "./culture_conformance.mjs";
import { declared } from "./type_titles.mjs";
import { charged } from "./link_resolution.mjs";
import {
  cultures,
  cultureDir,
  productions,
  migratedGroups,
  cultureUnits,
  notCultureNote,
} from "./culture_sources.mjs";
import { hasOrigin } from "./plot_zero.mjs";
import {
  plotYear,
  LATEST,
  backwards,
  units as plotUnits,
  findings as orderFindings,
  plotNumber,
  BRACKETS,
} from "./plot_sequence.mjs";
import { flat } from "./diacritic_conformance.mjs";
import {
  groups as allGroups,
  groupIds,
  coverage as groupCoverage,
  findings as groupFindings,
  pathGroup,
} from "./group_coverage.mjs";
import { culturesDir, here, root } from "./house_support.mjs";

// The scaffold decides no content, but it does decide a KIND: whether the
// culture it writes holds ground. `--iso` used to be mandatory with the
// refusal "geo.json is not guessable", which was right about the thing that
// matters and wrong about the only shape a culture can have. Now a culture
// with no map takes `--mapless`.
//
// What is held here is the refusal, not the scaffold. A missed flag must never
// be the difference between two kinds of culture, and the three ways of
// getting it wrong all have to stop the tool BEFORE it writes: each of these
// asserts a non-zero exit and an untouched packages/ directory, and each was
// run against a version with its own guard removed and failed there.
describe("Cultures house: the scaffold will not guess whether a culture holds ground", () => {
  const cli = (...args) => {
    const before = readdirSync(join(here, "..", "packages")).length;
    let code = 0;
    let err = "";
    try {
      execFileSync("node", [join(here, "new_culture.mjs"), ...args], {
        encoding: "utf8",
        cwd: join(here, ".."),
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (e) {
      code = e.status;
      err = String(e.stderr ?? "");
    }
    // The refusal is only a refusal if nothing was written. A guard that fires
    // after mkdirSync has already left a package behind.
    expect(readdirSync(join(here, "..", "packages")).length, "refused and still wrote").toBe(
      before,
    );
    return { code, err };
  };

  it("refuses when neither --iso nor --mapless is given", () => {
    const { code, err } = cli("us_probe_neither");
    expect(code).not.toBe(0);
    expect(err).toMatch(/geo\.json is not guessable/);
    // And it says what the other shape is, or the author cannot act on it.
    expect(err).toMatch(/--mapless/);
  });

  it("refuses when both --iso and --mapless are given", () => {
    const { code, err } = cli("us_probe_both", "--iso", "US-SC", "--mapless");
    expect(code).not.toBe(0);
    expect(err).toMatch(/contradict each other/);
  });

  it("refuses --mapless when the id prefix names no host", () => {
    // The host of a mapless culture is its id prefix and nothing else can be,
    // so a prefix that resolves to no culture is a culture nesting in nothing.
    const { code, err } = cli("zz_probe_nowhere", "--mapless");
    expect(code).not.toBe(0);
    expect(err).toMatch(/--mapless needs a host/);
    expect(err).toMatch(/--parent/);
  });
});

// A culture without a map is a shape this house has defined and not yet built:
// management/orders/order_a_culture_without_a_map.md. Measured when these were
// written, 319 cultures, every one of them carrying a geo.json, so every
// assertion below runs against a fixture house and none of it against the real
// one. That is the point. The wall used to read `geo.json` for an ISO code and
// return an empty verdict when there was none, so a mapless culture was skipped
// whole and one nesting in nothing would have passed - blindness that no
// culture in the house could ever have exercised.
//
// Each of these was run against the wall as it stood before the change, and
// each failed there. A test for a branch nothing reaches is worth exactly as
// much as the fault it has been shown to catch.
describe("Cultures house: the wall sees a culture with no map", () => {
  // The smallest tree culture_sources will read as a house: the umbrella's
  // manifest declaring its collection, then a directory per culture with a
  // play. `geo` and `links` are what these tests vary.
  const fixture = (cultures) => {
    const root = mkdtempSync(join(tmpdir(), "khai-mapless-"));
    const house = join(root, "packages", "khai-cultures");
    mkdirSync(house, { recursive: true });
    // resolveHouse enumerates packages off the ROOT manifest's `workspaces`,
    // not by walking `packages/`, so a tree without one is a workspace of
    // nothing and every assertion below dies on "no cultures found".
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ name: "scratch-workspace", private: true, workspaces: ["packages/*"] }),
    );
    // One object, written into the manifest and then used to place the files,
    // so the fixture cannot disagree with itself about where its cultures live
    // - and so this file states the layout no more than the umbrella it is
    // pretending to be. `culture_sources.mjs` is the only module allowed to
    // know the shape; a fixture reads it back from what it declared.
    const collection = { dir: "cultures", key: "cultures", anchor: "play_" };
    writeFileSync(
      join(house, "package.json"),
      JSON.stringify({ name: "@chbrain/khai-cultures", khai: { collection } }),
    );
    for (const [id, { geo, links = [] }] of Object.entries(cultures)) {
      const dir = join(house, collection.dir, id);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, `play_${id}.md`), "---\nkhai: play\n---\n");
      if (geo !== undefined) writeFileSync(join(dir, "geo.json"), geo);
      writeFileSync(
        join(dir, `position_culture_${id}.md`),
        `---\nkhai: position\n---\n` +
          links.map((l) => `It belongs to [that](../${l}/position_culture_${l}.md).`).join("\n"),
      );
    }
    return root;
  };

  const withFixture = (cultures, fn) => {
    const root = fixture(cultures);
    try {
      fn(root);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  };

  it("charges a mapless culture that nests in nothing", () => {
    withFixture(
      {
        usa: { geo: '{"iso":"US"}' },
        us_gullah_geechee: {},
      },
      (root) => {
        const { blocking } = conformance("us_gullah_geechee", root);
        expect(blocking.length, "a mapless culture linking no host must not pass").toBe(1);
        expect(blocking[0]).toMatch(/hosted by "usa" and does not say so/);
      },
    );
  });

  it("clears a mapless culture that links its host", () => {
    withFixture(
      {
        usa: { geo: '{"iso":"US"}' },
        us_gullah_geechee: { links: ["usa"] },
      },
      (root) => {
        expect(conformance("us_gullah_geechee", root).blocking).toEqual([]);
      },
    );
  });

  it("refuses a mapless id whose prefix names no host", () => {
    withFixture(
      {
        usa: { geo: '{"iso":"US"}' },
        zz_nowhere: { links: ["usa"] },
      },
      (root) => {
        const { blocking } = conformance("zz_nowhere", root);
        // Linking usa is not enough: with no sidecar the id is the only thing
        // that can name a host, and "zz" names nothing this house holds.
        expect(blocking.length).toBe(1);
        expect(blocking[0]).toMatch(/must begin with the lowercased ISO country code/);
      },
    );
  });

  it("holds a two-parent id to two parents, and a one-parent id to one", () => {
    withFixture(
      {
        germany: { geo: '{"iso":"DE"}' },
        denmark: { geo: '{"iso":"DK"}' },
        de_danish_minority: { links: ["germany"] },
      },
      (root) => {
        const { blocking } = conformance("de_danish_minority", root);
        expect(blocking.length, "_minority claims a kin, so one link is not enough").toBe(1);
        expect(blocking[0]).toMatch(/links fewer than two parents/);
      },
    );
    withFixture(
      {
        germany: { geo: '{"iso":"DE"}' },
        denmark: { geo: '{"iso":"DK"}' },
        de_danish_minority: { links: ["germany", "denmark"] },
      },
      (root) => {
        expect(conformance("de_danish_minority", root).blocking).toEqual([]);
      },
    );
    // The same file without the suffix owes only the host, which is the whole
    // of the one-parent case: formed or indigenous in place, no kin to link.
    withFixture(
      {
        usa: { geo: '{"iso":"US"}' },
        us_catawba: { links: ["usa"] },
      },
      (root) => {
        expect(conformance("us_catawba", root).blocking).toEqual([]);
      },
    );
  });

  it("charges a geo.json that declares no iso instead of skipping it", () => {
    // Not a mapless culture and not a mapped one: a sidecar that says nothing
    // is the one input the router cannot read. Both shapes, because `iso()`
    // answers "" for an unreadable file exactly as it does for an empty one.
    for (const geo of ['{"iso":""}', "{ not json"]) {
      withFixture({ usa: { geo: '{"iso":"US"}' }, broken: { geo } }, (root) => {
        const { blocking } = conformance("broken", root);
        expect(blocking.length, `geo.json ${geo} must be charged`).toBe(1);
        expect(blocking[0]).toMatch(/declares no usable "iso"/);
      });
    }
  });

  it("leaves the country-level and sub-national verdicts as they were", () => {
    withFixture(
      {
        usa: { geo: '{"iso":"US"}' },
        us_south_carolina: { geo: '{"iso":"US-SC"}' },
        wrongly_named: { geo: '{"iso":"US-NC"}', links: ["usa"] },
      },
      (root) => {
        // A country-level culture nests in nothing and is asked nothing.
        expect(conformance("usa", root).blocking).toEqual([]);
        // A sub-national culture still owes its parent link...
        expect(conformance("us_south_carolina", root).blocking).toEqual([
          expect.stringMatching(/nests in "usa" and does not say so/),
        ]);
        // ...and still owes its prefix, linked parent or not.
        expect(conformance("wrongly_named", root).blocking).toEqual([
          expect.stringMatching(/must carry its parent's code/),
        ]);
      },
    );
  });

  it("does not answer one house with another house's ISO owners", () => {
    // The index behind parentOf was one map for the process, built from
    // whichever tree asked first. Every test above would have passed anyway on
    // a single cache - they would simply have been answered by the real house -
    // and this is the one that fails without the fix, which is why it is here.
    withFixture({ first: { geo: '{"iso":"US"}' } }, (a) => {
      withFixture({ second: { geo: '{"iso":"US"}' } }, (b) => {
        expect(parentOf("US", a)).toBe("first");
        expect(parentOf("US", b)).toBe("second");
        expect(parentOf("US")).toBe("usa");
      });
    });
  });
});

// The group ratchet reads groups the way the culture ratchets read cultures, and
// what runs here is the hygiene of its inputs: the gate itself needs a diff and
// runs in CI. Nineteen of twenty-one groups owe something today and that is not
// an error - the ratchet fires on what a pull request opens, so the debt shrinks
// and the house stays green. See management/orders/order_the_group_ratchet.md.
describe("Cultures house: the group ratchet reads both homes", () => {
  it("sees every group, under the umbrella and in a package", () => {
    const ids = groupIds();
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size, "a group in two places at once").toBe(ids.length);
    for (const g of migratedGroups()) expect(ids).toContain(g.id);
  });

  it("maps a path in either home back to its group", () => {
    for (const g of allGroups()) {
      const rel = g.dir.split("/packages/")[1];
      expect(pathGroup(`packages/${rel}/play_x.md`), `${g.id} in ${g.dir}`).toBe(g.id);
    }
    // Derived, never typed: a culture's path is the resolver's to know, and
    // this file is held to that by migration.test.mjs.
    const someCulture = cultures()[0];
    const cultureRel = someCulture.dir.split("/packages/")[1];
    expect(pathGroup(`packages/${cultureRel}/play_x.md`), someCulture.id).toBeNull();
    expect(pathGroup("tests/house_nesting.test.mjs")).toBeNull();
  });

  it("charges only a group's own files, never a member it points at", () => {
    // Every group names its members as package-qualified links out. If those
    // were counted, every group would owe one dead entry per member forever.
    for (const id of groupIds()) {
      const { dead } = groupCoverage(id);
      for (const f of dead) expect(f).not.toMatch(/^play_/);
    }
  });

  it("answers with the same shape for a group the house has not got", () => {
    const c = groupCoverage("no_such_group_at_all");
    for (const key of ["unlinked", "orphans", "broken", "dead", "plots"])
      expect(Array.isArray(c[key]), `coverage.${key} must be an array`).toBe(true);
    expect(groupFindings("no_such_group_at_all")).toEqual([]);
  });

  it("the four whole groups stay whole, so a regression in them is caught here", () => {
    // These four were brought up to the standard by hand before the wall
    // existed. They are the only groups that can be held at zero today, so they
    // are held here rather than only in a gate that needs a diff.
    for (const id of ["nordics", "these_islands"])
      expect(groupFindings(id), `${id}: ${groupFindings(id).join("; ")}`).toEqual([]);
  });
});

// Every ratchet in this repository - coverage, sub-national conformance, persona
// wiring - decides what to check by asking `touchedCultures` which cultures a
// pull request's changed paths belong to. It carried the prefix as a literal,
// the workspace move renamed the content root out from under it, and all three
// gates went to "no culture touched" on pull requests that added plots and
// personas. Green, and reading nothing - the same failure as an empty house,
// one function over.
//
// The prefix is now derived, and this is what holds it there: a path taken out
// of the real tree, made relative the way `git diff --name-only` prints it, and
// asserted to resolve back to the culture it came from. Move the content root
// again and this test fails, which is the whole point of writing it.
describe("Cultures house: the ratchets can still see a touched culture", () => {
  it.skipIf(!existsSync(culturesDir))("resolves a real content path back to its culture", () => {
    const id = readdirSync(culturesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort()[0];
    const file = readdirSync(join(culturesDir, id)).find((f) => f.endsWith(".md"));
    const asGitPrints = ["packages", "khai-cultures", "cultures", id, file].join("/");
    expect(
      touchedCultures([asGitPrints]),
      `a ratchet handed ${asGitPrints} saw no culture, so every ratchet is passing by checking nothing`,
    ).toEqual([id]);
  });

  it("does not claim a culture for a path outside the content root", () => {
    expect(
      touchedCultures(["tests/house_nesting.test.mjs", "packages/khai-cultures-tongues/de/x.md"]),
    ).toEqual([]);
  });

  // AND THE THREE RATCHETS MUST AGREE ON WHAT COUNTS AS TOUCHED, WHICH THEY DID
  // NOT. `company-coverage` and `subnational-conformance` both gate on
  // `authoredCultures`; `persona-wiring` gated on `touchedCultures`, and the two
  // answer differently the moment a change edits many packages without authoring
  // any of them. Adding one tongue that raises the language count bumps the
  // tongues package's count-derived version and the build rewrites the dependency
  // range in 119 packages: `touchedCultures` called that 117 touched cultures,
  // `authoredCultures` called it 0 authored and 117 spared, and the wiring gate
  // demanded two unrelated personas' mother tongues as the price of adding a
  // tongue file.
  //
  // THIS IS A SOURCE CHECK AND SAYS SO. The selection happens inside each gate,
  // against a git range, and a first draft of this test asserted
  // `authoredCultures("HEAD", "HEAD")` was empty - which is true of any repository
  // in any state and would have passed with the bug still in. What is actually
  // load-bearing is which function each gate reaches for, so that is what is
  // asserted.
  it("gates all three ratchets on what a change authored, not what it touched", () => {
    const gates = {
      "persona_wiring.mjs": readFileSync(join(here, "persona_wiring.mjs"), "utf8"),
      "company_coverage.mjs": readFileSync(join(here, "company_coverage.mjs"), "utf8"),
      "culture_conformance.mjs": readFileSync(join(here, "culture_conformance.mjs"), "utf8"),
    };
    for (const [file, src] of Object.entries(gates)) {
      const gate = src.slice(src.indexOf("function gate(base, head)"));
      expect(gate, `${file}: its gate does not ask authoredCultures`).toContain(
        "authoredCultures(base, head)",
      );
      expect(
        /\btouchedCultures\(/.test(gate.slice(0, gate.indexOf("\nfunction ") + 1 || undefined)),
        `${file}: its gate still selects cultures with touchedCultures`,
      ).toBe(false);
    }
  });

  // AND THE AUDIT LANE MUST REACH BOTH HOMES, WHICH IT DID NOT.
  // `order_the_passport.md` commissioned a second reader because "the one who
  // wrote a plot line is the one who cannot see this in it". Its extractor
  // matched `packages/khai-cultures-<id>/(plot_|play_)` and its workflow filtered
  // the same shape, so a culture still in the umbrella - one segment deeper and
  // with no hyphen suffix - matched neither. Measured when found: 795 plot files
  // across 206 umbrella cultures unseen, against 748 across 123 migrated ones
  // seen. San Marino, Hawaii and Andorra were all staged in the umbrella and the
  // lane read none of them; Andorra shipped with seven of eleven Cues a state.
  //
  // Asserted over the real tree rather than over a pattern, because the pattern
  // is what was wrong. Both a migrated culture and an umbrella one must come back
  // with plots.
  // AND IT MUST DO IT WITH NODE BUILTINS ONLY, WHICH IS A CONTRACT THAT WAS ONLY
  // EVER A COMMENT. The workflow runs the extractor on a fresh clone with no
  // `npm install` - its own step says so: "No install: the extractor uses node
  // builtins only, deliberately, so this lane cannot be broken by a registry it
  // does not need." Nothing enforced it. The first fix for the umbrella blindness
  // reached for `cultureDir` and `touchedCultures`, which pull in
  // `@chbrain/khai-tests`, and the lane died with ERR_MODULE_NOT_FOUND on the very
  // pull request it was meant to read - the one restaging the culture it had
  // failed to catch.
  //
  // Reaching for the house's own resolver is right everywhere else in this
  // repository and wrong here, which is exactly why it needs a test rather than a
  // comment.
  it("builds the passport question with node builtins only", () => {
    const src = readFileSync(join(here, "plot_line_audit.mjs"), "utf8");
    const imports = [...src.matchAll(/^import\s[^"']*["']([^"']+)["']/gm)].map((m) => m[1]);
    expect(imports.length).toBeGreaterThan(0);
    for (const spec of imports) {
      expect(
        spec.startsWith("node:"),
        `plot_line_audit.mjs imports ${spec}; the audit lane runs with no node_modules`,
      ).toBe(true);
    }
  });

  // The lane reached the reader and said it could not. The endpoint answered a
  // 302, `--fail-with-body` fails only from 400 up, so curl exited 0 and `jq`
  // died on the redirect stub `<a href="...">Found</a>.` at column 3. The step
  // now follows the redirect and reads the status itself, and this holds it
  // there - the last contract of this lane that lived in a YAML comment was
  // broken by the fix above, and comments do not run.
  it("follows a redirect and reads the status itself", () => {
    const yml = readFileSync(
      join(here, "..", ".github", "workflows", "plot-line-audit.yml"),
      "utf8",
    );
    const call = yml.slice(yml.indexOf("curl -sS"), yml.indexOf("wired=true"));
    expect(call, "the audit lane's curl call was not found").toContain("curl -sS");
    expect(/\s-L[\s\\]/.test(call), "the audit lane must follow a redirect").toBe(true);
    expect(call, "the audit lane must read the status itself").toContain("%{http_code}");
    // Curl drops the method and the body on a 301, 302 or 303 unless told not
    // to, so a followed redirect asked the reader nothing and brought back the
    // endpoint's bare `OK`.
    for (const keep of ["--post301", "--post302", "--post303"]) {
      expect(call, `the audit lane must keep the POST across a redirect (${keep})`).toContain(keep);
    }
    expect(call, "the audit lane must say where a redirect landed").toContain("%{url_effective}");
    expect(
      call.includes("--location-trusted"),
      "--location-trusted hands the token to whatever host the redirect names",
    ).toBe(false);
  });

  // `\Z` is not a JavaScript escape. The chapter reader ended `(?=^## |\Z)`,
  // which compiled to the literal letter Z, so every Cue was cut at its first
  // capital one: 63 of the house's 1,551 Cues truncated mid-sentence and 9
  // emptied outright, among them Schwyz's origin plot, which opens "Zwischen dem
  // Talkessel". The second reader was shown "(no Cue chapter)" and asked who
  // acts in it. Any culture with such a Cue holds the line.
  it("reads a Cue whole when it contains a capital Z", () => {
    const homes = [
      ...readdirSync(culturesDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => [e.name, join(culturesDir, e.name)]),
      ...productions().map((p) => [p.id, p.dir]),
    ];
    let found = null;
    for (const [id, dir] of homes) {
      for (const f of readdirSync(dir).filter((f) => f.startsWith("plot_"))) {
        const cue = /^## Cue\s*$/m.exec(readFileSync(join(dir, f), "utf8"));
        if (!cue) continue;
        const rest = readFileSync(join(dir, f), "utf8").slice(cue.index + cue[0].length);
        const body = (rest.slice(0, /^## /m.exec(rest)?.index ?? rest.length) ?? "").trim();
        const z = body.indexOf("Z");
        if (z > 0 && body.length > z + 20) {
          found = { id, tail: body.slice(z, z + 20) };
          break;
        }
      }
      if (found) break;
    }
    expect(found, "no Cue in the house contains a capital Z to hold this with").not.toBe(null);
    const out = execFileSync("node", [join(here, "plot_line_audit.mjs"), "--culture", found.id], {
      encoding: "utf8",
      cwd: join(here, ".."),
    });
    expect(
      out.includes(found.tail),
      `the audit lane cut ${found.id}'s Cue at a capital Z; it must read the chapter whole`,
    ).toBe(true);
  });

  it("builds the passport question for a culture in either home", () => {
    const umbrella = readdirSync(culturesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .find((id) => readdirSync(join(culturesDir, id)).some((f) => f.startsWith("plot_")));
    const migrated = productions().find((p) =>
      readdirSync(p.dir).some((f) => f.startsWith("plot_")),
    )?.id;
    for (const [home, id] of [
      ["umbrella", umbrella],
      ["migrated", migrated],
    ]) {
      if (!id) continue;
      const out = execFileSync("node", [join(here, "plot_line_audit.mjs"), "--culture", id], {
        encoding: "utf8",
        cwd: join(here, ".."),
      });
      expect(
        (out.match(/^### plot_/gm) ?? []).length,
        `the audit lane read no plots for ${home} culture ${id}`,
      ).toBeGreaterThan(0);
    }
  });

  // The same proof for the other home. Skipped only while there is nothing to
  // prove it on; `tests/migration.test.mjs` holds the synthetic case that runs
  // whether or not a culture has migrated yet.
  it.skipIf(productions().length === 0)(
    "resolves a real production path back to its culture",
    () => {
      const prod = productions()[0];
      const file = readdirSync(prod.dir).find((f) => f.endsWith(".md"));
      const asGitPrints = ["packages", prod.dir.split("/").pop(), file].join("/");
      expect(touchedCultures([asGitPrints])).toEqual([prod.id]);
    },
  );
});

// A unit is anything the house packs; a culture is a unit the count is taken
// over, and a migrated group is the first thing that is one without being the
// other. Every content wall used to decide what to do about that separately,
// which is to say by accident: one crashed, two reported the group as a culture
// they had checked, one never saw it. The answer is one function now, and these
// hold it there. See management/orders/order_a_group_is_not_a_culture.md.
describe("Cultures house: a group is a unit and not a culture", () => {
  it("cultureUnits splits a migrated group off from the cultures", () => {
    const groups = migratedGroups().map((g) => g.id);
    const real = coveredCultureIds().slice(0, 2);
    const { cultures: kept, notCultures } = cultureUnits([...real, ...groups]);
    expect(kept).toEqual(real);
    expect(notCultures).toEqual(groups);
  });

  it("no migrated group is in the culture list, so none can move the count", () => {
    const ids = new Set(coveredCultureIds());
    const leaked = migratedGroups()
      .map((g) => g.id)
      .filter((id) => ids.has(id));
    expect(leaked, `groups counted as cultures: ${leaked.join(", ")}`).toEqual([]);
  });

  it("notCultureNote is silent for none and names them otherwise", () => {
    expect(notCultureNote([])).toBeNull();
    const line = notCultureNote(["@scope/a", "@scope/b"]);
    expect(line).toContain("2 authored unit(s) are not cultures");
    expect(line).toContain("@scope/a, @scope/b");
  });

  // The fail-open this order was written to remove: an id with no directory
  // used to answer "yes, it has plot_00", so the wall reported a marker it
  // never looked for.
  it("plot_zero refuses an id that is not a culture instead of passing it", () => {
    expect(() => hasOrigin("no_such_culture_at_all")).toThrow(/no culture directory/);
    for (const g of migratedGroups()) expect(() => hasOrigin(g.id)).toThrow(/no culture directory/);
  });
});

// The wall that reads whether a plot line runs forwards. What runs here is the
// arithmetic and the exclusions; the gate needs a diff and runs in CI. Twenty-three
// units are out of order today and that is not an error - the ratchet fires on plot
// prose a change writes, so the count comes down as the house is walked.
// See management/orders/order_a_plot_line_runs_forwards.md.
describe("Cultures house: a plot line runs forwards", () => {
  const plot = (declared, cue) =>
    `---\nkhai: plot\ndeclared: "${declared}"\n---\n\n## Cue\n\n${cue ?? "Sin fecha."}\n\n## Action\n\nx\n`;

  it("takes the year from the declared name first, and the Cue as fallback", () => {
    expect(plotYear(plot("The Opry Founding 1925", "In 1954 something else."))).toBe(1925);
    expect(plotYear(plot("La puerta", "En agosto de 1415 la flota cruza."))).toBe(1415);
  });

  it("takes the first year, because these are written subject-first", () => {
    expect(plotYear(plot("El Estatuto de 1995", "En 1995, tras la ley de 1978."))).toBe(1995);
  });

  it("returns null for a plot that names no year, which is legitimate", () => {
    expect(plotYear(plot("Agua del aire", "El bosque peina la niebla."))).toBeNull();
  });

  // The nine plots the old four-digit pattern could not express. Each of these is
  // the shape of a real declared name in the house: a bare three-digit year, a
  // parenthesised one, and one hedged with "ca.".
  it("reads a year before 1000, which four digits could not express", () => {
    expect(plotYear(plot("La fondazione da parte di San Marino 301"))).toBe(301);
    expect(plotYear(plot("Այբուբենի ստեղծումը (405)"))).toBe(405);
    expect(plotYear(plot("Jellingstenene ca. 965"))).toBe(965);
    expect(plotYear(plot("Sin año", "Alþingi kom saman á Þingvöllum árið 930."))).toBe(930);
  });

  // Why the widening is a precedence and not just a wider pattern. Both of these
  // are real declared names, and both put a number that is not a year before the
  // year, so "first number wins" dates them 500 and 128.
  it("lets four digits outrank three in the same field, so a race is not a year", () => {
    expect(plotYear(plot("The Indianapolis 500 Inauguration 1911"))).toBe(1911);
    expect(plotYear(plot("The Route 128 Tech Boom 1970"))).toBe(1970);
  });

  // One and two digits are refused on both sides of the same coin: they can mean
  // a year without saying which century, and they can mean no year at all.
  it("refuses one and two digits, which never say which century", () => {
    expect(plotYear(plot("Mai 68"))).toBeNull();
    expect(plotYear(plot("Kovo 11"))).toBeNull();
    expect(plotYear(plot("Sin año", "Eran 60 hombres en el naufragio."))).toBeNull();
  });

  // The bound is what keeps the widening from reading counts as years, and the
  // year after next decade is what the old bound of 2029 could not reach.
  it("reads past 2029 and stops at a stated bound", () => {
    expect(plotYear(plot("The Plan of 2030"))).toBe(2030);
    expect(plotYear(plot(`El plan de ${LATEST}`))).toBe(LATEST);
    expect(plotYear(plot(`El plan de ${LATEST + 1}`))).toBeNull();
    expect(plotYear(plot("Sin año", "Vinieron 3000 personas al puerto."))).toBeNull();
  });

  // Asked of the house and not of a fabricated string, because the point of the
  // widening is that these years are really in the corpus. If the pattern is ever
  // narrowed back, this is the test that goes red - the fabricated ones above
  // would keep passing against a reader that no file exercises.
  it("finds pre-1000 years in the house itself, not only in test strings", () => {
    const early = [...plotUnits().values()].flat().filter((r) => r.year < 1000);
    expect(early.length).toBeGreaterThanOrEqual(9);
    expect(early.every((r) => /^plot_\d{2}_/.test(r.file.split("/").pop()))).toBe(true);
  });

  it("holds the origin and the present outside the chronology", () => {
    expect(BRACKETS.has(0)).toBe(true);
    expect(BRACKETS.has(99)).toBe(true);
    expect(BRACKETS.has(1)).toBe(false);
  });

  it("allows two plots in the same year, and refuses a year that goes backwards", () => {
    const rows = (...ys) => ys.map((y, i) => ({ n: i + 1, year: y, file: `plot_0${i + 1}_x.md` }));
    expect(backwards(rows(1900, 1900, 1901))).toEqual([]);
    expect(backwards(rows(1900, 1901, 1902))).toEqual([]);
    expect(backwards(rows(1496, 1492))).toHaveLength(1);
    expect(backwards(rows(1861, 1745, 2006))).toHaveLength(1);
  });

  it("walks directories, so cultures, groups and packages all reach it", () => {
    const all = plotUnits();
    expect(all.size).toBeGreaterThan(200);
    const keys = [...all.keys()].join("\n");
    expect(keys).toMatch(/packages\/khai-cultures\/cultures\//); // umbrella
    expect(keys).toMatch(/packages\/khai-cultures-[a-z]/); // migrated package
  });

  // This asserted a census on its first draft - "es_canary_islands is among the
  // offenders" - and then the next change fixed es_canary_islands and the test
  // failed. A wall's tests must hold its CONTRACT, which does not move, and not
  // its findings, which are supposed to go to zero. What is asserted here is the
  // invariant: findings() reports a unit if and only if that unit really has a
  // pair running backwards.
  it("reports a unit if and only if its dated plots run backwards", () => {
    const all = plotUnits();
    const reported = new Set(orderFindings(all).map(([u]) => u));
    for (const [unit, rows] of all) expect(reported.has(unit)).toBe(backwards(rows).length > 0);
  });

  it("counts a renumber as written, and a move that keeps its numbers as not", () => {
    expect(plotNumber("packages/x/plot_02_a.md")).toBe(2);
    expect(plotNumber("packages/x/plot_00_a.md")).toBe(0);
    expect(plotNumber("packages/x/play_x.md")).toBeNull();
    // a migration keeps the number and changes the home; a renumber does the reverse
    expect(plotNumber("cultures/es_x/plot_01_a.md")).toBe(
      plotNumber("packages/khai-cultures-es-x/plot_01_a.md"),
    );
    expect(plotNumber("x/plot_01_a.md")).not.toBe(plotNumber("x/plot_02_a.md"));
  });
});
