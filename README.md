# Autonomous Resource Management (ARM) Reference Layer

Portable, static HTML and machine-readable reference material for **Autonomous Resource Management (ARM)** at [autonomousresourcemanagement.com](https://autonomousresourcemanagement.com). This property is the cited definition and research layer in a wider, coordinated entity system.

This repository is content and structured data, not an application. There is no framework runtime, proprietary backend, or required build step.

## Contents

| File | Purpose |
|---|---|
| `index.html` | The definitional page for "Autonomous Resource Management" — includes inline JSON-LD (`WebPage`, `DefinedTerm`) for LLM/search citation. |
| `coreweaver-labs/index.html` | Unpublished, noindex research archive; do not publish its performance claims without evidence. |
| `schema.json` | Standalone schema.org graph for this reference, its term, and its author. |
| `llms.txt` | Machine-readable summary and bounded routes to distinct implementation providers. |
| `sitemap.xml` | Standard XML sitemap. |
| `CNAME` | GitHub Pages custom domain pointer — `autonomousresourcemanagement.com`. |
| `docs/entity-registry.yml` | Public record of property roles, self-canonical policy, and cross-property relationships. |
| `docs/multi-property-entity-architecture.md` | Entity-system, authority-flow, and collaboration operating model. |
| `docs/capability-registry.yml` | Governed roles for evidence, content, prototypes, implementation, growth, maintenance, and cleanup. |
| `docs/portfolio-operation-skills.md` | Inputs, outputs, quality gates, authority limits, and handoffs for the seven operating capabilities. |
| `portal/` | Portable, no-build participation-interface package; deployment hostname is intentionally pending. |
| `CONTRIBUTING.md` | Contribution, sourcing, and review guidance. |

## Purpose

This site is the non-commercial reference layer for the term "Autonomous Resource Management." It supports the wider entity system through cited definitions and clear application paths without conflating identities, duplicating content, or placing checkout on this reference domain. Each property is independently useful and self-canonical.

## Maintaining this repo

- Keep `schema.json`, `llms.txt`, and the inline JSON-LD in `index.html` in sync — entity name, leadership, and `sameAs` links should match across all three.
- Any factual/statistical claim on any page (e.g. deployment counts, dataset sizes) must be sourced or removed before publishing — unsubstantiated metrics undermine the citation-authority goal this site exists to build.
- Deploy by uploading the static files to Hostinger's document root. No Node runtime, framework, database, or rewrite rules are required.
- Read `CONTRIBUTING.md` before opening an issue or pull request. Use GitHub Discussions for questions and architecture conversations; use Issues for bounded, actionable work.
- Use the **Capability work record** issue form when an idea has an owner, a property, a stated output, acceptance checks, and a next handoff.
- The public license is intentionally pending a maintainer decision. Do not assume that the absence of a license grants reuse rights.
