# khai cultures: Cultures

The Cultures house: a collection of khai cultures, each modelled with khai and
its canon.

This README is the house's **Estate identity**, the production that answers for
the whole run. Every culture in `cultures/` links this house in its Estate (E); a
culture with no Estate is not yet a production.

- **`cultures/`** holds the cultures: each a full **khai play** — a theatre of
  that culture — anchored by a `play_*.md` and casting every khai type (plots
  from history, personas, positions, places, processes, pieces) under a
  Hofstede-tuned pitch. See `REFERENCES.md` for the authoring contract.
- **how it was built:** raised against the khai canon and kit, gated, and
  protected, exactly like a khai plays house but indexing a `cultures` collection
  instead of `plays`. See `AGENTS.md` at the repository root.
- **working here, human or agent:** `AGENTS.md` at the repository root is the coding
  contract, and it is vendor agnostic. Read it first. The per-tool files
  (`CLAUDE.md`, `GEMINI.md`, `PERPLEXITY.md`,
  `.github/copilot-instructions.md`) hold only that tool's own quirks and point
  back at it. This line is deliberate: a README pointer is the one route into
  the contract that does not depend on a tool discovering a file by name.

Content is CC-BY-NC-SA, code is MIT (`LICENSE`, `LICENSE-CODE`). Sources are
credited where they are in the public domain; the architecture is original work.
