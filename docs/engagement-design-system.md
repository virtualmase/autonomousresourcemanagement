# ARM Engagement Design System

**Status:** Operating design specification for the independent ARM properties.  
**Purpose:** Sustain qualified attention by helping a reader recognize a relevant operating question, inspect the supporting record, take a fitting next step, and return when a verifiable change matters.

> **The engagement objective is not time captured. It is useful progress per visit.**

The system treats attention as a scarce reader resource. It does not reproduce social-feed mechanics such as infinite scroll, variable reward loops, forced registration, unexplained recommendations, false urgency, or frictionful exit. Information-foraging research instead describes people choosing sources by expected value relative to effort; therefore, ARM must make its next task and its expected value legible. [1]

## 1. The engagement contract

An ARM property earns a subsequent action by resolving the reader’s present question without concealing the next commitment. A visual first impression matters because people form fast, stable appearance judgments, while a site’s design and information organization can materially shape credibility assessment. [2] [3] That effect earns attention; it does not substitute for evidence, named authorship, current review, functioning links, or a correction path. [4]

| Reader intent | Legitimate first question | Best first property | Useful next action | Evidence of progress |
|---|---|---|---|---|
| **Executive / decision owner** | “What operating risk or decision boundary should we make explicit?” | Executive flagship | Read a bounded operating brief or request a scoped discussion. | The reader can name the resource, right, owner, and exception condition. |
| **Systems architect / practitioner** | “How do resources, decision rights, records, and escalation fit together?” | AI Mastery ARM learning pathway | Complete a short boundary exercise, then inspect a cited definition. | The reader can map an action to its record and escalation point. |
| **Researcher / reviewer** | “What does ARM claim and what supports it?” | Reference property | Inspect sources, propose a correction, or open a scoped research question. | The claim boundary and source basis are visible. |
| **Contributor / collaborator** | “Where can I improve the system without overstepping authority?” | Participation portal | Select a capability path and open a Discussion, issue, or pull request. | Work has a named scope, evidence requirement, and review route. |
| **Evaluator / buyer** | “Is this a credible, accountable operating model worth further diligence?” | Executive flagship, with defined routes to reference and portal | Examine a concrete record or boundary pattern, then initiate a clearly labelled contact path. | The buyer can distinguish public learning material from a product or commercial discussion. |

Each property remains a distinct authority surface. Its canonical URL refers only to itself. Cross-property routes are allowed only where the label names the reader benefit—such as **definition + sources**, **operating guide**, **contribution pathway**, or **product boundary**—and where the destination offers genuinely original material.

## 2. Attention without capture: the ARM loop

The repeatable experience is a **question-to-record loop**, not a feed.

| Moment | Reader-facing object | Behavioral purpose | Prohibited shortcut |
|---|---|---|---|
| **Orient** | A short operating proposition and one original visual topology | Makes the page’s domain and decision relevance legible at first glance. | Hype-led headlines, vague “future of” claims, decorative imagery unrelated to the work. |
| **Locate** | Intent-labelled route or section anchor | Gives strong information scent: what a click will answer and how much work it asks. [1] | Generic labels such as “Learn more,” mystery links, or forced funnels. |
| **Inspect** | Cited source, record anatomy, or compact operating example | Converts aesthetic attention into evaluable substance. | Claims without ownership, source, date, or limitation. |
| **Practice** | A small boundary question with an answer direction | Lets a visitor test applicability without pretending to certify competence. | Gamified scoring, fake progress pressure, or data collection before value. |
| **Continue** | One to three relationship-labelled next questions | Helps a qualified reader choose an appropriate property or return when new evidence appears. | Infinite scroll, opaque recommendation engines, or exit friction. |

## 3. Credibility architecture

Visual authority is implemented as **legibility plus inspectability**, never as a claim conferred by a color, typeface, logo, or motion effect. The reference property carries citations and correction paths. The executive property carries bounded operating guidance and commercial clarity. The portal carries contribution scope and governance records. The learning property carries original practice material.

| Trust signal | Visible expression | Required underlying record | Owner |
|---|---|---|---|
| **Claim boundary** | “What this teaches / does not claim” language near the relevant statement. | Source notes, uncertainty, and scope in the reference repository. | Researcher + Content Developer |
| **Named accountability** | Explicit author, property steward, or decision owner where materially relevant. | Governance and contact route. | Property steward |
| **Freshness** | `Last reviewed` or changelog link—not fabricated “live” status. | Dated edit, release, or review record. | Maintainer |
| **Verifiability** | Citation, external source, decision record, or public implementation reference. | Stable source URL or versioned repository file. | Researcher / Builder |
| **Correction** | Visible correction or issue route for factual material. | Public triage and resolution record where appropriate. | Maintainer + Sweeper |

