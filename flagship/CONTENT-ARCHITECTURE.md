# ARM Executive Flagship: Production Content Architecture

**Property:** `arm-flagship`  
**Intended hostname:** `https://autonomousresourcemanagement.xyz/` (not deployed or cut over by this package)  
**Role:** Executive operating-guidance property for decision owners assessing accountable autonomy.  
**Build rule:** Portable static HTML, CSS, SVG, and minimal browser JavaScript only. No Vite, framework runtime, server dependency, tracking pixel, cross-domain canonical, or automatic deployment command.

## 1. Reader job and content distinction

The flagship helps an executive, operating owner, or systems leader identify the resource boundary, decision right, trace requirement, observability condition, and human escalation point required for a consequential workflow. It does not duplicate the reference property’s cited definitions, the AI Mastery property’s instructional material, or the portal’s contribution records.

| Property | Primary reader question | Original content contribution | Relationship from flagship |
|---|---|---|---|
| **Flagship (`.xyz`)** | “How should a high-stakes autonomous workflow be bounded and owned?” | Executive operating briefs, decision patterns, readiness verifier, and scoped contact context. | Self-owned executive surface. |
| **Reference (`.com`)** | “What does ARM claim, what evidence supports it, and how may I correct it?” | Cited definition, entity records, public governance, and correction path. | `Definition + sources` only. |
| **AI Mastery** | “How do I learn the operating model and practice its reasoning?” | Foundational lesson, topology, and practice case. | `Learning pathway` only. |
| **Participation portal** | “Where can I propose, review, or maintain bounded work?” | Capability directory, GitHub collaboration, governance intake. | `Contribution pathway` only. |

## 2. Production route tree

| Route | Silo / intent | Core answer | Primary reader action |
|---|---|---|---|
| `/` | **Executive orientation** | Autonomy is an accountable resource decision—not an unbounded capability claim. | Begin a five-part readiness check. |
| `/decision-rights/` | **Authority design** | Separate recommendation, execution, approval, and exception rights. | Read the decision-rights worksheet. |
| `/resource-observability/` | **Resource observability** | Make resource consumption, scope, cost, dependencies, and drift visible. | Inspect the observability field. |
| `/traceable-records/` | **Traceability** | Record source, context, authorization, action, and outcome for reconstruction. | Run the local-only record verifier. |
| `/governed-autonomy/` | **Operating model** | Coordinate bounded autonomy across people, policies, systems, and review cycles. | Compare operating responsibilities. |
| `/accountable-escalation/` | **Exception design** | Define stop conditions, decision owners, and restart criteria before a workflow runs. | Map an escalation trigger. |
| `/capability-system/` | **Delivery capability** | Researcher through Sweeper form accountable production handoffs. | View public capability charters. |
| `/faq/` | **Due diligence** | Answer high-frequency operating, security, and participation questions in direct language. | Follow a properly labelled next route. |
| `/404.html` | **Recovery** | Reorient a visitor toward the nearest known intent, with no generic dead end. | Return to a relevant silo. |

Every route must have original content, a self-referencing canonical URL when a hostname is configured, an explicit title/description, JSON-LD appropriate to the page’s function, and meaningful internal links. The route tree must never turn the `.xyz` property into a cross-domain duplicate or a redirect wrapper.

## 3. Cross-silo navigation

The header navigates five executive concepts: **Decision rights**, **Observability**, **Trace records**, **Escalation**, and **Capability system**. A visitor should be able to choose a question rather than traverse a marketing funnel. The footer exposes sitemap-level orientation, direct governance/reference routes, and a correction path.

The page-ending continuation panel may show a maximum of three routes. Each route must name the reader benefit, for example `Inspect the definition and sources`, `Learn the boundary model`, or `Contribute through governed records`. It must not use generic `Learn more` labels or automatic recommendations.

## 4. High-fidelity landing composition

The visual language is **resource cartography**: pale mineral paper provides the executive reading field, deep ultramarine provides an operating-data field, saturated copper marks a decision boundary, and mineral mint marks observed/reviewed non-critical status. The visual hierarchy is a mixed editorial and instrument layout; it does not use centered SaaS hero panels or repeated rounded cards.

