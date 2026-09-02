---
khai: instructions
title: "Ch Solothurn"
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.1.0
  date: "2026-09-02"
---

# Instructions: Ch Solothurn

How a Playwright wires this culture into a play. You wire by linking this
package's culture-position from your own content; nothing here is edited. Which
tongue a persona holds is the tongues package's instructions, and how well they
hold it is the language engine's. This covers only which culture they belong to.

## Human

- Decides whether a persona belongs to this culture.

## Agent

- Links this culture's `position_culture_*.md` from the persona that belongs here.
- Edits nothing in this package.

## Collaboration

- The Playwright wires; this package is read, never rewritten.

## Knowledge

- The culture-position nests on `@chbrain/khai-cultures-switzerland/position_culture_*.md`.

## System

- Depend on `@chbrain/khai-cultures-ch-solothurn` and link by path from your content.
