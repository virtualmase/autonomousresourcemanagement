---
{
  "title": "Resource scheduling and allocation",
  "description": "Placement decisions, competing objectives, and the difference between capacity and usable capacity.",
  "path": "/wiki/resource-scheduling/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "Kubernetes: Scheduler",
      "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
      "scope": "Filtering and scoring nodes for Pod placement."
    },
    {
      "title": "Kubernetes: Resource quotas",
      "url": "https://kubernetes.io/docs/concepts/policy/resource-quotas/",
      "scope": "Namespace resource constraints and their scope."
    }
  ]
}
---
## What a scheduler decides
A scheduler matches work to eligible resources. It has to respect constraints before considering preferences. [Kubernetes describes filtering candidate nodes and scoring the feasible ones](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/).

Scheduling is distinct from scaling. A placement decision can rearrange work within existing capacity; a scaling decision changes available capacity. They interact, but neither alone guarantees that a workload meets its objective.

## Constraints before preferences
In a hypothetical accelerator queue, eligibility might depend on memory, device compatibility, and data location. Preferences might favor shorter completion time or lower estimated cost. An inexpensive resource that cannot run the task is not a valid choice.

Record which constraints are mandatory and which objectives can be traded off. A single “efficiency” score can conceal conflicts between throughput, fairness, latency, and expense.

## Questions for an allocation policy
1. Which workloads can wait, and for how long?
2. Can lower-priority work be interrupted without losing progress?
3. How is scarce capacity shared between teams?
4. What happens when no eligible resource exists?
5. What evidence explains a rejected or delayed allocation?

These questions are editorial design guidance. Answers need to be validated against the workload and the resource provider.

## Limits and related concepts
[Resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/) constrain resource consumption within Kubernetes namespaces. A quota should not be confused with a financial budget or a guarantee of physical availability.

Read [autoscaling](/wiki/autoscaling/) for capacity adjustments and [audit trails](/wiki/audit-trails/) for recording decisions. Evaluate allocation policies using declared workload conditions rather than unqualified utilization or savings claims.
