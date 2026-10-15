---
{
  "title": "Observability for resource decisions",
  "description": "Connecting measurements to actions without mistaking telemetry for proof of correctness.",
  "path": "/wiki/observability/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "OpenTelemetry: Signals",
      "url": "https://opentelemetry.io/docs/concepts/signals/",
      "scope": "Telemetry signals used to describe system activity."
    }
  ]
}
---
## Observe the system and its decisions
Observability helps operators investigate system behavior from available evidence. [OpenTelemetry describes signals such as traces, metrics, and logs](https://opentelemetry.io/docs/concepts/signals/), which offer different views of system activity.

For resource management, an operational question is not only “what was the CPU load?” but “which measurement led to this allocation, and what happened afterward?” Connecting the decision to its inputs makes that question easier to investigate.

## A useful decision record
As editorial guidance, consider recording the resource identifier, observation time, policy version, requested change, and resulting state. Record units and measurement windows too: a point-in-time value and a ten-minute average can support different conclusions.

Separate an action request from its acknowledgement and eventual outcome. A successful API response is not necessarily evidence that a service met its objective.

## Evidence quality
A signal can be delayed, sampled, missing, or incorrectly labeled. Before using a metric to control resources, define how old it may be and how the system should behave when the data is unavailable.

For example, a hypothetical capacity controller could hold its last safe allocation and notify an operator when its demand signal becomes stale. That is one possible policy, not a universal default.

## Limits
Telemetry does not independently prove causation, security, compliance, or optimal allocation. A before-and-after cost chart can be affected by workload changes and pricing changes. Claims about an improvement should identify those conditions and the comparison baseline.

Use [audit trails](/wiki/audit-trails/) to preserve decision context and [human oversight](/wiki/human-oversight/) to define who responds when evidence is insufficient.
