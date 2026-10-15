# Autonomous Resource Management

Source for the standalone reference at **https://autonomousresourcemanagement.com**. Covers resource allocation, orchestration, infrastructure, cost controls, and human oversight through cited explanations and dated briefs. The ARM working framework is an attributed editorial proposal, not a formal standard.

## Build and verify

Requires Node 22+ and Python 3.12+. No production application server or database is needed.

```sh
npm ci
npm test
npm run check
npm run export
npm run check:export
npx playwright install chromium
npm run test:browser
npm run preview
```

Preview: `http://127.0.0.1:4173`. The build renders only the publishable site into `dist/`. The quality workflow uploads it as `arm-reference-static`, including `.htaccess`.

The repository also commits a ready-to-serve root snapshot for compatibility with the existing Hostinger webhook. Run `npm run export` after source edits; CI rejects snapshot drift. Do not edit generated pages directly.

**For a clean archive deployment, deploy `dist/` contents, never an archive of the entire repository.** The archive root must contain `index.html`. See [deployment instructions](docs/deployment.md). A repository update does not establish production parity.

## Repository map

| Path | Purpose |
| --- | --- |
| `content/wiki/` | Source-backed concept articles |
| `content/news/` | Dated briefs with source checks and limitations |
| `content/pages/` | Policies, about, corrections, revision log, and framework |
| `public/` | CSS, search behavior, and favicon |
| `scripts/build.mjs` | Static HTML, JSON-LD, RSS, sitemap, search index, release manifest |
| `scripts/check.mjs` | Links, metadata, review records, deployment boundaries |
| `scripts/collect-news.py` | Approved-feed discovery; never publishes |
| `editorial/` | Source registry, workflow, decisions, review records |
| `tests/` | Content, feed parser, and browser checks |
| `aure/` | Separate subdomain implementation, excluded from build |
| `coreweaver-labs/` | Unpublished research archive, excluded from build |

## Editorial workflow

Articles use JSON front matter between `---` lines followed by Markdown. See [editorial operations](editorial/README.md). Drafts are excluded from pages, search, RSS, and sitemap. Raw HTML is escaped; unsupported link protocols and remote Markdown images fail the build.

Published reference articles require attribution, inline citations, source descriptions, and review disclosure. News also requires event/publication/check dates, a real source-check record, and sections for what changed, relevance, and evidence limits. Never invent a human reviewer or independent testing.

News discovery runs Monday, Wednesday, and Friday at 13:23 UTC and supports manual dispatch. It uploads an unreviewed queue. An editor reads original sources and proposes a content PR. The collector has read-only repository permissions and cannot publish or send messages.

CODEOWNERS requests review but does not enforce it alone. Configure branch protection to require the `validate` check and code-owner review when account capabilities allow it. A green build is not factual peer review.

## Scope and rights

This reference has no commercial provider referrals. The former homepage's proposal is revised at `/framework/`; original files remain in Git history. Separate AURE content and unpublished CoreWeaver research are outside this release. Never publish unsupported archive claims or include source files, dependencies, `.git`, or queue artifacts in a deployment.

Public source availability does not grant rights to cited third-party material. No blanket open-content license or independent editorial-board status is claimed.

## Existing packages preserved

The repository also retains `flagship/`, `portal/`, `practice/`, `demos/`, and `ci/governance/`. They have separate roles and deployment boundaries; this revision does not publish or rewrite them. Consult `AGENTS.md`, `CONTRIBUTING.md`, and `docs/CONTINUATION.md` for existing governance. Changes to public claims and property roles retain the two-maintainer review requirement.
