# Virtualmase Public Practice Model

**Purpose:** Demonstrate Autonomous Resource Management through inspectable operating work, not through unverified expertise claims, status theatre, certifications, or abstract thought leadership.

> **Virtualmase earns a reputation for ARM by applying the same boundaries to its own work: resource scope, decision rights, traceable record, observability, accountable escalation, correction, and retention.**

## 1. What is being demonstrated

The public practice model makes the work of building ARM properties reviewable in the open. Every record is a factual account of a bounded piece of source work. It points to the underlying change, explains the decision right exercised, distinguishes completed results from open questions, and offers a correction or contribution route.

The model does **not** certify Virtualmase, imply independent audit, publish sensitive operational details, use a synthetic success score, or treat publication itself as proof that an implementation is suitable for every context. It is a living demonstration of disciplined work with clear limits.

| Demonstrated ARM principle | Public-practice behavior | Evidence a reader can inspect |
|---|---|---|
| **Resource scope** | Each record identifies the property, files, and public surface affected. | Versioned source paths and release commits. |
| **Decision rights** | The record states what the work could change and what remained owner-gated. | Explicit “not authorized” and pending-decision fields. |
| **Traceable record** | Every work item has purpose, scope, evidence, outcome, and open question. | YAML record plus linked source/release. |
| **Observability** | The record states validation performed and any relevant public signal. | Validator output, workflow run, QA record, or live URL. |
| **Accountable escalation** | External deployment, domain, security, privacy, or destructive changes are never implied by a source record. | Named owner decision / contribution route. |
| **Correction and retention** | Factual issues are routed through durable public processes; removal follows a retained-provenance rule. | GitHub Discussions, Issues, pull requests, governance, and security guidance. |

## 2. Record contract

Records live at [`practice/records/`](../practice/records/). They use a compact YAML format so people and tools can read the same source. A valid record must describe work that has actually occurred or clearly label a future proposal as `proposed`; it may never retrospectively fabricate an outcome.

| Field | Requirement |
|---|---|
| `id`, `title`, `capability`, `status` | Stable identity, named operating capability, and an honest state: `completed`, `active`, `proposed`, or `retired`. |
| `property` and `scope` | Exact independent property and bounded files/surfaces affected. |
| `decision_rights` | What was within the work scope and what the record explicitly did not authorize. |
| `evidence` | Public source, validation, or release reference for each material claim. |
| `outcome` and `open_questions` | What happened, what was not tested, and what remains owner-gated. |
| `correction_route` | Public path for factual correction, scoped contribution, or security report. |
| `retention` | Whether the record must remain, may be superseded, or needs a provenance-preserving retirement note. |

## 3. Capability relay in public practice

The current records map to the seven ARM operating capabilities. The model avoids claiming that each is an autonomous agent or named individual. They are accountable functions with distinct inputs, handoffs, and limits. Full charters live in the [capability registry](capability-registry.yml) and [operating skills](portfolio-operation-skills.md).

| Capability | Public proof object | What it demonstrates | What it does not demonstrate |
|---|---|---|---|
| **Researcher** | Evidence and design-system record. | Claim boundaries, cited sources, and open questions. | That research has eliminated uncertainty or proven commercial outcomes. |
| **Content Developer** | AI Mastery learning-path record. | Original, reader-specific explanation and a declared teaching boundary. | That a visitor completed or mastered the material. |
| **Prototype** | Builder Governance Lab record. | Reversible exploration of interaction and governance logic. | That a prototype is a deployed service or an authority mechanism. |
| **Builder** | Flagship source-package record. | Portable implementation, static validation, local interaction tests, and constraints. | That `.xyz` was cut over or a production deployment was authorized. |
| **Grower** | Discovery-readiness record. | Intent-led source architecture, sitemap/robots, and non-deceptive route labels. | Audience size, ranking, traffic, conversion, or distribution not actually measured. |
| **Maintainer** | Governance CI/CD record. | Release checks, telemetry-hold process, and approval-separated rollback design. | That every hosted protection or external integration has been enabled. |
| **Sweeper** | Terminology and provenance correction record. | Stale/retired language removal with a reviewable change history. | That all future stale content will be prevented. |

## 4. Public surface map

| Property | Practice display role | What it links to | What it must not repeat |
|---|---|---|---|
| **Reference property** | Canonical record index and full evidence/provenance links. | The raw public-practice YAML, methods, corrections, governance, and source. | Executive landing content or full learning lesson. |
| **Executive flagship** | A concise “Practice, not promises” proof panel. | Selected factual records and the reference index. | The full registry or a claim of audit/certification. |
| **AI Mastery** | A learning example that points to one relevant record. | The practice model and research/content examples. | Flagship persuasion or contributor portal UI. |
| **Participation portal** | Contribution and review path for improving records. | Record proposals, corrections, reviews, and capability work. | A claim that the portal governs external systems. |

## 5. Publication and review sequence

1. A capability owner creates a factual record only after source work or a clearly identified proposal exists.
2. A reviewer confirms the property boundary, scope, evidence links, terminology, and that no claim exceeds the cited outcome.
3. The record is published as a coherent source change with its validation evidence.
4. A flagship or learning property may reference the record only with a reader-benefit label and a short, accurate summary.
5. Corrections create a dated update; a retirement preserves a provenance note and replacement route where appropriate.
6. Any request involving deployment, a domain, sensitive information, analytics, financial commitment, security response, or external account action is escalated to the relevant human owner.

## 6. Honest expertise positioning

Use precise language such as: **“Virtualmase publicly practices ARM through source-linked records, bounded workflows, and correction paths.”** Avoid absolute or unverifiable language such as “the master of ARM,” “proven at scale,” “fully secure,” “certified,” “dominates,” or “guaranteed.”

The desired signal is not a claim of perfection. It is evidence that Virtualmase can name its limits, test a bounded question, show its work, correct errors, and preserve responsibility when external consequences matter.

## 7. Public contribution routes

| Need | Route |
|---|---|
| Question, interpretation, or a broad practice discussion | [GitHub Discussions](https://github.com/virtualmase/autonomousresourcemanagement/discussions) |
| Factual correction or a bounded record proposal | [GitHub Issues](https://github.com/virtualmase/autonomousresourcemanagement/issues) |
| Source change with reviewable evidence | [Pull request process](https://github.com/virtualmase/autonomousresourcemanagement/blob/main/CONTRIBUTING.md) |
| Potential vulnerability | [Coordinated disclosure guidance](https://github.com/virtualmase/autonomousresourcemanagement/blob/main/SECURITY.md) |
