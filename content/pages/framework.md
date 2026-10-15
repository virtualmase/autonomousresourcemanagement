---
{
  "title": "The ARM working framework",
  "description": "An attributed proposal for organizing decision rights, signals, recovery, escalation, and audit evidence.",
  "path": "/framework/",
  "kind": "framework",
  "status": "published",
  "updated": "2026-10-15",
  "author": "Mason Nguyen; revision assisted by AI",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "OpenTelemetry: Signals",
      "url": "https://opentelemetry.io/docs/concepts/signals/",
      "scope": "Telemetry signals used to describe system activity."
    },
    {
      "title": "NIST: AI Risk Management Framework",
      "url": "https://www.nist.gov/itl/ai-risk-management-framework",
      "scope": "Voluntary AI risk management guidance."
    }
  ]
}
---
## Status and authorship
This working framework was developed by Mason Nguyen and is maintained here as an editorial proposal. It is not an industry standard, certification scheme, or independently validated assurance model. The reference library covers established concepts separately from this synthesis.

Earlier versions of the homepage placed this framework at the center of the ARM definition. This revision gives it a dedicated location so readers can distinguish the proposal from the broader subject.

## Five design concerns
### Decision rights
Identify the principal who grants authority, the permitted actions, and the limits of delegation. The proposal recommends explicit approval for actions outside the delegated scope.

### Observable signals
Record the measurements and assumptions used in a decision. [OpenTelemetry's signal vocabulary](https://opentelemetry.io/docs/concepts/signals/) is relevant background for instrumentation, not an endorsement of this framework.

### Recoverable state
Define how interrupted work is identified and recovered. Checkpoints and durable records can help, but their guarantees depend on implementation. This framework does not promise recovery from every failure mode or zero data loss.

### Human escalation
Define the conditions that require review and the action taken while review is pending. [NIST's AI risk-management work](https://www.nist.gov/itl/ai-risk-management-framework) supplies broader context; these five concerns are not NIST's categories.

### Auditable decisions
Connect requests, permission, execution, and observed results. Use precise descriptions of retention and tamper resistance instead of assuming a log is immutable.

## Applying the proposal
For a hypothetical resource controller, write down one permitted action, one limit, its input signal, its recovery behavior, and its escalation owner. Then test a missing signal, a rejected allocation, and an uncertain result.

This exercise is an editorial method for revealing assumptions. It does not establish that a system is safe, optimal, or compliant.

## What would strengthen the framework
Independent critique, reproducible examples, failure reports, and comparisons with alternative designs would make the proposal more useful. Contributions should identify which claim they support or challenge. Use the [contribution guide](/contribute/) to propose a change.

## Related reference material
Start with [autonomous resource management](/wiki/autonomous-resource-management/), [human oversight](/wiki/human-oversight/), and [audit trails](/wiki/audit-trails/). Search visibility and structured publishing are separate concerns; they are not prerequisites for a working resource controller.
