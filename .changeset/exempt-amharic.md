---
"@chbrain/khai-cultures": patch
---

Add Amharic (am) to the khai.languages exempt list, so a culture authored in Amharic validates through the NLP fallback rather than the franc detector. This is deliberate and permanent, not a stopgap: Amharic and Tigrinya are close Ge'ez-script siblings, and franc is biased toward Tigrinya, so canonical Amharic prose (for example UDHR Article 1) reads as Tigrinya beyond the detector's margin and would false-fail if registered. The khai-language detector already documents this decision (Amharic left exempt because it false-fails to Tigrinya); the exempt entry is the correct treatment, mirroring Cape Verdean Kriolu. This unblocks staging Ethiopia in the Horn and East Africa region. No content change and no culture count change; the existing cultures still validate.
