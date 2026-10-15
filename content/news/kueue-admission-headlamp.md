---
{
  "title": "Headlamp guide separates Kueue admission from Pod scheduling",
  "description": "An October 2026 project guide illustrates why a queued workload may wait before Pod placement begins.",
  "path": "/news/kueue-admission-headlamp/",
  "kind": "news",
  "status": "published",
  "updated": "2026-10-15",
  "published": "2026-10-15",
  "eventDate": "2026-10-14",
  "checked": "2026-10-15",
  "author": "ARM Editorial",
  "review": "AI-assisted source check; no independent testing or human expert review claimed.",
  "reviewedBy": "Codex (AI source check)",
  "reviewRecord": "editorial/launch-source-checks.json",
  "sources": [
    {
      "title": "Kubernetes project blog: Tracing Kueue admission with Headlamp",
      "url": "https://kubernetes.io/blog/2026/10/14/tracing-kueue-admission-with-headlamp/",
      "scope": "Project-authored guide; supports the described troubleshooting distinction and plugin limitations."
    }
  ],
  "concepts": [
    "/wiki/resource-scheduling/",
    "/wiki/observability/"
  ]
}
---
## What changed
A [14 October 2026 Kubernetes project guide](https://kubernetes.io/blog/2026/10/14/tracing-kueue-admission-with-headlamp/) describes investigating Kueue admission through Headlamp. It distinguishes the decision to admit a workload under queue policy and quota from the later placement of Pods on nodes.

The guide uses the Kueue plugin’s `0.1.0-alpha` release. It describes read-only Kueue views, while noting that Headlamp’s standard resource actions remain subject to the user’s permissions.

## Why it matters
Editorial interpretation: diagnosing a resource delay starts with locating the decision that is waiting. A workload that has not been admitted needs a different investigation from one whose Pods cannot find eligible nodes.

This distinction can prevent an operator from treating every pending job as a shortage of physical capacity. See [resource scheduling](/wiki/resource-scheduling/) and [observability](/wiki/observability/) for related concepts.

## Limits of the evidence
This is a summary of a project-authored guide, not an independent evaluation. The plugin is identified as alpha in the source. This brief does not test compatibility, measure troubleshooting speed, or establish that a particular cluster has an admission problem.

Read the original guide for prerequisites and version-specific details before applying its procedure.
