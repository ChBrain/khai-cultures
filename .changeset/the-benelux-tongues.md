---
---

**Step 3 for Benelux, and the largest tongue pass this house has run: seven files,
two new anchors, all byte for byte.**

| tongue  | from        | becomes         |
| ------- | ----------- | --------------- |
| `nl_nl` | netherlands | **`nl` anchor** |
| `nl_be` | belgium     | `nl_be` variety |
| `fr_be` | belgium     | `fr_be` variety |
| `fr_lu` | luxembourg  | `fr_lu` variety |
| `de_lu` | luxembourg  | `de_lu` variety |
| `pt_lu` | luxembourg  | `pt_lu` variety |
| `el_gr` | **greece**  | **`el` anchor** |

**Nothing is edited.** This pass serves three cultures at once, so the limit set at
#608 applies with force: one edited byte would author belgium, netherlands and
luxembourg together and charge all three for every dead Company element they carry,
which belongs to their own migrations. All seven land byte for byte and all three
cultures stay relink-only.

## Two anchors, and neither was invented

**`nl_nl` was never a northern variety.** Its declared name is `het Nederlands` and
every chapter is language-wide: the **-je diminutive** that tames almost any noun
into something small and familiar — _huisje_, _biertje_, _momentje_; the **scraped
throat-g** no neighbouring language pronounces quite that way; compounding on the
German pattern though less exuberant; and the scatter of **modal particles** that
carry the speaker's stance without a word of their own. Renamed to the anchor on the
`ar`/`ro`/`pt` precedent, and for the same hard reason as `ro` — `build.mjs` holds a
directory as a language **only if it holds its anchor**, so landing this as `nl_nl`
would have made an `nl/` that is not a language at all.

**`nl_be` is a genuine variety and says so in its own first line**: the same grammar
as the Dutch above the border — verb second in the main clause, final in the
subordinate, the de/het split — _and then_ its own **soft g**, a palatal breath
where the northern standard has a harder, further-back scrape. A variety describing
itself against its anchor is exactly what a variety file is for, and it now has the
anchor to hang from.

**`el_gr` is the care point again, exactly as `ro` was.** It is here because
netherlands' `persona_erasmus` links it — Erasmus read and wrote Greek and edited
the New Testament in it — and a published production carries no `../`. But **greece
is not a member of benelux and never will be**, so editing it would author a culture
nobody opened. It lands unchanged, renamed to the anchor: its declared name is
`η ελληνική γλώσσα` and its Has is the language, four cases including a vocative
still in daily use for calling someone by name. `cyprus` holds `el_cy`, which **is**
a genuine variety and now has an anchor to hang from.

**The reach that one opens is the widest in this pass.** Seventeen files across
**eight cultures** linked greece's copy — albania, bulgaria, netherlands,
north_macedonia, serbia, turkey and ukraine among them. Every one of them was
reaching into one modern state for the language of the New Testament and the
classics. They now reach an anchor by specifier.

## One variety worth naming

`pt_lu` is **the first variety in this package that a migration brought rather than
a homeland**: Portuguese of Luxembourg exists because roughly a sixth of the country
is of Portuguese descent, and it is taught in the schools of a country the language
did not start in. It hangs from the anchor portugal's file became at #614 — which is
what made it placeable at all, three pull requests later.

## Counts

**50 languages, 113 varieties, 0.50.0** — two new languages, so the minor moves by
two. **319 cultures at 0.319.0.**

Two titles are **left wrong on purpose**, both recorded: `nl` reads _the Dutch
Language_ and `el` reads _the Greek Language_. Each is corrected when its own culture
migrates, and `el`'s waits on greece, which is not in this group at all. The deferral
ledger goes from one open item to three.

Provenance: seven records, **49 insertions and 0 deletions**, no re-sort.

**All three members plan clean:**

```
belgium      belgium -> @chbrain/khai-cultures-belgium
netherlands  netherlands -> @chbrain/khai-cultures-netherlands
luxembourg   luxembourg -> @chbrain/khai-cultures-luxembourg
```
