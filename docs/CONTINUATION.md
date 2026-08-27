# ARM Cross-Model Continuation Packet

**Audience:** Human maintainers and coding/research assistants, including Codex, Claude, Gemini, or equivalent systems.  
**Last updated:** 2026-08-27  
**Project rule:** Use this repository and the linked AI Mastery repository as the durable source of current context. Do not rely on prior chat history.

## 1. Operating objective

Build an open-source, portable **Autonomous Resource Management** ecosystem in which multiple web properties have distinct reader jobs, original content, and independent authority. The goal is durable entity and reputation architecture through useful work, accurate references, provenance, citations, accountable collaboration, and technical quality—not search manipulation or domain consolidation.

## 2. Active property map

| Property | Repository / source | Status | Reader job | Hard boundary |
|---|---|---|---|---|
| **Reference** | `virtualmase/autonomousresourcemanagement` (this repository) | Public, source active. | Definition, sources, entity records, governance, corrections. | Do not make it a sales landing page or duplicate the flagship. |
| **Executive flagship** | `flagship/` package in this repository | Source complete and validated at `a0f0c1f`; **not deployed**. Existing Vite `.xyz` source is legacy only. | High-stakes operating guidance and executive diligence. | Must remain static/no-build and self-canonical when deployed. |
| **AI Mastery learning path** | `virtualmase/ai-mastery` | Public and live at `https://virtualmase.github.io/ai-mastery/learning/autonomous-resource-management/`. | Foundation lesson and bounded practice. | Do not duplicate reference definitions or market it as an executive flagship. |
| **Virtualmase directory** | `virtualmase/virtualmase.github.io` | Public and live at `https://virtualmase.github.io/`; verified Search Console URL-prefix property. | Account-level orientation across independent public reader tasks. | It is a route map, not a canonical or content-consolidation layer. |
| **Action Boundary Brief** | `virtualmase/action-boundary-brief` | Public and live at `https://virtualmase.github.io/action-boundary-brief/`. | Pre-action boundary preparation. | It never grants authority, approves an action, or becomes a post-change record. |
| **AI Change Record** | `virtualmase/ai-change-record` | Public and live at `https://virtualmase.github.io/ai-change-record/`. | Post-change review trail for a material AI-enabled workflow change. | It never classifies risk, approves release, or replaces qualified review. |
| **Earthward Foundry field guide** | `virtualmase/earthward-foundry`, `main/public-site/` source and `gh-pages` output | Public and live at `https://virtualmase.github.io/earthward-foundry/`. | Inspect a proposed, human-governed evidence loop for one high-mix, low-volume manufacturing part family. | A separate physical-work property: no ARM reference authority, general product, public API, certification, customer outcome, metrological-traceability claim, or protected-pilot exposure. |
| **Participation portal** | `portal/` package in this repository | Source package completed; needs a separate hostname and deployment decision. | Governed contribution, proposals, capability routes, Discussions/Issues. | It is not a testnet, not a cosmetic clone, and not an autonomous authority. |
| **Legacy Vite property** | Private `virtualmase/autonomous-resource-management` | Existing Vercel-linked `.xyz` source; do not add features. | Historical/current live source only. | Do not alter without a separate owner-approved cutover plan. |

## 3. Completed releases and durable artifacts

