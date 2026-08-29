---
---

The tongues build updates every manifest in the workspace that depends on it when
its own version moves, so the range never goes stale in the first place. The gate
that landed alongside still checks it independently, because a range can also go
stale by being written by hand. Ships nothing.
