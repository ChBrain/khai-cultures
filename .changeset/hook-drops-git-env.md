---
---

The pre-push hook runs the suite, and git exports GIT_DIR into every hook it
runs. The suite's migration tests build scratch repositories to prove the
ratchets on, and with GIT_DIR inherited their `init` and `commit` acted on the
real repository: two scratch commits landed on the branch being pushed and the
checkout was flipped to bare. The hook drops the git environment before the
gates, and the scratch helper drops it again on its own. Ships nothing.
