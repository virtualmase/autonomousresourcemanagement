# Autonomous Resource Management (ARM) — autonomousresourcemanagement.com

Static site and machine-readable entity definition for **Autonomous Resource Management (ARM)** — canonical source at [autonomousresourcemanagement.com](https://autonomousresourcemanagement.com), part of the [AURE](https://au-re.org) entity network.

This repo is content and structured data, not an application. There is no build step and no test suite.

## Contents

| File | Purpose |
|---|---|
| `index.html` | The definitional page for "Autonomous Resource Management" — includes inline JSON-LD (`WebPage`, `DefinedTerm`) for LLM/search citation. |
| `coreweaver-labs/index.html` | Spoke page: GPU infrastructure knowledge hub, published under Coreweaver Labs. |
| `schema.json` | Standalone schema.org `Organization` graph for AURE, including `sameAs` links across the entity network and the service catalog. |
| `llms.txt` | Machine-readable summary for LLM crawlers — entity identity, leadership, and services, per the [llms.txt convention](https://llmstxt.org). |
| `sitemap.xml` | Standard XML sitemap. |
| `CNAME` | GitHub Pages custom domain pointer — `autonomousresourcemanagement.com`. |

## Purpose

This site exists to establish `autonomousresourcemanagement.com` as the authoritative, citable definition source for the term "Autonomous Resource Management" — for both traditional search and LLM-based answer engines (GEO). It is one spoke in a hub-and-spoke entity architecture; see `llms.txt` and `schema.json` for the full entity graph and `sameAs` relationships.

## Maintaining this repo

- Keep `schema.json`, `llms.txt`, and the inline JSON-LD in `index.html` in sync — entity name, leadership, and `sameAs` links should match across all three.
- Any factual/statistical claim on any page (e.g. deployment counts, dataset sizes) must be sourced or removed before publishing — unsubstantiated metrics undermine the citation-authority goal this site exists to build.
- Deploys via GitHub Pages using the `CNAME` file above; pushes to `main` go live.