## 4. Typography: role, not mythology

There is no evidence-based rule that a serif automatically produces trust or that a sans-serif automatically improves conversion. A 246-participant e-commerce experiment found no general usability effect from serif versus sans-serif versions within one family. [5] The practical controls are readable measure, line height, hierarchy, spacing, contrast, and a typeface’s fitness for its role. [6]

The ARM family uses **Hedvig Letters Serif** for editorial decision language, **Schibsted Grotesk** for working interface and instructional copy, and **Fragment Mono** for trace metadata. This is an authored role split: thought, action, and record. It is not a claim that the fonts create authority.

| Role | Type family | Use | Constraints |
|---|---|---|---|
| **Decision voice** | Hedvig Letters Serif | Major proposition, pull quote, meaningful case prompt. | Use in short passages; never compress technical labels or long technical prose. |
| **Working language** | Schibsted Grotesk | Navigation, body copy, forms, labels, task explanations. | Long text should be left-aligned, have a readable measure, and use at least 16 px effective size. [6] |
| **Trace layer** | Fragment Mono | Source IDs, dates, version, record steps, policy conditions. | Keep concise; never make a long explanation depend on small monospace text. |
| **Fluid scale** | Semantic `clamp()` tokens | Maintains hierarchy across viewing contexts. | Maintain explicit minimums, test at compact and wide widths, and respect user zoom. |

```css
/* ARM type roles: decision, working language, and trace record. */
:root {
  --type-decision: "Hedvig Letters Serif", Georgia, serif;
  --type-working: "Schibsted Grotesk", Arial, sans-serif;
  --type-trace: "Fragment Mono", "SFMono-Regular", monospace;
  --step-hero: clamp(3.6rem, 8.2vw, 8.9rem);
  --step-section: clamp(2.6rem, 5.4vw, 5.55rem);
  --step-card: clamp(1.55rem, 2.3vw, 2.45rem);
  --step-body: clamp(1rem, 0.95rem + 0.18vw, 1.15rem);
}
.arm-proposition { font: 350 var(--step-hero)/0.86 var(--type-decision); letter-spacing: -0.068em; }
.arm-working-copy { max-width: 68ch; font: 400 var(--step-body)/1.62 var(--type-working); }
.arm-record-label { font: 500 0.7rem/1.25 var(--type-trace); letter-spacing: 0.11em; }
```

## 5. Color: semantic contrast, not emotional folklore

Color research is context-dependent; it does not authorize a universal “trust blue,” “conversion red,” or emotion-to-sale formula. [7] ARM color assignments therefore communicate state and relationship, while luminance contrast carries readability. WCAG 2.2 requires at least 4.5:1 contrast for normal text and 3:1 for qualifying large text; hue is not a substitute for contrast. [8]

| Semantic role | Token | Intended job | Use boundary |
|---|---:|---|---|
| **Deep field** | `#121B34` | Creates a quiet technical field for orientation, records, and conceptual systems. | Never use low-contrast blue-on-blue body copy. |
| **Paper / evidence field** | `#F7F4EC` | Gives working explanations and annotated records a distinct reading material. | Pair with near-black text; avoid using it as an “authority” shortcut. |
| **Decision copper** | `#FF714B` | Marks an active boundary, direct action, or decision point. | One action per local context; never signal danger, success, and primary action simultaneously. |
| **Ultramarine relationship** | `#526DFF` | Indicates a connected but independent property or verified informational route. | Always reinforce with a label or icon—never color alone. |
| **Review mint** | `#9DE1D2` | Marks observed, reviewed, or resolved states in noncritical diagrams. | Never use as the sole success indication or in small text without contrast test. |

## 6. Image and SVG art direction

The visual inventory must show **what ARM reasons about** rather than generic “AI” signifiers. Existing evidence is stronger when readers can see a specific information structure, and visual hierarchy should create an entry point before asking for detailed reading. [2] [3]

