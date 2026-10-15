# Builder Release Governance and Rollback Control

## Scope

This document defines how a Builder release is evaluated before publication and what happens if trusted post-deployment evidence crosses a policy threshold. It applies to the planned ARM participation portal package and is intentionally **provider-neutral**: the repository can evaluate artifacts and preserve evidence, but a live monitor, deployment provider, or custom protected deployment rule must supply trusted production observations.

The policy does not permit a Builder, browser client, static page, or automated text-generation system to declare its own release safe. Each system can prepare or report evidence. Named governance roles retain approval authority.

## Gate model

| Gate | Evaluated by | Required evidence | Failure behavior | Authority retained by |
|---|---|---|---|---|
| **Property boundary** | Static governance check and Maintainer review | The target remains within its property role, has no premature cross-domain canonical, and preserves index/control boundaries. | Block merge/release artifact; record the failing check. | Property steward; Entity steward for cross-property conflicts. |
| **Implementation integrity** | Static validator and Builder check | Required portal files, no-Vite boundary, collaboration paths, and documented type system remain intact. | Block release artifact. | Builder prepares fix; Maintainer verifies it. |
| **Independent review** | Repository branch protection and pull-request review | A current independent approval attached to the reviewed source SHA. | Block merge or deployment approval. | Maintainer and property steward. |
| **Production environment** | Protected deployment environment | Named environment approval, protected branch/tag, and provider deployment record. | Deployment does not run or access environment secrets. | Deployment owner and required reviewer. |
| **Post-deployment telemetry** | Trusted monitoring/deployment signal evaluated against `ci/governance/telemetry-thresholds.json` | A measurement window, release SHA, property ID, threshold ID, correlation ID, and source-attestation reference. | Create a release hold and incident record; evaluate rollback. | Maintainer; Security Reviewer; property steward; Entity steward when property integrity is affected. |

GitHub environments can require reviewer approval before a job runs or accesses its environment secrets. They can also prevent a user from self-approving a deployment and restrict which branches/tags may deploy. [1] [2] This workflow configuration uses those controls only after a repository administrator configures the environment; merely naming an environment in YAML is not a substitute for configuring its protection rules.

## Post-deployment breach classes

The values below are **policy thresholds**, not observed production metrics. They belong in versioned source so a change to sensitivity is visible and reviewed.

| Class | Threshold | Immediate automated response | Human decision required before external rollback |
|---|---|---|---|
| **Critical availability** | Two independent synthetic probes fail within 10 minutes. | Mark the release held; create or update a public incident record without sensitive internals; block further promotion. | Confirm monitor validity, scope, known-good release SHA, and user impact. The deployment owner approves execution. |
| **High CSP violation** | One confirmed enforced Content Security Policy violation. | Mark the release held; route evidence to Security Reviewer. | Security Reviewer determines whether rollback, CSP correction, or a controlled exception is safe. |
| **High client-error burst** | Five uncaught errors across at least three privacy-preserving session identifiers within 15 minutes. | Mark the release held; route to Maintainer. | Maintainer evaluates reproducibility, error class, accessibility/user impact, and last known-good release. |
| **Critical governance-integrity mismatch** | Release SHA, property ID, approval, or rollback reference cannot be matched to the attested release. | Block further promotion; record governance failure. | Entity steward and property steward decide whether the release can remain live while the record is reconciled. |

## Rollback sequence

1. A **trusted** monitor or deployment provider sends an authenticated breach signal naming the release SHA and measurement window. A client-side script or unverified browser telemetry cannot initiate a rollback.
2. The post-deployment workflow checks the payload against the versioned threshold policy and emits a non-sensitive, correlation-linked incident record. It sets a **release hold**, which blocks additional promotion of the affected release.
3. The Maintainer validates the signal and identifies the last known-good immutable artifact or commit. The Security Reviewer joins for CSP/security incidents; the Entity steward joins for property-integrity incidents.
4. The deployment owner opens the protected rollback environment. Environment protection must require an independent reviewer, prevent self-review, restrict eligible branches/tags, and disallow administrative bypass where the repository settings make that available. [1] [2]
5. The rollback workflow checks the incident reference, affected property, requested release SHA, known-good target, and named approval. It deploys only the already-attested known-good artifact through the selected provider-specific integration.
6. The provider’s deployment status and the post-rollback monitor results are attached to the incident. The release hold is cleared only after the required reviewer records a resolution.

> **No blind auto-revert rule:** A critical alert may automatically create a release hold and rollback request. It must not silently force-push, rewrite `main`, delete records, change DNS, or release a different artifact. Those operations require the accountable approvals above.

## Minimum telemetry contract

Each trusted breach payload must include this bounded shape. The source-attestation reference points to the monitoring provider’s immutable alert/incident ID or a signed evidence record. Do not include private data, tokens, full IP addresses, raw user-agent strings, or security-report details.

```json
{
  "event_type": "portal.telemetry.threshold_breached",
  "property_id": "arm-portal",
  "release_sha": "0123456789abcdef0123456789abcdef01234567",
  "threshold_id": "synthetic_availability",
  "measurement_window": {
    "started_at": "2026-08-27T18:00:00Z",
    "ended_at": "2026-08-27T18:10:00Z"
  },
  "observed_value": 2,
  "correlation_id": "uuid",
  "source_attestation_reference": "monitor-incident-12345"
}
```

## Required repository and hosting settings

The source workflows provide deterministic checks. A repository administrator must still configure the external controls below before considering the pipeline production-ready.

| Setting | Required configuration |
|---|---|
| Branch/ruleset | Protect `main`; require the Builder Governance check and independent pull-request review; dismiss stale approvals on a new commit; block force pushes. |
| Production environment | Create `portal-production`; add the property steward/deployment owner as required reviewers; prevent self-review; limit branches/tags; disable bypass if the available plan allows it. |
| Monitor identity | Use a least-privilege GitHub App or provider integration that can emit the specific telemetry event but cannot push source or access production secrets. |
| Deployment identity | Use an environment-scoped deployment credential or OIDC trust relationship; never put long-lived provider keys in repository source. |
| Artifact provenance | Preserve source SHA, work record, validation result, dependency inventory, and rollback target in the deployment record. |
| Audit access | Give write access only to CI/deployment identities; give read access to named maintainers, property stewards, and Security Reviewers under a retention policy. |

## References

[1] [GitHub Docs, *Managing environments for deployment*](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)

[2] [GitHub Docs, *Deployments and environments*](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
