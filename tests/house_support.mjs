// What every house test file needs to know about where the house is.
//
// `house.test.mjs` was one file of 2350 lines and 25 describe blocks, and
// vitest parallelises across FILES, so the whole suite ran in one worker on a
// four-core box. Measured before the split: 153s wall, of which house.test.mjs
// was 103s and a single test - the language policy over 6,171 files - was 52s.
// Splitting the blocks into files is what lets the other three cores work.
//
// These constants moved here rather than being copied into each file, because
// a house that is in one place in six files is a house that will be in two
// places by next month. Nothing here decides anything; it says where to look.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cultures, MONOLITH_DIR } from "./culture_sources.mjs";

export const here = dirname(fileURLToPath(import.meta.url));

/** The umbrella package: the house's own root, not the workspace's. */
export const root = join(here, "..", "packages", "khai-cultures");

/** The workspace: the umbrella's parent, where every production package sits. */
export const workspaceRoot = join(here, "..");

/**
 * The umbrella's content directory. Taken from the resolver rather than joined
 * here: `migration.test.mjs` holds that only `culture_sources.mjs` may know the
 * shape of a culture's path, and a support module is not an exemption.
 */
export const culturesDir = MONOLITH_DIR;

/** The eight file types a complete theatre owes. */
export const REQUIRED_TYPES = [
  "play_",
  "pitch_",
  "plot_",
  "persona_",
  "position_",
  "place_",
  "process_",
  "piece_",
];

/** Every culture as `[id, dir]`, in both homes. */
export function cultureDirs() {
  return cultures().map((c) => [c.id, c.dir]);
}
