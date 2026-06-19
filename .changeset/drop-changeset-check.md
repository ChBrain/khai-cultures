---
---

Drop the khai-changeset-check CI job, mirroring the HC Andersen house: the
changeset-presence gate fails the bot-authored "Version Packages" PR (which
removes changesets while bumping the version), and it is not in the required
check set. Releases stay changesets-driven.
