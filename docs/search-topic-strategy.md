# Reference search and internal-link strategy

Property: autonomousresourcemanagement.com. Prepared 15 October 2026.

## Evidence and scope

This is an editorial topic plan, not a measured keyword-volume or ranking report. Ubersuggest authentication failed; the owner requested free tools instead. The public Ahrefs Keyword Generator and Semrush Keyword Search Volume Checker pages were accessible, but no keyword result dataset was obtained. Moz Explorer did not return usable content. No paid API credits were used. No traffic, difficulty, ranking, or dominance claim is made.

A public search for the full term surfaced infrastructure vendors, serverless research, reinforcement-learning papers, and networking research. This establishes a range of uses, not their relative demand or quality. Focus the reference on compute/workload allocation and accountable control first. Do not stretch the definition into staffing, capital allocation, construction, or telecom coverage without domain-specific sources and editorial capability. The search result for this domain still showed the old homepage: public search snippets are not evidence of current indexing or production parity.

## Architecture implemented

Homepage → four question-based sections in `/wiki/` → existing concept articles → relevant dated news → the concept cited in the brief. Each section has a stable fragment and original orientation text. These are sections of the existing library, not thin new category pages. Existing article URLs remain unchanged.

`editorial/topics.json` assigns every published wiki article one primary section. News `concepts` metadata requires a real contextual link in the brief; it powers up to three dated return links from each concept. The source directory links to the articles that cite each source. Breadcrumbs show the actual topic path and current page. The framework remains a clearly attributed proposal.

`npm run check` now audits rendered HTML for self-canonicals, same-origin absolute and relative links, fragments, indexable orphans, canonical URL variants, contextual article inlinks, and distance from the homepage. The three-click limit is our maintainability target, not a Google ranking rule. Current maximum is two links. The JSON report at `test-results/internal-links.json` lists each indexable route, incoming pages, contextual incoming pages, and depth. No report is published as website content.

## One primary destination per reader question

| Intent family / candidate phrasing | Current primary destination | Coverage / next work |
|---|---|---|
| autonomous resource management; what is ARM; automated resource allocation | `/wiki/autonomous-resource-management/` | Working scope and related disciplines; deepen with research distinctions. Avoid targeting the ambiguous acronym alone. |
| autoscaling; resource feedback loops; horizontal vs vertical scaling | `/wiki/autoscaling/` | Conceptual overview; comparison needs a worked example before a separate page. |
| resource scheduling; workload placement; scheduling vs scaling | `/wiki/resource-scheduling/` | Placement and constraints; suitable parent for queueing and accelerator topics. |
| FinOps; resource cost controls; budget alerts vs enforced limits | `/wiki/finops-and-cost-controls/` | Conceptual distinctions; do not imply product savings. |
| resource observability; metrics for allocation decisions; stale signals | `/wiki/observability/` | Signal quality and limitations; parent for control-loop diagnostics. |
| audit trails; resource decision provenance; allocation logs | `/wiki/audit-trails/` | Record questions and limits; parent for a reproducible example record. |
| agent orchestration; tool access; resource limits for agents | `/wiki/agent-orchestration/` | Conceptual workflow; distinguish protocol support from authorization. |
| human oversight; delegated decision rights; escalation in automation | `/wiki/human-oversight/` | Operational authority and intervention; maintain a technical reference scope. |

Synonyms belong on the same useful page when intent matches. New pages require a distinct question, substantial answer, primary sources, and at least one contextual link from an existing parent article. Do not create separate pages for every keyword variant or year.

## Prioritized expansion backlog

These are unvalidated demand hypotheses, ordered by usefulness and fit with the existing library. Proposed paths are not public links, sitemap entries, or publication promises.