| Landing sequence | Visual material | Content task | Interaction |
|---|---|---|---|
| **Opening proposition** | Wide resource landscape and coordinate mark, with a structured decision index. | State the executive problem and the requested first action. | One anchored `Run the readiness check` action. |
| **Decision threshold** | Original SVG showing signal → gate → record → escalation. | Establish that capability is not implied authority. | Static explanatory diagram with text caption. |
| **Five-part readiness check** | Numbered row system with scope markers. | Make the minimum operating questions scannable. | Anchored links into silos. |
| **Trace-record verifier** | Quiet evidence panel with progressive details. | Let a reader test an example record for reconstruction completeness. | Local-only toggles; no score, storage, submission, or identifier. |
| **Silo routes** | Asymmetric feature blocks with original diagrams or one contextual image. | Let the reader select a next operating question. | Direct, descriptive routes. |
| **Capability relay** | Seven-role production handoff field. | Show real accountable work, not generic “agents.” | Links to charters and collaboration route. |
| **End state** | Three relationship-labelled exit/continuation paths. | Support deliberate continuation or easy exit. | No capture, countdown, modal, or infinite feed. |

## 5. Trace-record verifier: bounded interaction contract

The verifier contains a concrete, fictional operational example. It starts with five visible checks: **source**, **scope**, **decision right**, **action**, and **outcome**. A reader may toggle individual checks to learn why each is required. The interface uses only in-memory browser state and `textContent`; it must not submit a form, send telemetry, persist an identity, claim certification, or recommend a material action.

An incomplete record states the missing review question and holds the conclusion at `Not reconstructable yet`. A complete record states only `All five review questions are represented in this example`. It must not generate a pass grade, trust score, risk rating, or warranty.

## 6. Production component inventory

| Component | Responsibility | Constraints |
|---|---|---|
| `site.css` | Tokens, responsive grid, typography, focus/contrast, component styles. | WCAG 2.2 contrast; reduced-motion support; no imported framework. |
| `site.js` | Active nav state, mobile navigation, local verifier state, and no-op safe behavior. | No `innerHTML` from inputs; no remote calls; no cookies/local storage. |
| `decision-threshold.svg` | Visualizes scope, gate, record, and escalation. | Caption + accurate alternative; conceptual claim stated in adjacent HTML. |
| `resource-field.svg` | Visualizes bounded resource categories and observations. | No fake metrics, no chart-like quantitative implication. |
| `record-chain.svg` | Visualizes the five reconstructability elements. | Use semantic sequence in text as well as image. |
| Page templates | Original route content with shared header/footer. | Route title, description, canonical placeholder, JSON-LD, and CSS contract comment. |
| `scripts/validate-static.mjs` | Validates routes, metadata, self-canonical policy, asset paths, non-manipulation rules, and safe script patterns. | Runs with plain Node; fails closed on required artifacts. |

## 7. Discovery and structured-data controls

Prior to deployment, `site-config.js` will supply one origin value. The default local value is not indexable. A deployment owner must set it to the intended property origin, then run validation. Every page renders its own canonical under that same origin. `robots.txt`, `sitemap.xml`, and a static 404 are generated as portable source files only after the production origin is finalized.

Use `Organization` only for the flagship publisher where the represented facts are verified; use `WebSite`, `WebPage`, `FAQPage`, `HowTo`, and `LearningResource` only where the actual page content matches. No review, rating, award, certification, or performance structured data is permitted without independently supportable source material.

## 8. Release gates

1. HTML, CSS, SVG, and JS are route-safe and run with a plain static HTTP server.
2. No Vite/framework/build artifacts, tracking pixels, opaque external scripts, or direct secret references exist.
3. Every rendered page has title, description, self-canonical at production origin, skip link, landmark structure, focus style, and visible text/image contrast.
4. Every primary link resolves locally; outbound property links state their relationship and do not use cross-domain canonicals.
5. Interactive verifier demonstrates complete and incomplete paths without storing or transmitting information.
6. Sitemap, robots, 404, structured data, alt text, SVG title/description, and provenance labels are present.
7. A static validator records pass/fail output. No DNS, publishing, analytics connection, or domain cutover happens as part of validation.
