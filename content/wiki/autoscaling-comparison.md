---
{
  "title": "HPA vs VPA vs node autoscaling",
  "description": "Compare replica count, per-Pod resource sizing, and node capacity, with an illustrative example of how the decisions interact.",
  "path": "/wiki/autoscaling-comparison/",
  "kind": "wiki",
  "status": "draft",
  "updated": "2026-10-16",
  "author": "ARM Editorial",
  "review": "AI-assisted source synthesis; no independent testing or human expert review claimed.",
  "sources": [
    {"title": "Kubernetes: Autoscaling workloads", "url": "https://kubernetes.io/docs/concepts/workloads/autoscaling/", "scope": "The distinction between workload and infrastructure scaling."},
    {"title": "Kubernetes: Horizontal Pod Autoscaling", "url": "https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/", "scope": "Replica adjustment, metric types, and utilization relative to resource requests."},
    {"title": "Kubernetes: Vertical Pod Autoscaling", "url": "https://kubernetes.io/docs/concepts/workloads/autoscaling/vertical-pod-autoscale/", "scope": "Resource sizing, separate installation, and update behavior that depends on configuration."},
    {"title": "Kubernetes: Node autoscaling", "url": "https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/", "scope": "Provisioning and consolidation, scheduling constraints, and capacity limitations."}
  ]
}
---
## Three different decisions
HPA changes how many workload replicas are requested. VPA addresses the resources assigned to a Pod's containers. Node autoscaling changes the infrastructure available to host workloads. These mechanisms operate at different layers; they are not interchangeable settings for one optimization problem.

The [Kubernetes autoscaling overview](https://kubernetes.io/docs/concepts/workloads/autoscaling/) provides this workload-versus-infrastructure distinction. Our [autoscaling reference](/wiki/autoscaling/) explains the broader feedback-loop pattern.

| Mechanism | Decision it changes | Question to investigate first |
|---|---|---|
| Horizontal Pod Autoscaler (HPA) | Desired replica count for a scalable workload | Would additional replicas help the workload serve demand? |
| Vertical Pod Autoscaler (VPA) | Container resource sizing | Are the resources requested for each replica appropriate? |
| Node autoscaling | Available node capacity | Can the required Pods fit on eligible infrastructure? |

The final column is editorial guidance, not an installation checklist or a promise of improved performance.

## HPA: more or fewer replicas
The [HPA documentation](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/) describes a controller that adjusts workload scale from metrics. The metric and target type matter: CPU utilization relative to a request is different from a raw CPU value or an external metric.

For a utilization target, requests help define the denominator. Changing a request can therefore change the reported utilization even when measured consumption stays the same. Missing relevant requests can make that utilization undefined. HPA also needs the applicable metrics API; declaring an autoscaler does not establish that usable measurements are available.

Before adding replicas, investigate whether the bottleneck belongs to the replicas themselves. An overloaded shared dependency is a different question from insufficient application concurrency.

## VPA: resource sizing within a replica
The [VPA documentation](https://kubernetes.io/docs/concepts/workloads/autoscaling/vertical-pod-autoscale/) describes recommendations and adjustments to resource requests and limits. VPA is installed separately from the core Kubernetes API's HPA functionality.

Do not assume every adjustment happens without interruption. Update behavior depends on the VPA mode, installed components, and cluster capabilities. The documentation describes both eviction-based and in-place update mechanisms; inspect the configuration actually deployed before relying on either.

Resource recommendations are not evidence of lower bills or improved response time. Evaluate the workload after a change, and retain a way to examine or reverse an unsuitable allocation.

## Node autoscaling: somewhere for the Pods to run
[Kubernetes node autoscaling](https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/) responds to scheduling requirements and configured infrastructure constraints. Pod requests are relevant to provisioning; measured application CPU usage is not simply substituted for those requests.

Adding nodes cannot resolve every pending Pod. Compatible configurations, provisioning limits, and provider capacity still constrain what can be supplied. Use [resource scheduling and allocation](/wiki/resource-scheduling/) to distinguish an eligible placement from a preferred one.

Removal is also a workload decision: consolidating a non-empty node can involve terminating and recreating Pods. Examine the chosen autoscaler's disruption behavior before treating infrastructure reduction as consequence-free.

## Worked example: separate the quantities
This is hypothetical arithmetic, not a benchmark, HPA output prediction, or tested configuration.

Imagine four worker replicas, each requesting 500 millicores of CPU and consuming 250 millicores during a measurement window. Each uses 50% of its request. The combined CPU request is 2,000 millicores.

If each request changes to 1,000 millicores while consumption remains unchanged, the corresponding utilization becomes 25%. The combined request becomes 4,000 millicores. Neither calculation establishes that throughput improved, that a new node was needed, or that the service costs less.

The example exposes two separate effects: a sizing change can alter a utilization-based signal, and it can alter the capacity requested from the scheduler. A combined-controller design should account for both. Real controller behavior also depends on its targets, timing, other metrics, and constraints.

## Evaluate the combined system
As an editorial review aid, write down:

- Which controller changes replica count, resource requests, and infrastructure?
- Which measurements and units drive each decision?
- What happens when metrics, eligible capacity, or an approver are unavailable?
- Which limits are technical constraints, and which are actual spending controls?
- What evidence would show that a change harmed the workload?

Use [observability](/wiki/observability/) to connect decisions with outcomes and [cost controls](/wiki/finops-and-cost-controls/) to distinguish resource allowances from financial limits. This comparison does not select a universal winner or recommend a production configuration. Verify version-specific behavior against the components in your own environment.