| Asset class | Example | Construction rule | Accessible label |
|---|---|---|---|
| **Topology diagram** | Resource Observatory: budget, time, evidence, tools, people around a decision core. | Build as SVG or semantic HTML/CSS, with a written caption carrying the meaning. | “Diagram showing five resource categories around a core of decision rights and records.” |
| **Record anatomy** | Source → Context → Action → Review. | Render as a sequence with real explanatory copy, not decorative data. | “Four-stage operating record showing evidence, scope, decision, and outcome review.” |
| **Handoff relay** | Seven governed roles joined by a visible transition line. | Each shape stands for a defined capability and actual output; avoid generic icons. | “Seven-role relay from researcher through sweeper, showing accountable handoffs.” |
| **Documentary image** | A specific workshop artifact, annotated source, or real system context. | Only use with provenance, date, permission/rights, and an accurate caption. | Describe the subject and its relevance; do not keyword-stuff. |
| **Generated conceptual image** | An abstract resource-boundary field for an executive proposition. | Label as conceptual/generated when it could be mistaken for a real operating environment. | Describe visual content and identify it as conceptual when relevant. |

Avoid robot hands, anonymous server-rack photography, stock boardrooms, manufactured data dashboards, neon code, unlabelled human faces, and image-only text. An SVG is preferred when the visual’s purpose is to explain a relation: it remains inspectable, responsive, editable, and accessible.

## 7. Measurement that serves the reader

The measurement model asks whether visitors find the correct next question—not whether they can be kept indefinitely. Capture only aggregated, purpose-limited events after a public privacy review. Do not capture free-text inputs, sensitive resource data, individual session replay, or cross-site behavioral profiles by default.

| Signal | Interpretation | Action if weak | Do not optimize toward |
|---|---|---|---|
| **Intent-route selection** | Whether the first labelled route matches a visitor’s task. | Improve labels, premise, or route placement. | Misleadingly broad calls to action. |
| **Evidence reveal / source follow-through** | Whether a high-stakes claim invites deeper inspection. | Move the source cue closer or make the claim boundary clearer. | Hiding uncertainty to raise clicks. |
| **Practice completion** | Whether the bounded exercise is comprehensible and relevant. | Reduce unnecessary steps or clarify the action constraint. | Score pressure or false certification. |
| **Qualified return after a dated update** | Whether revisions and new evidence give a reason to return. | Publish sharper changelogs and source updates. | Notifications without user choice or manufactured urgency. |
| **Correction / contribution completion** | Whether someone can responsibly challenge or improve a record. | Clarify scope and governance handoff. | Friction designed to suppress critique. |

## 8. Implementation sequence

1. Add self-hosted, openly licensed type files and apply role-based tokens to the ARM learning page and portal only after compact, normal, and zoomed-state validation.
2. Replace broad decorative fields with three original explanatory SVGs: a resource topology, a decision-rights threshold, and a record/handoff chain.
3. Add explicit intent cards or route labels only where they materially reduce navigation ambiguity; do not overlay generic conversion controls.
4. Add a source/review record component to high-stakes claims, linked to the reference repository.
5. Publish an engagement-measurement policy before adding analytics, and use only privacy-limited aggregate measurement.
6. Use short research iterations: form one question, publish an inspectable change, observe the relevant qualified signal, record the conclusion, and retain a rollback path.

## References

[1] [Budiu, *Information Foraging: A Theory of How People Navigate on the Web*, Nielsen Norman Group](https://www.nngroup.com/articles/information-foraging/)

[2] [Lindgaard et al., *Attention web designers: You have 50 milliseconds to make a good first impression!*, Behaviour & Information Technology](https://doi.org/10.1080/01449290500330448)

[3] [Fogg et al., *How do users evaluate the credibility of Web sites?: a study with over 2,500 participants*, ACM, 2003](https://dl.acm.org/doi/10.1145/997078.997097)

[4] [Fogg, *Stanford Guidelines for Web Credibility*](https://credibility.stanford.edu/guidelines/)

[5] [Vecino et al., *How does serif vs sans serif typeface impact the usability of e-commerce websites?*, PeerJ Computer Science](https://pmc.ncbi.nlm.nih.gov/articles/PMC9680897/)

[6] [U.S. Web Design System, *Typography*](https://designsystem.digital.gov/components/typography/)

[7] [Labrecque & Milne, *Exciting red and competent blue: The importance of color in marketing*, Journal of the Academy of Marketing Science](https://doi.org/10.1007/s11747-010-0245-y)

[8] [W3C, *Understanding Success Criterion 1.4.3: Contrast (Minimum)*](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

[9] [OECD, *Six dark patterns used to manipulate you when shopping online*](https://www.oecd.org/en/blogs/2024/09/six-dark-patterns-used-to-manipulate-you-when-shopping-online.html)

[10] [Federal Trade Commission, *FTC Report Shows Rise in Sophisticated Dark Patterns Designed to Trick and Trap Consumers*](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)
