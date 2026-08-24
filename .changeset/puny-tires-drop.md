---
---

Fix the release workflow's changesets/action inputs. Dependabot bumped the action
from v1 to v2 in #356, and v2 renamed `version` to `version-script` and `publish`
to `publish-script`. The action fails outright under the old names rather than
falling back, so every push to main since that merge has failed the release job:
no Version Packages PR has been opened and nothing has published, while the
merges themselves stayed green because the release runs on push and gates
nothing. Tooling only; ships no package content.
