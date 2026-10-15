---
{
  "title": "Kubernetes 1.36 expands Dynamic Resource Allocation",
  "description": "A background brief on the DRA team’s May 2026 update, with adoption questions for resource operators.",
  "path": "/news/kubernetes-136-resource-allocation/",
  "kind": "news",
  "status": "published",
  "updated": "2026-10-15",
  "published": "2026-10-15",
  "eventDate": "2026-05-07",
  "checked": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source check; no independent testing or human expert review claimed.",
  "reviewedBy": "Codex (AI source check)",
  "reviewRecord": "editorial/launch-source-checks.json",
  "sources": [
    {
      "title": "Kubernetes DRA team: Kubernetes v1.36 DRA updates",
      "url": "https://kubernetes.io/blog/2026/05/07/kubernetes-v1-36-dra-136-updates/",
      "scope": "Official publisher announcement; supports attributed changes, not independent outcome claims."
    }
  ]
}
---
## What changed
In its [7 May 2026 update](https://kubernetes.io/blog/2026/05/07/kubernetes-v1-36-dra-136-updates/), the Kubernetes DRA team described changes to Dynamic Resource Allocation in version 1.36, including feature graduations, additional capabilities, and a broader driver ecosystem. The announcement discusses specialized hardware as well as work involving CPU and memory resources.

This is background coverage of that announcement, not a claim that version 1.36 is the latest Kubernetes release.

## Why it matters
Editorial interpretation: resource operators should evaluate the exact allocation capability their workloads need, rather than treating “DRA support” as a single feature. Hardware requirements, drivers, and the maturity of individual capabilities affect what a deployment can use.

A useful evaluation question is whether an allocation request expresses the actual constraints of the workload. See [resource scheduling](/wiki/resource-scheduling/) for the distinction between eligible capacity and preferred capacity.

## Limits of the evidence
The source is a project announcement. This brief does not independently test the features, establish compatibility with a specific cluster, or substantiate performance gains. Check the documentation and feature state for the exact version and driver being evaluated.

The announcement is evidence of reported project changes, not evidence that every resource-management deployment should adopt them.
