---
---

**`migrate_culture.mjs` learns `--group`.**

DACH's move took four pull requests and a hand-written manifest. Three of those
were one-time scaffolding the next groups inherit; what was left was a hand move,
and this is it as a command.

`--group <id>` plans and performs the same move: the directory, the manifest, the
licence pair, a wiring guide written for a group, the group's own links turned
into specifiers, and the umbrella's dependency. `--groups` prints the queue the
way `--queue` prints the cultures', and it reports what everyone already knew in
one line each - eighteen groups held, `the_americas` by all thirty-five of its
members.

Four things differ from a culture and each is a fact about groups. The manifest
says `khai.group`, because the minor IS the culture count and a group carrying
the culture marker would move the number by existing. There is no `geo.json` and
no `coverage-waivers.json`, so `files` does not promise them. A group reaches its
members from one directory deeper, `../../cultures/<id>/`, so the rewrite looks
for that shape. And it cannot go until its members have gone, which is the only
blocker a group has and the ordering the whole migration runs on.

It also declares no inherited engines. A culture takes every engine the umbrella
declares because the canon expects it to field the full type set; a group takes
what its arc links and nothing else. DACH links the language engine through the
grips in its one persona and does not link the spine - hand-written that way, and
it passes every wall - so the tool reproduces that manifest rather than a fuller
one. Ships nothing.
