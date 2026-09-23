---
---

**The lane followed the redirect and asked nothing.** #715 fixed the 302 that was
killing this lane; on the very next run it reported:

> What the lane saw: HTTP 200, and a reply that is not the chat-completions shape.

The job log, which #715 added for exactly this, held the reply:

```
the endpoint answered HTTP 200
--- the first 400 bytes of the reply ---
OK
```

`OK`. Not a malformed answer - **not an answer to anything**. Curl drops the
method and the body on a 301, 302 or 303 unless told otherwise, so `-L` turned
the POST into a GET, threw the question away, and fetched the endpoint's health
response. The lane then faithfully reported that the health response was not a
reading of Andorra.

## Two flags and a measurement

- `--post301 --post302 --post303`: the redirect is followed **as the request it
  was**. Still never `--location-trusted` - the token does not cross hosts.
- `%{num_redirects}` and `%{url_effective}`: **where** it landed, in the log and
  in the comment. #715 could say what came back and not where from, which is why
  this took a second run to see.

## Measured against the live failure, not a theory

The harness extracts the `run:` block from the workflow and runs it, so the two
columns are the two shipped scripts against one endpoint that answers a 302 and
serves `OK` to a GET - the live case:

| the script        | result on a 302                               |
| ----------------- | --------------------------------------------- |
| as merged in #715 | `HTTP 200, and a reply that is not the shape` |
| **this change**   | **a reading**                                 |

The other four endpoints are unchanged: 200 with the shape gives a reading, 500
and a non-JSON 200 and an empty `content` each name themselves. A failure after a
hop now says so:

```
the endpoint answered HTTP 500, not 200 (after 1 redirect(s), from http://.../moved)
```

## Held by the same test

`house.test.mjs` already required `-L`, the status read, and no
`--location-trusted`. It now also requires the three POST-preserving flags and
`%{url_effective}`. Probed by removing `--post302` and by dropping the URL from
the write-out: each fails.

|                                        | before | after |
| -------------------------------------- | ------ | ----- |
| contract lines the test holds          | 3      | **7** |
| scripts that ask the question on a 302 | 0      | **1** |
