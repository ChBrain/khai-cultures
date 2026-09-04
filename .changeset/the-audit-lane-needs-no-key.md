---
---

**The audit lane needs no secret.**

It shipped asking for an `AUDIT_API_KEY`, which was one assumption too many:
GitHub Models serves inference to a workflow against the built-in `GITHUB_TOKEN`,
given `models: read`, over the same OpenAI-compatible chat-completions shape the
lane already speaks. So the endpoint and model are defaulted and the lane runs on
a fresh clone with nothing configured at all. The secret and the two variables
remain as overrides for a house that would rather use its own gateway.

The default is not the model that writes these cultures, which is the order's
rule and the whole point of a second reader.

Copilot code review is the other keyless route and it is the wrong shape for this
question. It reviews a diff as code; this lane asks who acts in each plot's Cue,
across a whole plot line including the files a pull request did not touch, and
answers in English about prose written in Corsican, Breton and Alsatian.

If a default is ever wrong - they are GitHub's to change - the call fails, the
step is `continue-on-error`, and the lane posts the question instead of an
answer. A stale default costs a comment saying the reader could not be reached
and never a red build, which is what makes defaulting them safe. Ships nothing.
