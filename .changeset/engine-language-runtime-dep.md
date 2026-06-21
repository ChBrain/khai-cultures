---
"@chbrain/khai-cultures": patch
---

Move `@chbrain/khai-engine-language` from devDependencies to dependencies. The language engine is content the cultures embody (reads, language positions, proxy pairs), not a dev-only tool — and engine discovery scans `node_modules`, so it was already enforced and green while sitting in the wrong section. Promoting it to a runtime dependency makes npm's production tree the single source of truth for the engines a culture runs on (spine + language), so the zip bundler can derive the engine set from the dependency graph instead of a hardcoded list. Adds a conformance guard that fails if any `@chbrain/khai-engine-*` is stranded in devDependencies.
