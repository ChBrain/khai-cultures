---
---

The husky hooks have never run. Not once, for anyone.

`husky` is a devDependency and `.husky/pre-push` is a file, but husky v9 installs
itself from a `prepare` script and this repository has never had one - there is
no commit in its history that adds it. So `core.hooksPath` is unset, `git` looks
in `.git/hooks/`, finds nothing, and pushes. `CLAUDE.md` has meanwhile said, as a
statement of fact, that "the husky hooks are the last gate that runs before a
push, and the one gate CI cannot repeat".

That makes #501 - which put `npm run gates` in `pre-push` - a file nobody
executed. I verified it then by running `sh .husky/pre-push` and watching it
exit 1, which proves the script works and says nothing about whether git calls
it. Eight culture branches were pushed red afterwards, from bases that contained
it. They were not bypassing anything; there was nothing to bypass.

`"prepare": "husky"` wires it. Verified the way it should have been the first
time: a real `git push` now prints the gate results before the push proceeds.

**Line endings.** Those eight branches also carry 121 CRLF findings between them,
12 to 19 each. The canon validator reports them, but only after a push and a CI
round, and `prettier` did not: `endOfLine` was `"auto"`, which preserves whatever
it finds rather than deciding. There has never been a `.gitattributes`. Now
`* text=auto eol=lf` normalises on commit and prettier writes `lf`, so the same
mistake is corrected on the way in and caught by `format:check` if it is not.
Main is 0 CRLF files out of 7,470, so nothing existing changes.
