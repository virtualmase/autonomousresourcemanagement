# Autonomous Resource Management Multi-Property Entity Architecture

**Status:** Proposed operating model  
**Principle:** Each property is independently useful, self-canonical, and accountable for its own claims. The portfolio is an entity system, not a redirect network.

## The entity model

Autonomous Resource Management should be built as a **portfolio of distinct authority surfaces**. The objective is not to concentrate every query on one hostname, nor to manufacture authority through circular links. The objective is to publish original material that is useful to a real audience at each address, then make the relationships between those materials clear, attributable, and reviewable.

The Polkadot/Kusama analogy is useful when applied carefully: independent properties may share a family identity and collaboration infrastructure while remaining distinct systems with their own priorities, communities, and contributions. [1] The prospective portal takes inspiration from the interface role of polkadot{.js}: it makes participation and interaction legible, but it is **not** a testnet and must deliver a real participant function. [2]

| Property role | Current or proposed surface | Primary audience | Authority it earns | What it must publish | What it must never become |
|---|---|---|---|---|---|
| **Reference layer** | `autonomousresourcemanagement.com` and its public static repository | Researchers, analysts, technical readers, retrieval systems | Definitional authority for the term and its evidence base | Cited definitions, glossary, source notes, distinctions, changelog, machine-readable entity data | A disguised sales page or copy of the flagship |
| **Executive flagship** | `www.autonomousresourcemanagement.xyz` | Senior operators, institutional decision makers, prospective clients | Practical authority for accountable decision practice | Original executive operating guidance, decision records, field notes, explainers, relevant case material | A duplicate of the reference library or a generic AI landing page |
| **Agentic participation portal** | A separately named future property and open repository | Builders, contributors, partner teams, operators | Participation authority through real tools, proposals, integrations, and governed collaboration | Contributor onboarding, interface documentation, proposal records, verified integrations, status, security boundaries | A cosmetic dashboard, a “testnet” label, or a clone of either other property |
| **Evidence-Ledger product surface** | `trace` / product property when production-ready | Quality/manufacturing teams and design partners | Product authority through accountable, human-governed traceability workflows | Product documentation, security posture, pilot scope, API contract, changelog, support path | A substitute for accredited certification or autonomous quality acceptance |

## Self-canonical and discovery rules

Every indexable page must use a self-referencing canonical URL on its own hostname. No property may point a cross-domain canonical at another property, and no property may redirect merely because another property discusses a related subject. Each property receives its own sitemap, robots policy, Search Console property, analytics view, structured data, and content ownership record.

Google’s guidance on independent domains is relevant only as a warning against duplicate material: similar cross-domain content can be filtered, and cross-domain canonicalization is a consolidation mechanism rather than an entity-architecture pattern. [3] Therefore, a cross-property link must be justified by a reader’s next task—source a definition, examine executive practice, participate in a tool/workflow, or inspect a product boundary—not by an attempt to force signals between properties.

| Control | Required implementation | Evidence of compliance |
|---|---|---|
| **Independent canonicals** | Every page canonicalizes to its own exact public URL. | Automated HTML audit of `rel="canonical"` against page hostname. |
| **Original-page threshold** | Each property publishes original lead text, unique headings, distinct structured data, and material unavailable elsewhere. | Editorial provenance ledger; content-diff review before release. |
| **Bounded cross-links** | Links name the relationship and use a precise destination, such as “Definition and sources,” “Executive operating guide,” or “Participation portal.” | Link inventory with source, destination, relationship, and owner. |
| **Shared identity, not shared copy** | Schema references a common organization/entity identifier and `sameAs` relationships where truthful, while page `@id`, canonical, and purpose remain local. | Structured-data validation and source-controlled entity registry. |
| **Separated measurement** | Each property is independently verified in Search Console and measured against its own stated role. | Per-property sitemap/indexing reports and quarterly authority review. |

## Authority flow

Authority flows through **evidence, contribution, and attribution**. The reference layer may establish a term, the flagship may apply it to executive decisions, and the portal may make it operational for participants. The flow is directional but not hierarchical: each property must be credible even if a visitor never reaches the other two.

```text
Sources, definitions, and changelog ──► Reference layer
                                           │ precise citation / provenance
                                           ▼
Executive operating records ───────────► Flagship
                                           │ declared interface / proposal link
                                           ▼
Real participation, integrations ─────► Portal
                                           │ production boundary / signed record
                                           ▼
Human-governed Evidence-Ledger product ─► Product surface
```

The return links have equally precise roles: the product may link to a definition or governance explanation; the portal may link to an operating principle; the flagship may cite the reference layer. No link should imply endorsement, certification, results, or authority that has not been earned.

## Shared entity registry

Create a public, source-controlled registry in the open-source organization. It is the portfolio’s **truth layer**, not a marketing directory. Every record must have a named steward and an update cadence.

