---
---

**#712 fixed the audit lane's blindness and broke its ability to run.** On the
first pull request it could finally read - #713, restaging the very culture it had
failed to catch - the lane died:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@chbrain/khai-tests'
  imported from tests/culture_sources.mjs
```

## The invariant was written down, in a comment, above the step I broke

```yaml
# No install: the extractor uses node builtins only, deliberately, so this
# lane cannot be broken by a registry it does not need.
- name: build the question
  run: node tests/plot_line_audit.mjs --base "$BASE_SHA" --head "$HEAD_SHA"
```

The extractor imported **only** `node:fs`, `node:child_process` and `node:path`.
#712's fix reached for `cultureDir` and `touchedCultures` - correct everywhere
else in this repository, and fatal here, because they resolve through
`node_modules` that this job deliberately does not install.

**Nothing enforced it.** The contract lived in a YAML comment directly above the
command it governed, and comments do not run.

## Both homes, without the house's resolver

The two path shapes are written out in the extractor again - and that is the
pattern whose earlier version caused the original blindness, so it is no longer
guarded by care:

- `house.test.mjs` asserts the extractor returns plots for a **real** umbrella
  culture and a **real** migrated one, taken from the actual tree (added in #712).
- `house.test.mjs` now also asserts **every import in the file starts with
  `node:`**. Probed by re-adding `./culture_sources.mjs`: it fails with
  _"plot_line_audit.mjs imports ./culture_sources.mjs; the audit lane runs with no
  node_modules"_.

## Verified against the condition that failed, not against a theory

A fresh `git clone` with **no `node_modules` at all**:

| version            | result                     |
| ------------------ | -------------------------- |
| as shipped in #712 | `ERR_MODULE_NOT_FOUND`     |
| this change        | **11 plots for `andorra`** |

and `de_thuringia`, migrated, still returns 3.

|                                    | before | after     |
| ---------------------------------- | ------ | --------- |
| extractor imports via node_modules | 2      | **0**     |
| cultures the lane can read         | 329    | 329       |
| house tests                        | 1,625  | **1,626** |

## Why this is not folded into #713

`#713` is the culture lane and this is governance; `branch-scope` refuses the mix,
so the failing check there cannot be cleared by porting this in. It is named on
that pull request instead, and clears once this lands.
