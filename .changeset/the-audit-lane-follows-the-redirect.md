---
---

**The lane reached the second reader and reported that it could not.** #714 gave
it the ability to run; on #713 it ran, extracted all eleven of Andorra's Cues and
posted them, under this heading:

> **The second reader could not be reached**, so here is the question instead.

The reader had answered. The job log holds the whole of what went wrong:

```
AUDIT_ENDPOINT: https://models.github.ai/inference/chat/completions
jq: parse error: Invalid numeric literal at line 1, column 3
##[error]Process completed with exit code 5
```

No `curl:` line, and the step took 0.2s. So curl exited **0** - and `jq` got
something that was not JSON.

## What answers with a two character token

`--fail-with-body` fails from **400** up. A **302** passes it. Curl was not given
`-L`, so it wrote the redirect body and exited clean:

```
<a href="...">Found</a>.
```

`<a` is two characters, then a space: `jq` reports column 3. Reproduced against a
local endpoint that answers 302, byte for byte with the live log - `curl exit 0`,
`Invalid numeric literal at line 1, column 3`, `exit 5`.

## Five endpoints, against the lane's own script text

The test harness extracts the `run:` block from the workflow and runs it, so what
was measured is what ships:

| the endpoint answers | before                   | after                            |
| -------------------- | ------------------------ | -------------------------------- |
| 200 with the shape   | a reading                | a reading                        |
| **302**              | **silent death**         | **a reading**                    |
| 500                  | curl's own error         | `answered HTTP 500, not 200`     |
| 200, not JSON        | silent death             | `not the chat-completions shape` |
| 200, content `""`    | **empty reading posted** | `and an empty answer`            |

The last row is a hole this change inherited and kept until the harness found it:
`jq -r` leaves a newline for an empty string, a newline has a size, and
`[ -s answer.md ]` would have posted an empty reading as though a reader had
spoken. It tests for a non-space now.

## The token does not follow the redirect

`-L`, never `--location-trusted`. Curl drops the Authorization header when a
redirect crosses to another host, and that is the property that makes following
one safe at all; `--location-trusted` would hand the built-in token to whatever
host the redirect names.

## The comment says what the lane saw

Every outcome writes one line, and the fallback carries it:

> What the lane saw: the endpoint answered HTTP 302, not 200. The job log for
> this run holds the first bytes of the reply.

## Held by a test, because a comment does not run

That is #714's lesson, and it applied here within a day: the invariant this lane
broke was written in a comment directly above the step. `house.test.mjs` now
reads the workflow and requires the curl call to follow a redirect, to read
`%{http_code}` itself, and never to use `--location-trusted`. Probed three ways -
remove `-L`, drop the status, add `--location-trusted` - and it fails each time.

|                                    | before | after     |
| ---------------------------------- | ------ | --------- |
| endpoint answers the lane can name | 1      | **5**     |
| house tests                        | 1,626  | **1,627** |
