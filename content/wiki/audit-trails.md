---
{
  "title": "Audit trails and decision provenance",
  "description": "Recording what was requested, authorized, executed, and observed.",
  "path": "/wiki/audit-trails/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "Kubernetes: Auditing",
      "url": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/",
      "scope": "API audit events, policy, and storage backends."
    }
  ]
}
---
## What an audit trail can establish
An audit trail records events so that a decision or action can be examined later. In a resource system, useful events include a request, its [authorization context](/wiki/human-oversight/), the attempted action, and the result.

[Kubernetes auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) provides a concrete example of configurable records for API activity. What is recorded depends on the audit policy and backend configuration.

## Design around questions
An editorial starting point is to ask whether a reviewer can determine:

1. Who or what requested the change?
2. Which policy or approval permitted it?
3. Which measurements were available at the time?
4. Was the action attempted, completed, rejected, or left uncertain?
5. What subsequent evidence confirms the outcome?

Use identifiers to connect related events. Keep the original event time distinct from the time a record was received or reviewed.

## Integrity and privacy
“Immutable” is a strong claim. Retention rules, access restrictions, integrity checks, and independent copies provide different protections. State the protections actually implemented rather than assuming that a logging product makes records tamper-proof.

Logs can also contain sensitive information. Decide what is necessary to retain, who can access it, and how long it remains useful. An exhaustive transcript is not automatically the best audit record.

## Limits
A record of an authorized request does not prove the action succeeded. A record of success does not by itself prove that the action was appropriate. Missing records can reflect a collection failure rather than the absence of activity.

Combine audit evidence with [observability](/wiki/observability/) and [human review](/wiki/human-oversight/). Claims about system reliability need tests and operational evidence beyond the existence of logs.
