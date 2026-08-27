# Builder Governance Lab QA Record

**Reviewed:** 2026-08-27  
**Environment:** Local static browser sandbox  
**Scope:** `demos/builder-governance/`

## Initial render

The lab rendered the three-layer type system correctly: an editorial Hedvig Letters Serif decision headline, Schibsted Grotesk working explanation, and Fragment Mono trace labels. The slider displayed a 960px simulated inline width and a fixed trace token value of 10px. The specific decision/hero readouts are revalidated below after the slider-calculation correction.

The rendered control surface makes the safe-update boundary visible before execution: work record, reviewed source SHA, property, allow-listed target, semantic type preset, independent reviewer, bounded text, and four governance gates. The page also states that the local lab cannot publish, deploy, access secrets, write to GitHub, alter domains, or self-approve a change.

## Pending interaction checks

The approved update and each blocked scenario must be exercised before release. The expected results are a local applied audit event for the approved path and local blocked audit events with specific reason codes for self-review, property mismatch, and markup injection.

## Approved-path verification

The approved scenario was executed with a valid work-record ID, the known-good 40-character source SHA, `arm-portal` property scope, the allow-listed `portal-principle` target, a decision-statement preset, an independent reviewer, plain text, and all gates resolved. The lab applied only the principle text, preserved the decision typography role, changed the visible status to `REVIEWED`, and emitted a local `builder.dom_update.applied` event with a correlation ID, source SHA, author, reviewer, before/after text, and gate result.

The visible preview retained the decision/trace hierarchy after the update. The change produced no navigation, storage, repository write, deployment request, or telemetry export; the audit trace remained in browser memory only.

## Self-review block verification

The self-review scenario loaded an otherwise valid `arm-portal` update but made the Reviewer equal `builder-example`, the simulated Builder author. Execution returned `SELF_REVIEW`, emitted a local `builder.dom_update.blocked` audit event, changed the status to `BLOCKED`, and retained the previously approved principle text. This confirms that a later blocked attempt cannot overwrite a previously accepted DOM state through the local simulator.

## Fluid-type interaction verification

The simulated inline-width control was interactively moved from 960px to 907px. The displayed preview width updated without a page reload, while the portal retained its three distinct typography layers and the blocked self-review state. An implementation correction then replaced container-unit simulation with explicit lab-only preferred token values calculated from the slider; the actual portal retains its responsive `vw` tokens. The corrected numeric range is revalidated before release.

## Corrected fluid-type verification

After refresh, the 960px simulated inline width reported a 98px hero token and a 48px decision token, which match the respective lab preferred values (`960 × 10.2%` and `960 × 5%`) within normal pixel rounding. The trace token remained fixed at 10px. This confirms the corrected demonstration is driven by the slider rather than the outer browser container width.

At an intermediate simulated inline width of 907px, the same readouts changed to 93px for the hero and 45px for the decision token, while the trace token remained 10px. This matches the lab preferred values before the lower or upper `clamp()` limit applies.

At the compact 375px simulator boundary, the hero resolved to 67px and the decision statement to 45px, corresponding to their `4.2rem` and `2.8rem` lower clamp bounds after pixel rounding. The trace label remained 10px. The lower-bound test preserved the pending-review state and did not trigger any update or external operation.

## Markup-injection block verification

The markup scenario supplied `<img src=x onerror=alert('unsafe')>` to an otherwise valid change record. The executor returned `MARKUP_REJECTED` before the DOM write, emitted a local `builder.dom_update.blocked` record with the reason code, and retained the preview principle text. The demonstration never uses `innerHTML`; allowed updates use `textContent` only after all governance checks pass.
