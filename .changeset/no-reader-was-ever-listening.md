---
---

**Nothing was listening.** This lane was written against GitHub Models, which served
inference to a workflow on the built-in `GITHUB_TOKEN` and needed no secret.
[GitHub retired GitHub Models on 30 July 2026](https://github.blog/changelog/2026-07-30-github-models-is-now-retired/) -
playground, model catalog, inference API and bring-your-own-key, for every customer,
including existing ones. That is about **eight weeks before this lane first ran**.

## Three fixes into a call nobody could answer

| what the lane reported                           | what was wrong                                                  | real bug |
| ------------------------------------------------ | --------------------------------------------------------------- | -------- |
| "could not be reached", no reason                | a 302 passed `--fail-with-body`, `jq` died on the redirect stub | yes      |
| "a reply that is not the chat-completions shape" | `-L` turned the POST into a GET                                 | yes      |
| the same, with the hops now logged               | **0 redirects. HTTP 200. Body: `OK`**                           | -        |

Each fix was correct and each one was needed. None of them could ever have produced a
reading, because the address was retired before the first one was written. The endpoint is
still up and still answers `OK`, which is exactly the shape of failure that keeps a dead
dependency looking alive: not 404, not 401, just a cheerful two letters.

## The lane ships unwired, and that is a working mode

The defaults are gone - no endpoint, no model, no built-in token, and `models: read` with
them. Unwired, the lane posts the question with every Cue extracted, and a person answers it
in about a minute per culture. `order_the_passport.md` asks for a reader who is **not the
author**, and a person is the strongest reader that description allows; a default nobody can
reach is worse than none, because it reports a failed reader instead of an unwired lane.

To wire a machine reader: `AUDIT_ENDPOINT` and `AUDIT_MODEL` as variables, `AUDIT_API_KEY`
as a secret, anything speaking the OpenAI-compatible chat-completions shape. Not the model
that writes these cultures.

## The lesson, which is the same one twice

Check that the thing exists before debugging how you are calling it. The job log that made
this visible was added by the second fix, for exactly this purpose, and it took a third run
to read what it said.
