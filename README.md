# Autonomous Resource Management (ARM) — autonomousresourcemanagement.com

Static Hostinger-compatible HTML and machine-readable definition for **Autonomous Resource Management (ARM)** at [autonomousresourcemanagement.com](https://autonomousresourcemanagement.com).

This repo is content and structured data, not an application. There is no build step and no test suite.

## Contents

| File | Purpose |
|---|---|
| `index.html` | The definitional page for "Autonomous Resource Management" — includes inline JSON-LD (`WebPage`, `DefinedTerm`) for LLM/search citation. |
| `coreweaver-labs/index.html` | Unpublished, noindex research archive; do not publish its performance claims without evidence. |
| `schema.json` | Standalone schema.org graph for this reference, its term, and its author. |
| `llms.txt` | Machine-readable summary and bounded routes to distinct implementation providers. |
| `sitemap.xml` | Standard XML sitemap. |
| `CNAME` | GitHub Pages custom domain pointer — `autonomousresourcemanagement.com`. |

## Purpose

This site is the non-commercial reference layer for the term "Autonomous Resource Management." It supports revenue properties through clearly labeled application paths without conflating their identities or placing checkout on the reference domain.

## Maintaining this repo

- Keep `schema.json`, `llms.txt`, and the inline JSON-LD in `index.html` in sync — entity name, leadership, and `sameAs` links should match across all three.
- Any factual/statistical claim on any page (e.g. deployment counts, dataset sizes) must be sourced or removed before publishing — unsubstantiated metrics undermine the citation-authority goal this site exists to build.
- Deploy by uploading the static files to Hostinger's document root. No Node runtime, framework, database, or rewrite rules are required.
