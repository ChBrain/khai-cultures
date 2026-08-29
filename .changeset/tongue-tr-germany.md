---
"@chbrain/khai-cultures": patch
---

Turkish moves as the anchor it always was, and Germany becomes a package.

The four tongues before this one were each the language wearing a variety's name
and were retired, because the package already held an anchor that said the same
material better. This one is the same kind of file and the opposite case: it IS
the Turkish language, correctly written, and the package held no `tr` anchor at
all - its own frontmatter said `The Turkish Language`. So it moves rather than
retires, and no `tr_tr` variety is invented, because there is no sibling to
distinguish it from.

`tr` was germany's last blocker. `@chbrain/khai-cultures-germany` is the fifth
production package, and it unblocks fourteen of the sixteen Länder at once.

The declared range on the tongues package moves from `^0.20.0` to `^0.21.0` in
every manifest that carries it: the tongues minor is its language count, so a new
language invalidates every range that pinned the old one.
