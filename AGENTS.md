# ARM Contributor Instructions

This repository is an **open-source, portable, multi-property Autonomous Resource Management (ARM) system**. These instructions are written for any collaborator: a human, Codex, Claude, Gemini, or another capable coding assistant.

> **Start with facts, not assumptions.** Read [`docs/CONTINUATION.md`](docs/CONTINUATION.md), [`docs/multi-property-entity-architecture.md`](docs/multi-property-entity-architecture.md), and [`flagship/CONTENT-ARCHITECTURE.md`](flagship/CONTENT-ARCHITECTURE.md) before changing an ARM property.

## Non-negotiable constraints

1. **No Vite and no proprietary runtime dependency** in public ARM properties. Prefer static HTML, CSS, SVG, and minimal vanilla browser JavaScript. A plain static HTTP server must render the package.
2. **Independent properties retain independent authority.** The reference property (`.com`), executive flagship (`.xyz`), AI Mastery learning path, and future participation portal have distinct reader jobs and original content.
3. **Every production page uses a self-referencing canonical URL only.** Never add a cross-domain canonical. Do not turn a property into a redirect unless the owner explicitly asks.
4. **Do not duplicate another property’s core content.** Cross-links are permitted only when their visible label names the reader benefit and the destination provides original material.
5. **No deceptive growth mechanics.** Do not use false scarcity, fake social proof, fabricated testimonials or reviews, forced registration, dark patterns, infinite scroll, manipulative notification loops, or opaque recommendation systems.
6. **No unsupported claims.** Do not invent performance results, customers, endorsements, certifications, integration status, security guarantees, metrics, or live-system data.
7. **No unconfirmed external cutovers.** DNS changes, Vercel or hosting source changes, deployment-domain binding, Search Console mutations, analytics activation, and any external posting or payment require explicit owner confirmation.
8. **Do not expose or add secrets.** A public static property must not depend on client-side credentials or hidden tokens.
9. **Keep source provenance.** Distinguish documented evidence, fictional examples, conceptual diagrams, generated visual material, and operational records. Use accurate alternative text for meaningful images and `aria-hidden="true"` for decorative shapes.
10. **Preserve human authority.** The system may explain, simulate, guide, or validate a bounded example. It must not claim that an assistant or workflow can independently authorize consequential actions.

## Working method

1. Identify the target property and reader question. Do not treat all domains as one canonical site.
2. Read the relevant architecture, capability, visual, and engagement documentation.
3. Make a narrowly scoped, reversible change with original content and clear acceptance criteria.
4. Run static and interaction validation locally. Test both the expected path and a safe failure/incomplete path for interactive features.
5. Review the diff for terminology, property boundaries, alternative text, metadata, and secrets before committing.
6. Commit coherent source changes only. Report what is implemented, what is factual versus conceptual, and what still requires owner approval.

## Required source conventions

| Area | Requirement |
|---|---|
| **Content** | Use operating model, operating principle, decision rights, accountable human escalation, observability, governance, and traceable records. Avoid the retired `mandate` wording in active ARM copy. |
| **Typography** | Use role-based typography—decision voice, working language, trace layer—not generic “font psychology” claims. Keep body text readable, left-aligned, and contrast-safe. |
| **Color** | Use semantic roles: deep field, evidence paper, decision copper, relationship ultramarine, review mint. Verify contrast; hue never substitutes for meaning or accessibility. |
| **Visual assets** | Prefer original SVGs for explanatory relationships. Avoid generic AI art, robot hands, stock boardrooms, fake dashboards, unlabeled human faces, and image-only text. |
| **Interactions** | Use progressive disclosure, descriptive links, and local-only bounded examples. Avoid collecting visitor data unless a separately reviewed privacy and analytics plan exists. |
| **Discovery** | Every page needs title, description, self-canonical at its property origin, meaningful internal links, structured data only when truthfully applicable, sitemap inclusion, and a static 404. |

## Current build priorities

The current highest-value work is the actual static executive flagship package under `flagship/`: original landing page, five content silos, FAQ, trace-record verifier, static discovery files, and validation scripts. Use the route tree and release gates in [`flagship/CONTENT-ARCHITECTURE.md`](flagship/CONTENT-ARCHITECTURE.md). Do not bind it to `autonomousresourcemanagement.xyz` or deploy it until the owner explicitly approves the cutover.

## Completion standard

A change is ready for review only when it is technically functional, visually intentional, readable at compact and wide widths, source-documented, boundaries-safe, and honest about its status. A visually polished page without provenance or accessibility is incomplete; a correct document without an intelligible reader task is also incomplete.
