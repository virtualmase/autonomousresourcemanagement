---
{
  "title": "Agent orchestration and tool access",
  "description": "Coordinating work while keeping authority, retries, and external actions explicit.",
  "path": "/wiki/agent-orchestration/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "Model Context Protocol: Architecture, 2025-06-18",
      "url": "https://modelcontextprotocol.io/specification/2025-06-18/architecture",
      "scope": "Host, client, and server responsibilities in this protocol revision."
    }
  ]
}
---
## Coordination and authority
Agent orchestration coordinates tasks, state, tools, and dependencies. Resource management enters when a workflow consumes execution slots, model calls, compute time, or [budget](/wiki/finops-and-cost-controls/).

An orchestration system may use deterministic rules, AI-assisted decisions, or a mixture. A language model's proposed action should be distinguishable from the component authorized to execute it.

## Protocols have a specific scope
The [Model Context Protocol architecture, revision 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/architecture), describes hosts, clients, and servers with distinct responsibilities. A connection to a tool server is not evidence that every possible operation is appropriate for a particular user or workflow.

Protocol support should therefore be documented separately from resource limits, permission checks, and evidence of successful execution. This article cites a specific protocol revision; consult the project's current specification when implementing.

## A bounded workflow example
Imagine an agent that proposes resizing a service. A useful separation is:

1. Collect current workload and cost evidence.
2. Produce a proposal with assumptions and an expiry time.
3. Check permitted resources, spending limits, and required approval.
4. Execute the approved action with an operation identifier.
5. Inspect the actual outcome and record failures or partial completion.

This is an editorial design example, not a required protocol workflow.

## Retries and uncertainty
A timeout can mean an action failed, succeeded, or is still running. Repeating a request without checking its status can create duplicate work or spending. Recovery design should specify how to recognize an existing operation and when to ask for human intervention.

Related reading: [human oversight](/wiki/human-oversight/), [audit trails](/wiki/audit-trails/), and the proposed [ARM working framework](/framework/).
