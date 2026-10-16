# Autoscaling comparison: review packet

Status: draft; not approved for publication. AI source check performed 16 October 2026. No human expert review or cluster test is claimed.

Reader question: “What changes when I use HPA, VPA, or node autoscaling, and how can their decisions interact?” This is a distinct comparison task beneath the existing autoscaling concept page, not a synonym landing page.

## Source and claim checks

- Kubernetes autoscaling overview supports the distinction between workload and infrastructure scaling.
- HPA documentation supports replica scaling, metric types, utilization relative to requests, and the missing-request limitation. Its older `/docs/tasks/run-application/` URL redirected to the current `/docs/concepts/workloads/autoscaling/` URL; the draft cites the latter.
- VPA documentation supports separate installation and configuration-dependent eviction/in-place behavior. The draft intentionally avoids calling a particular update mode universally available.
- Node autoscaling documentation supports scheduling/request constraints, possible capacity/provisioning failures, and disruption during non-empty-node consolidation.
- The four-replica example is original hypothetical arithmetic: 250/500 = 50%; 250/1000 = 25%; aggregate requests are 4×500 and 4×1000 millicores. It does not simulate or predict an HPA result, application throughput, node count, or financial outcome.

Sources were read from the official URLs in article front matter. These are live documentation URLs, not immutable version snapshots. Recheck them at publication and when modifying implementation-specific descriptions.

## Publication checklist

1. Obtain the repository's required editorial review or an explicit owner exception; do not infer this from PR #5's separate schema approval request.
2. Confirm source accuracy and the scope of controller-interaction statements.
3. Keep `status: draft` until approved. The draft must remain absent from HTML, search index, sitemap, RSS, and `llms.txt`.
4. At publication, add `autoscaling-comparison` to the capacity-and-placement topic in `editorial/topics.json`.
5. Add one contextual parent link from the existing autoscaling article where readers choose a mechanism. Avoid repeating it in the same paragraph or adding a sitewide keyword link.
6. Retain the existing links to scheduling, observability, and cost controls. Add a return link only where it answers a reader question.
7. Run the current build, link/schema checks, and browser checks; inspect table readability at mobile width. Compare live release bytes after publishing.

No search volume or keyword-difficulty evidence has been obtained for this phrase. The priority comes from conceptual fit and a useful reader task, not an invented ranking opportunity.
