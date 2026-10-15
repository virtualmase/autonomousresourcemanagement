# ARM Portfolio Operation Skills

The portfolio operates through seven reusable skills. These are not job titles or permissionless agents. Each skill has a specific input, a bounded output, a named escalation point, and a handoff record. Together they create a cycle from evidence to published improvement without allowing unsupported claims, silent changes, or destructive cleanup.

| Skill | Purpose | Required input | Deliverable | Must not do | Primary handoff |
|---|---|---|---|---|---|
| **Researcher** | Turn a question into an evidence base. | A scoped question, target property, intended reader, and time horizon. | Source log, claims matrix, open questions, and citation-ready summary. | Invent sources, turn weak evidence into certainty, or publish conclusions directly. | Content Developer or Prototype. |
| **Content Developer** | Turn approved evidence into an original, reader-specific asset. | Research packet, property charter, audience, and publication goal. | Draft page, FAQ, field note, glossary entry, or release note with metadata and links. | Copy another property’s page, overstate claims, or use keyword repetition as a substitute for usefulness. | Maintainer for editorial review. |
| **Prototype** | Reduce uncertainty through a small, reversible demonstration. | A hypothesis, success measure, boundary, and owner. | Clickable/static prototype, experiment brief, observation log, and decision recommendation. | Treat a prototype as production, collect sensitive data unnecessarily, or claim performance not observed. | Builder or archived decision record. |
| **Builder** | Convert an accepted specification into an accessible, portable, reviewable implementation. | Approved specification, data boundary, source/asset rights, and acceptance checks. | Source-controlled code/content, tests or validation notes, deployment instructions, and rollback path. | Add hidden vendor lock-in, bypass review controls, or deploy an unreviewed risky change. | Maintainer. |
| **Grower** | Expand durable discovery and participation through useful distribution and relationship work. | Published asset, property role, measurement plan, and ethical boundary. | Channel plan, link/reference inventory, outreach draft, measurement snapshot, and next experiment. | Buy deceptive engagement, create fake reviews, duplicate material, or imply endorsement. | Researcher for learning loop. |
| **Maintainer** | Preserve correctness, availability, contributor clarity, and release discipline. | Change request, operational evidence, security signals, and governance policy. | Reviewed release, issue triage, changelog, dependency/links audit, and incident/decision record where needed. | Silently rewrite history, merge their own sensitive change without independent review, or hide a failure. | Builder, Content Developer, or Security Reviewer. |
| **Sweeper** | Remove debt, stale content, broken links, orphaned assets, and unsafe leftovers without destroying evidence. | Inventory, retention policy, owner, and rollback window. | Cleanup plan, dry-run report, approved removal list, post-change verification, and archive reference. | Delete unverified material, remove a working property merely for tidiness, or erase audit/provenance history. | Maintainer and Entity Steward. |

## Shared operating contract

Every skill invocation begins with a short record: **property, objective, accountable owner, input provenance, risk level, and success condition**. Every skill ends with a handoff record: **output location, assertions made, evidence or test results, unresolved questions, and next accountable role**.

High-risk actions require named human confirmation. These include production deployment, DNS/domain changes, publishing claims about a customer or performance, processing private material, changing a property role, deleting data, changing access controls, and approving or waiving a quality/safety decision. Skills may prepare work, but they must not replace that accountable decision.

## Standard work cycle

1. **Researcher** establishes what is known, unknown, and cited.
2. **Content Developer** or **Prototype** turns the evidence into a targeted, reversible artifact.
3. **Builder** implements approved work in portable, source-controlled form.
4. **Maintainer** reviews, releases, and records the decision.
5. **Grower** distributes useful work and returns observed learning to Researcher.
6. **Sweeper** periodically removes accumulated debt while preserving provenance and rollback ability.

The cycle is intentionally non-linear: a security finding returns work to Builder, a failed prototype returns to Researcher, and a content correction can start with Sweeper. The handoff record, not a rigid sequence, preserves accountability.