| Wave | Reader question / candidate searches | Proposed destination | Required evidence and parent |
|---|---|---|---|
| 1 | HPA vs VPA vs node autoscaling; which layer changes capacity? | `/wiki/autoscaling-comparison/` | Versioned Kubernetes docs; original comparison and interaction example. Parent: autoscaling. |
| 1 | Why is a workload pending: admission, quota, or placement? | `/wiki/workload-admission/` | Kueue and scheduler docs; bounded diagnostic decision tree. Parent: scheduling. |
| 1 | CPU requests vs limits; resource quotas vs budgets | `/wiki/resource-requests-and-limits/` | Kubernetes docs; distinguish accounting, enforcement, and scheduling. Parents: scheduling and cost controls. |
| 1 | Metrics stale during autoscaling; oscillation and cooldowns | `/wiki/autoscaling-failure-modes/` | Controller docs and reproducible bounded examples. Parents: autoscaling and observability. |
| 2 | GPU scheduling; DRA vs device plugins; accelerator allocation | `/wiki/gpu-resource-allocation/` | Versioned project docs; hardware/driver constraints, no universal performance claim. Parent: scheduling. |
| 2 | AI inference budgets; token costs; agent execution limits | `/wiki/inference-resource-budgets/` | Provider accounting docs and transparent hypothetical calculation; date pricing assumptions. Parents: cost and orchestration. |
| 2 | Idempotency vs retries; uncertain execution; duplicate resource actions | `/wiki/retries-and-idempotency/` | API specifications and a reproducible example with failures. Parents: orchestration and audit trails. |
| 2 | Rightsizing vs autoscaling; capacity planning vs scaling | `/wiki/rightsizing-and-capacity-planning/` | Original workload example and documented measurement limits. Parents: autoscaling and cost. |
| 3 | Rule-based vs predictive vs reinforcement-learning allocation | `/wiki/resource-control-approaches/` | Primary papers, baseline conditions, external validity and failure cases. Parent: ARM overview. |
| 3 | Fair-share scheduling; quotas; preemption | `/wiki/scheduling-fairness/` | Scheduler documentation and explicit fairness definitions. Parent: scheduling. |
| 3 | Energy-aware allocation; carbon-aware scheduling tradeoffs | `/wiki/energy-aware-allocation/` | Primary research; measurement boundary and workload/SLO assumptions. Parent: scheduling. |
| 3 | How to evaluate autonomous resource-management software | `/wiki/evaluating-resource-management-systems/` | Neutral evaluation criteria and reproducible tests; no paid rankings or untested recommendations. Parents: overview and audit trails. |

Each wave means dependency order, not an article quota. Update existing pages when the answer fits; split only when the reader task becomes independently useful. News can surface changes but must not substitute for evergreen explanation.

## Free measurement and operating cadence

1. Establish an authorized Google Search Console baseline for the exact `.com` property: query/page, impressions, clicks, CTR, position, country, device, and indexing. Read-only reporting first; sitemap submission and other account mutations remain separate owner-authorized actions. Do not infer zero impressions when access is unavailable.
2. Use free Ahrefs/Semrush/Moz interfaces only within available access limits. Record provider, date, country, exact query, and returned result; unavailable is not zero. Public search results provide intent examples, not unbiased rankings or volume estimates. No paid API calls are needed for the link audit.
3. Every week, review query-to-page mismatches, pages receiving impressions without clicks, missing reader answers, and news candidates. Check whether queries land on the intended article before rewriting titles. Diagnose multiple pages per query by intent before calling it cannibalization.
4. Every month, inspect topic-level performance and the link report. Compare equivalent date ranges and account for seasonality and small samples. Audit source currency, corrections, and missing context alongside traffic.
5. Earn references through useful, original comparisons, reproducible examples, reviewed research notes, and expert contributions. Never use reciprocal site networks, paid editorial links, fabricated expert reviews, or mass-generated synonym pages.

Success measures: zero broken internal links/orphans; useful reader paths; sustained growth in relevant non-brand query coverage and qualified organic readership; independent citations earned by original work. No ranking or search-vertical dominance is guaranteed.

## Sources for the search implementation

- Google Search Central, [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): crawlable anchors, descriptive labels, and relevant contextual links; no ideal link-count rule.
- Google Search Central, [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): original value and trustworthy authorship rather than search-first page volume.
- [Ahrefs free Keyword Generator](https://ahrefs.com/keyword-generator) and [Semrush free Keyword Search Volume Checker](https://www.semrush.com/free-tools/keyword-search-volume-checker/): available public tools, not measured results for this site.
