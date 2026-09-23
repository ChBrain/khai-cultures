---
---

**`\Z` is not JavaScript.** The audit lane's chapter reader ended like this:

```js
new RegExp(`^## ${name}\n(.*?)(?=^## |\Z)`, "ms");
```

The intent was "up to the next chapter or the end of the file". JavaScript has no `\Z`
escape, so it compiled to **the literal letter Z**, and the lazy match stopped at the first
capital one in the chapter. Every Cue in the house has been read only as far as its first Z.

## Found by the lane, on the culture it was reading

On #717 the second reader was handed Thüringen's eleven Cues, and one of them said:

```
### plot_03_die_glashuette_lauscha_1597.md

**die Glashütte im Lauschetal, 1597**

(no Cue chapter)
```

The Cue is there. It begins **"Zwei Glasmacher"**. Another was cut mid-sentence at
"und keinen `Zweck`".

## Measured across the house

| plots with a Cue                | 1,551  |
| ------------------------------- | ------ |
| read whole                      | 1,479  |
| **truncated at a capital Z**    | **63** |
| **emptied, the Cue opens on Z** | **9**  |

The nine include `ch_schwyz` `plot_00`, an origin plot, and Switzerland's Gotthard. Schwyz,
before and after:

```
- (no Cue chapter)
+ Zwischen dem Talkessel unter den Mythen und dem Kloster jenseits des Etzels liegt
+ eine Alp, und beide brauchen sie. Die Leute von Schwyz sind freie Bauern ohne Herrn...
```

So for eight Swiss cultures the lane asked a second reader who acts in a Cue while showing
it no Cue at all, and for sixty-three more it asked about half a sentence. Any answer it
would have given about those was worthless, and nothing said so.

## The fix, and no end-of-input escape at all

Find the heading, take everything to the next one. No exotic regex, still node builtins only:

```js
const start = new RegExp(`^## ${name}\s*$`, "m").exec(text);
if (!start) return "";
const rest = text.slice(start.index + start[0].length);
const next = /^## /m.exec(rest);
return (next ? rest.slice(0, next.index) : rest).trim();
```

`house.test.mjs` now finds any culture in either home whose Cue carries a capital Z and
requires the lane to return the text after it. Probed by restoring the shipped regex: it
fails with _"the audit lane cut bosnia's Cue at a capital Z"_.

|                              | before | after     |
| ---------------------------- | ------ | --------- |
| Cues the lane can read whole | 1,479  | **1,551** |
| house tests                  | 1,627  | **1,628** |