| Area | Status | Source of truth |
|---|---|---|
| Entity/property architecture | Completed and published. | [`docs/entity-registry.yml`](entity-registry.yml), [`docs/multi-property-entity-architecture.md`](multi-property-entity-architecture.md) |
| Governance and collaboration | Completed and published. GitHub Discussions enabled; issue forms/labels added. | `GOVERNANCE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `.github/ISSUE_TEMPLATE/` |
| Capability system | Completed and published: Researcher, Content Developer, Prototype, Builder, Grower, Maintainer, Sweeper. | [`docs/capability-registry.yml`](capability-registry.yml), [`docs/portfolio-operation-skills.md`](portfolio-operation-skills.md) |
| Builder governance CI/CD | Completed and published. Static gates, telemetry release hold, approval-separated rollback. | `.github/workflows/`, `ci/governance/`, [`docs/builder-release-governance.md`](builder-release-governance.md) |
| Participation portal | Completed source package; local validated. | `portal/`, [`docs/portal-preview-qa.md`](portal-preview-qa.md) |
| Buyer/attention/trust research | Completed and published with claim boundaries and references. | [`docs/engagement-research-sources.md`](engagement-research-sources.md), [`docs/engagement-design-system.md`](engagement-design-system.md) |
| AI Mastery ARM lesson | Completed and live. | `virtualmase/ai-mastery` commit `a06f75d`; page includes Resource Observatory, Decision Rights Atlas, Trace Record, Capability Relay, bounded practice, and original Decision Threshold SVG. |
| Virtualmase root directory | Completed and live. | `virtualmase/virtualmase.github.io`; a self-canonical, static public route map with original identity assets, property/utility routes, sitemap, robots, manifest, social image, `llms.txt`, and custom 404. |
| Action Boundary Brief | Completed and live. | `virtualmase/action-boundary-brief`; model-neutral pre-action record template, validator, source notes, public walkthrough, and static project site. |
| AI Change Record | Completed and live. | `virtualmase/ai-change-record`; model-neutral material-change record template, validator, source notes, public walkthrough, and field note at `/field-notes/when-the-tool-stays-the-same/`. |
| Earthward Foundry field guide | Completed and live as a separate physical-work informational property. | `virtualmase/earthward-foundry` source commit `cd5a2a6`; static-only Pages output commit `854ff65`; original Workshop Ledger field guide, conceptual work-and-record SVG, static validator, palette audit, custom 404, no tracking/runtime dependency, and release QA record under `public-site/`. |
| Blue-ocean reader-task spine | Completed and published where properties are live; flagship and portal continuations are source-only. | [`docs/blue-ocean-content-research.md`](blue-ocean-content-research.md), [`docs/reader-task-silo-architecture.md`](reader-task-silo-architecture.md), commits `19d930c`, `32ff2cc`, `c19bc29`, `df5798f`, and `d06abe8`. |
| Executive flagship | Source complete, static/interaction validated, and published; deployment is intentionally pending owner confirmation. | [`flagship/README.md`](../flagship/README.md), [`flagship/QA.md`](../flagship/QA.md), [`flagship/CONTENT-ARCHITECTURE.md`](../flagship/CONTENT-ARCHITECTURE.md), commit `a0f0c1f` |

## 4. Never violate these decisions

| Decision | Required behavior | Rationale |
|---|---|---|
| **No forced canonical property** | Use one canonical per property, pointing only to that property’s own page URL. | Properties serve intentionally distinct audiences and contexts. |
| **No Vite or proprietary backend** | Build all new public property work in static HTML/CSS/SVG/vanilla JS. | Portability across GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, object storage, and standard shared hosting. |
| **No implicit autonomy claim** | Represent operational scope, decision rights, trace record, escalation, and accountable people. | ARM is about legible delegation, not authority erasure. |
| **No generic AI visual tropes** | Use explanatory resource/decision/record imagery with provenance and accessible labels. | Visual form must serve the operating model. |
| **No engagement capture** | Optimize for qualified reader progress and transparent next steps. | Attention is a reader resource; dark patterns undermine credibility and consumer autonomy. |
| **No external change without approval** | Separate source completion from DNS, domain, hosting, Search Console, analytics, or social actions. | Those decisions are external, potentially irreversible, and property-specific. |

## 5. Executive flagship: completed source and next safe work

The complete flagship route tree, page responsibilities, and release gates are defined in [`flagship/CONTENT-ARCHITECTURE.md`](../flagship/CONTENT-ARCHITECTURE.md). The package now includes the landing page, `/decision-rights/`, `/resource-observability/`, `/traceable-records/`, `/governed-autonomy/`, `/accountable-escalation/`, `/capability-system/`, `/faq/`, static 404, `robots.txt`, `sitemap.xml`, metadata/JSON-LD, original explanatory SVGs, a local-only trace-record verifier, and static plus interaction test scripts.

Run `node flagship/scripts/validate-static.mjs` and `node flagship/scripts/test-site-js.mjs` before changing a flagship route. The next collaborator should only choose one of these bounded paths: improve a named route with original source-backed content; add self-hosted, openly licensed type assets with provenance and fallback testing; prepare a separate portal property; or document an owner-approved deployment/cutover plan. Do not change any external domain, DNS, analytics, or hosting setup without explicit owner approval.

## 6. Reader-task spine and public utility handoff

The live connective path is: **learn the operating model** (AI Mastery) → **bound an intended action** (Action Boundary Brief) → **document a material change** (AI Change Record) → **inspect completed factual work** (public practice) → **correct or contribute through the source that owns the record**. Each link names the reader benefit; it does not confer authority or consolidate properties.

Earthward Foundry is an intentionally separate branch of the public map, not a required stage in the ARM reader journey. Route a reader there only when the question is about a proposed physical-work quality/traceability evidence loop. Its public field guide is informational; acceptance, disposition, release, and other consequential quality decisions remain human-held. Its public static release does not expose or alter the protected pilot services.

The first blue-ocean field note asks: “What changed in the workflow when the tool label stayed the same?” It distinguishes model/version, instruction, source, permission, monitor, and return-path changes. It is an explanatory, source-linked reader aid—not a materiality test, system inventory, or assurance claim. Consult [`docs/reader-task-silo-architecture.md`](reader-task-silo-architecture.md) before extending the spine.

The `https://virtualmase.github.io/` URL-prefix property is verified in Search Console through the retained root HTML verification file. It covers the root and GitHub Pages project-site paths. **No sitemap was submitted and no indexing request was made** in the verification task; do not make either external change without the owner’s explicit instruction. There is no analytics instrumentation on the root, Action Boundary Brief, AI Change Record, or Earthward Foundry sites.

