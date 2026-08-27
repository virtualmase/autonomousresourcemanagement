# Governance

The Autonomous Resource Management entity system is governed through named roles, published property boundaries, and reviewable decisions. The purpose is to preserve clarity and accountability across independent properties—not to create a centralized editorial bottleneck.

| Role | Responsibility | Authority boundary |
|---|---|---|
| Entity steward | Maintains the public entity registry and resolves cross-property conflicts. | Cannot silently repurpose a property or override a security decision. |
| Property steward | Owns editorial quality, scope, and release decisions for one named property. | Cannot claim authority for another property or publish unsupported results. |
| Maintainer | Reviews accessible, sourced contributions and manages repository operations. | Cannot merge their own sensitive change without independent review. |
| Security reviewer | Handles vulnerability reporting and security-sensitive changes. | Does not disclose report details without a coordinated decision. |
| Contributor | Proposes corrections, sources, documentation, and code. | Does not receive publication authority by participation alone. |

Material decisions—property-role changes, domain changes, entity-registry edits, source-policy changes, security posture changes, and product-boundary claims—require a public decision record in GitHub Discussions or the repository changelog. Security incidents may use the private disclosure route described in `SECURITY.md` until a coordinated disclosure is safe.

Consensus is preferred for editorial changes. When consensus is unavailable, the relevant property steward makes a time-bounded decision with a written rationale. The entity steward resolves genuine cross-property disputes. Decisions can be revisited through a new, evidence-backed proposal.
