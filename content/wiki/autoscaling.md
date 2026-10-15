---
{
  "title": "Autoscaling and feedback loops",
  "description": "How capacity follows demand, and why signals, limits, and recovery matter.",
  "path": "/wiki/autoscaling/",
  "kind": "wiki",
  "status": "published",
  "updated": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent expert review claimed.",
  "sources": [
    {
      "title": "Kubernetes: Autoscaling workloads",
      "url": "https://kubernetes.io/docs/concepts/workloads/autoscaling/",
      "scope": "Horizontal, vertical, and infrastructure scaling."
    },
    {
      "title": "Kubernetes: Controllers",
      "url": "https://kubernetes.io/docs/concepts/architecture/controller/",
      "scope": "Control loops and desired state."
    }
  ]
}
---
## What autoscaling changes
Autoscaling adjusts capacity in response to observed or anticipated demand. The [Kubernetes documentation distinguishes horizontal scaling, vertical scaling, and infrastructure scaling](https://kubernetes.io/docs/concepts/workloads/autoscaling/). Adding replicas, changing resources assigned to a workload, and adding nodes affect different parts of a system.

Choosing a scaling mechanism starts with the bottleneck. More application replicas may not help a saturated shared database. More node capacity may not help an application that cannot use it. Compare [resource scheduling and allocation](/wiki/resource-scheduling/) when the problem is where work can run.

## Signals and decisions
A controller compares [measurements](/wiki/observability/) with a target and requests a change. Signals might include queue age, request latency, or resource utilization. The useful signal depends on what the service is trying to achieve.

For a hypothetical batch queue, an editor's design example is: add one worker when the oldest job exceeds an agreed wait threshold, cap the worker count, and require a stable period before removing capacity. The example illustrates decision structure; it is not a tested production configuration.

## Tradeoffs to evaluate
- **Responsiveness:** a fast reaction can reduce waiting but may chase short-lived noise.
- **Stability:** frequent opposing adjustments can interrupt work or waste capacity.
- **Cost:** spare capacity can improve response time while increasing spend.
- **Availability:** a request to scale does not prove that capacity was obtained.

Review these tradeoffs together. [Cost controls](/wiki/finops-and-cost-controls/) and [observability](/wiki/observability/) make the operating consequences easier to inspect.

## Failure and recovery
Specify the response to stale metrics, failed allocations, quota exhaustion, and interrupted scale-down. Test those responses against the actual workload. A controller should not interpret missing demand data as proof that demand is zero.

The underlying loop is described in [Kubernetes controller concepts](https://kubernetes.io/docs/concepts/architecture/controller/). Applying that pattern to a particular service still requires workload-specific measurement and testing.