## 7. Acceptance checks

| Category | Required outcome |
|---|---|
| **Static portability** | Plain static HTTP server renders every page; no npm install or build step is required. |
| **Property boundaries** | The flagship does not copy reference or AI Mastery core content; external links explain their reader benefit. |
| **Discovery** | Every production route has a title, description, correct self-canonical for the configured origin, sitemap URL, and structured data appropriate to actual content. |
| **Accessibility** | Keyboard focus, skip link, landmarks, headings, readable body measure, contrast-safe text, reduced-motion support, and accurate alternative text work. |
| **Trace verifier** | Complete/incomplete states work locally without storing/transmitting visitor data, assigning scores, or asserting certification. |
| **Claims/provenance** | Conceptual examples and diagrams are labelled; sourced claims link to evidence; no fabricated social proof or performance data exists. |
| **Release safety** | Static checks pass; cross-domain canonical/redirect/deployment changes are absent unless explicitly owner-approved. |

## 8. High-value prompts for another collaborator

Use these as starting contexts, then ask the collaborator to read `AGENTS.md` and the named files.

### Build prompt

> Work in `virtualmase/autonomousresourcemanagement`. Read `AGENTS.md`, `docs/CONTINUATION.md`, `docs/entity-registry.yml`, `docs/engagement-design-system.md`, and `flagship/CONTENT-ARCHITECTURE.md`. Implement the next unbuilt flagship route as portable static HTML/CSS/SVG/vanilla JS. Preserve property independence, do not use Vite or a backend, use self-canonical placeholders only, add the route to validation, and report exact files plus checks performed.

### Research/content prompt

> Read `AGENTS.md`, the capability registry, engagement research notes, and relevant existing property content. Develop an original ARM content-silo page for the named reader intent. Separate evidence, conceptual explanation, and implementation guidance; cite external claims; do not duplicate the reference or AI Mastery lesson; propose a precise internal-link path.

### Review prompt

> Review the current diff against `AGENTS.md`, `docs/CONTINUATION.md`, and `flagship/CONTENT-ARCHITECTURE.md`. Report only concrete violations: external dependency, property duplication, cross-domain canonical, unsupported claim, inaccessible contrast/focus, broken static path, misleading CTA, secret exposure, or lack of a safe failure path. Do not rewrite working sections for stylistic preference alone.

## 9. What must still be decided by the owner

| Decision | Why an owner decision is needed |
|---|---|
| Flagship domain deployment / `.xyz` cutover | It changes live hosting/domain behavior and must be confirmed after the static package is ready. |
| Portal hostname and deployment | The portal needs its own independent property identity; this is not a technical default. |
| License selection | Public visibility is not itself a reuse grant. A license choice should be deliberate. |
| Analytics provider and privacy posture | Any visitor measurement requires a privacy and data-minimization decision before implementation. |
| Protected branch and environment approval rules | Repository owner/organization policy controls these hosted settings. |
| Search Console sitemap submission / indexing request | The Virtualmase URL-prefix property is verified, but submissions and inspection requests are separate external actions. |

## 10. Known repository hygiene state

The `flagship/` directory includes copied WebP assets and the current content architecture. It is source-complete and continues to be **not deployed**; do not bind it to `.xyz` or add it to unrelated work. The new reader-task architecture is documented in this repository; public utility sources remain in their own repositories and should not be copied into the ARM reference package.

Earthward’s GitHub Pages deployment is healthy and separate from its repository CI. On the source commit that recorded live verification, the existing service-container CI smoke test failed during its final shell execution after both local health responses returned `{"status":"ok"}`; the static Pages build for commit `854ff65` succeeded. Treat that container-CI result as an owned Earthward maintenance item. Do not attempt to resolve it by opening a public port, making a protected service unauthenticated, changing the GCE configuration, or exposing pilot data.
