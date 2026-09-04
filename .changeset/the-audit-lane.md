---
---

**The audit lane**, the last unchecked target of `order_the_passport.md`.

`tests/plot_line_audit.mjs` finds the culture plot lines a change touches and
builds one question about them: for each plot, who or what acts in its Cue, and
is that the state or one of its instruments.
`.github/workflows/plot-line-audit.yml` sends that question to a reader which is
not the author and posts the answer on the pull request.

It never fails a build and never scores. The order measured two mechanical
counters for this against all 322 plots in the house and both fail, so the lane
reports and a person decides.

It sends titles and Cues, never the staged prose: a model grading prose a model
wrote, in a tongue neither can verify, is a mirror, while naming who acts in a
Cue is a far lower bar. That also corrects this order's own earlier wording,
which asked for the plot line "in English" - the Cues are in the culture's tongue
and cannot be anything else. English is the answer, not the question.

The lane is useful with no secrets at all: unwired, it posts the question itself,
which anyone can paste into any model or answer by hand in a minute. Wiring it is
an `AUDIT_API_KEY` secret with `AUDIT_ENDPOINT` and `AUDIT_MODEL` variables, in
the OpenAI-compatible chat-completions shape. Fork pull requests take the unwired
path by design. Ships nothing.
