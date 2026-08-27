# ARM Executive Flagship Package

This directory is a **portable, no-build static-site package** for the independent ARM executive flagship property. It is source-ready but not deployed or bound to `autonomousresourcemanagement.xyz`; source completion must remain separate from any owner-approved hosting or domain cutover.

## Local preview

Run the package with any static HTTP server. For example:

```bash
cd flagship
python3 -m http.server 8080
```

Visit `http://localhost:8080/`. Do not use `file://` for interaction testing because browser policies can differ from a hosted static site.

## Package contents

| Path | Responsibility |
|---|---|
| `index.html` | Executive landing page and local-only trace-record verifier. |
| `decision-rights/`, `resource-observability/`, `traceable-records/`, `governed-autonomy/`, `accountable-escalation/`, `capability-system/`, `faq/` | Original, route-level executive content silos. |
| `site.css`, `site.js` | Shared semantic visual/interaction system, with no framework or build requirement. |
| `assets/` | Original explanatory SVGs and licensed/carry-forward visual assets. |
| `robots.txt`, `sitemap.xml`, `404.html`, `site.webmanifest` | Portable discovery and recovery records. |
| `scripts/validate-static.mjs` | Production-readiness validator. |

## Non-negotiable property boundaries

This property is an executive operating-guidance surface. It is not the `.com` reference property, the AI Mastery learning property, or the participation portal. Each route uses a self-referencing `.xyz` canonical. Do not add cross-domain canonicals, convert property links into redirects, or copy another property’s core content.

## Validation

Run:

```bash
node scripts/validate-static.mjs
node scripts/test-site-js.mjs
```

The validator checks expected routes, metadata, self-canonicals, robots/sitemap coverage, asset paths, JSON-LD syntax, SVG alternatives, static interaction boundaries, and prohibited runtime/dependency markers. The interaction test exercises the local verifier’s initial, complete, and incomplete states plus the accessible mobile-navigation state. Neither test deploys, changes DNS, enables analytics, nor contacts an external service.

## Deployment state

The intended production origin is documented only for self-canonical metadata: `https://autonomousresourcemanagement.xyz/`. Deployment, DNS, Vercel source changes, Search Console actions, and analytics require a separate explicit owner confirmation after the full package has passed review.
