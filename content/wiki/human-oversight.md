---
{
  "title": "Human oversight and decision rights",
  "description": "Defining who can authorize, interrupt, and review automated resource decisions.",
  "path": "/wiki/human-oversight/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "NIST: AI Risk Management Framework",
      "url": "https://www.nist.gov/itl/ai-risk-management-framework",
      "scope": "Voluntary AI risk management guidance."
    }
  ]
}
---
## Oversight needs an operational meaning
Human oversight is useful when it identifies a person or role, a decision they can make, and a practical way to intervene. A dashboard alone does not establish that somebody can stop an action or restore an acceptable state.

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) provides voluntary guidance for managing AI risks. Applying it to a resource-management system requires context; citing it does not demonstrate compliance or certification.

## Define the delegated scope
As an editorial design checklist, document:

- Which resources and actions the system may control.
- The limits on amount, duration, and frequency.
- Which actions need approval before execution.
- Who can pause the system and revoke access.
- How an operator learns about a failed or incomplete action.

Separate permission from confidence. A system can be highly confident about an action it is not authorized to take.

## Escalation example
A hypothetical workflow may automatically add a small amount of reversible capacity, require approval for a larger change, and refuse to make an irreversible commitment without explicit authorization. If the approver is unavailable, the policy must specify whether to wait, retain the existing state, or follow another documented fallback.

Silence should not be interpreted as newly granted authority. This is the site's design recommendation, not a quoted NIST requirement.

## Review and learning
After a consequential event, compare the authorized action, the recorded action, and the observed outcome. Update the policy when evidence shows that an assumption was wrong. Document unresolved questions as well as successes.

Related: [agent orchestration](/wiki/agent-orchestration/), [audit trails](/wiki/audit-trails/), and [the proposed ARM framework](/framework/).
