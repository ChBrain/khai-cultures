// The suite's own settings, so that running it the short way runs it the same
// way CI does.
//
// There was no config file at all, and `package.json` carried the flags on the
// `test` script instead: `vitest run --test-timeout=120000 ...`. So `npm test`
// had a two-minute timeout and a bare `npx vitest run` had vitest's default of
// five seconds - two commands for one suite, disagreeing about what a failure
// is. Two tests sit above five seconds on a slow box and below it on a fast
// one, which meant the short command reported failures that were not failures,
// and they were read as "slow container, green in CI" for five pull requests
// before anybody compared the two command lines.
//
// The timeout lives here now. It is a ceiling against a hang, not a budget any
// test is near: the slowest is the language policy, and it is measured, not
// guessed - see tests/house_language_umbrella.test.mjs.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 120000,
    exclude: ["**/node_modules/**", ".claude/**"],
  },
});