```yaml
entity:
  name: Autonomous Resource Management
  entity_id: arm-entity-v1
  purpose: A coordinated ecosystem for accountable resource decision practice.
properties:
  - id: arm-reference
    hostname: autonomousresourcemanagement.com
    role: cited definition and research reference
    canonical_policy: self
    steward_role: editorial maintainer
  - id: arm-flagship
    hostname: www.autonomousresourcemanagement.xyz
    role: executive operating model and decision practice
    canonical_policy: self
    steward_role: flagship editor
  - id: arm-portal
    hostname: to-be-assigned
    role: participant interface and contribution pathway
    canonical_policy: self
    steward_role: portal maintainer
relationships:
  - from: arm-flagship
    to: arm-reference
    type: cites-definition
  - from: arm-reference
    to: arm-flagship
    type: practical-application
  - from: arm-portal
    to: arm-flagship
    type: participant-operating-context
```

## Open-source collaboration channels

The collaboration surface should be built around GitHub so decisions, questions, and code proposals remain discoverable and attributable. GitHub Discussions is intended for open-ended direction, announcements, questions, polls, and discussion; issues are reserved for actionable work. [4] The portfolio should not depend on a transient chat channel as its source of truth.

| Channel | Home | Purpose | Moderation / response expectation |
|---|---|---|---|
| **Announcements** | GitHub Discussions, organization level | Release notes, property changes, calls for review. | Maintainers publish; comments moderated for relevance. |
| **Questions and office hours** | GitHub Discussions, organization level | Public questions about terms, architecture, and participation. | Answered or triaged by a steward; canonical answers summarized into docs. |
| **Proposals** | Portal repository Discussions | Changes to protocols, public interfaces, contribution pathways, or governance. | Proposal template, named sponsor, decision date, archived conclusion. |
| **Actionable work** | Repository Issues | Defects, documentation gaps, site changes, integration requests. | Issue forms; labels by property and risk; no open-ended debate. |
| **Code and content review** | Pull requests | Proposed changes with source, provenance, and impact statement. | Two maintainer approvals for security/policy changes. |
| **Security reports** | Private coordinated disclosure channel named in `SECURITY.md` | Vulnerabilities and sensitive incident details. | Acknowledge within stated service target; do not publish operational secrets. |

Each public repository should include `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `SECURITY.md`, `SUPPORT.md`, issue forms, and a pull-request template. GitHub supports these community health files and structured templates as a way to make the collaboration process clear before maintainers review a contribution. [5] [6]

## Non-Vite portable implementation direction

The main public properties do not require a Vite runtime. Use **plain standards-based HTML, CSS, and minimal browser JavaScript** for the reference layer and initial flagship migration. This preserves portability to GitHub Pages, Cloudflare Pages, Netlify, Vercel static output, Hostinger, or any object-storage/CDN host. Build tooling is optional and may be introduced later only if it is transparent, reproducible, and removable.

The future portal can be a separate open-source application when its real participation function is defined. It should have its own repository, security boundary, threat model, and deployment pipeline. It must not share secrets, session state, or a database with the public reference layer by default.

## 90-day rollout sequence

| Window | Outcome | Accountable owner |
|---|---|---|
| **Days 0–14** | Publish property registry; remove retired wording and unsupported claims from the reference layer; create community-health baseline; enable repository Discussions. | Entity steward and editorial maintainer |
| **Days 15–45** | Migrate the `.xyz` flagship to its own open, no-build static repository; preserve its self-canonical `.xyz` URLs; submit and monitor its own sitemap. | Flagship editor and release maintainer |
| **Days 46–90** | Select the portal hostname based on a real participation workflow; publish its charter, proposal process, and initial interaction surface. | Portal maintainer and security reviewer |

## Non-negotiable rules

1. **No forced consolidation.** A separate purchased domain is treated as an intentional property, not a spare redirect.
2. **No duplicate campaigns.** Page-level copy, structured data, and user tasks must be materially different across properties.
3. **No implied authority.** Cross-links state what they link to and why; they do not imply certification, endorsement, or a performance result.
4. **No hidden governance.** Material changes, source updates, and property-role changes receive public records in the repository.
5. **No portal theater.** The portal launches only alongside a real contribution, proposal, or accountable interaction pathway.

## References

[1] [Polkadot Wiki, *Kusama*](https://wiki.polkadot.com/learn/learn-comparisons-kusama/)

[2] [polkadot{.js}, *Developer Interface*](https://polkadot.js.org/)

[3] [Google Search Central Blog, *Handling legitimate cross-domain content duplication*](https://developers.google.com/search/blog/2009/12/handling-legitimate-cross-domain)

[4] [GitHub Docs, *About discussions*](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/about-discussions)

[5] [GitHub Docs, *Creating a default community health file*](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

[6] [GitHub Docs, *About issue and pull request templates*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
