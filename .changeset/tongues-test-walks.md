---
---

Teach the tongues gate to walk the package instead of listing one directory of it,
before the package grows a directory per language. Two things had to change and
both are improvements on their own. It found varieties by listing the package root,
so after the move it would have found none and passed vacuously, which is the worst
way for a gate to fail. And "no link escapes the package" was spelled as "no `../`",
which was the same thing only while the package was flat; under a directory per
language a variety linking its own anchor must write `../`. The escape is resolved
now rather than spelled, so the rule that matters is the one that is checked.
Proven against a throwaway nested copy: all 23 varieties found, a link to the
package root and to a sibling language allowed, a link out of the package and a link
to a culture package both reported. Output on today's flat layout is unchanged.
Governance only; the house ships nothing.
