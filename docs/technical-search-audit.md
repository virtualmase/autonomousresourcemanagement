# Technical search and schema audit

Property: autonomousresourcemanagement.com. Date: 16 October 2026.

## Baseline observed on production

- All 21 sitemap URLs returned HTML with HTTP 200, their exact apex HTTPS canonical, and no observed `noindex` header/tag or browser challenge in the public HTTP crawl. This is an ordinary client observation, not proof of what verified Googlebot receives.
- HTTP homepage redirects to HTTPS with 301. HTTPS www serves the same content with the apex canonical; it does not redirect. No DNS or hosting rules were changed. A host-level www redirect can be considered separately, but the canonical is already declared consistently.
- Homepage Lighthouse lab scores were 100 for performance, accessibility, best practices, and SEO. LCP was approximately 0.8 seconds, CLS 0, and total blocking time 10 milliseconds. The final screenshot showed the actual homepage. See `search-lab-baseline.json` for version/time and measured values. These are one-page lab results, not field Core Web Vitals, site-wide accessibility certification, or proof of ranking eligibility.
- Hostinger serves stylesheets with a seven-day browser cache lifetime. During PR #3 deployment, a verification request saw an older stylesheet. The new template uses a content-hashed CSS filename; the old path remains available for previously cached HTML.
- GSC Wizard refused access because its trial/subscription is inactive. No purchase was made. Native Google Search Console is free, but indexed status, Google-selected canonicals, actual query demand, and field performance have not been verified through it in this audit.

## Schema implementation

| Surface | Markup and relationship |
|---|---|
| Shared identity | One consistent WebSite, editorial Organization, and Person identity; ARM Editorial is an editorial identity, not an invented independent board. |
| Mason Nguyen | Person name and About anchor, with the LinkedIn `sameAs` supplied by the owner. LinkedIn blocked automated fetching; no credentials or employment details were inferred. |
| Every generated route | One self-identifying WebPage or appropriate subtype, linked to the WebSite. About uses AboutPage; search uses SearchResultsPage and remains noindex. |
| Wiki and framework | Article + TechArticle linked both ways to their WebPage. Existing authorship, revision date, and visible citations are retained. The framework remains an attributed proposal. |
| News | NewsArticle with visible publication/revision dates, actual attribution and source citations. Event dates are not substituted for publication dates. |
| Breadcrumbs | BreadcrumbList is generated from the same sequence used in the visible breadcrumb, including current page. |
| Wiki, news, sources | CollectionPage with ItemList, matching actual visible members and order. No ranking or rating semantics. |
| Historical practice | Existing CollectionPage retained; obsolete `#arm-term` reference replaced with the current definition URL, and website identity made explicit. |

No invented publication dates, logos, article images, reviews, ratings, certifications, qualifications, FAQs, or HowTo markup were added. Optional fields are omitted when the page does not substantiate them. Generated index pages omit sitemap lastmod rather than inheriting an unrelated article's freshness. Source articles retain their real revision dates.

`npm run check` validates 22 generated pages for unique titles/descriptions, canonicals, sitemap eligibility, graph identity/reference integrity, visible article metadata, breadcrumbs, and collection links. Historical practice receives an additional identity check. `npm test` includes negative fixtures for invented author references, invisible breadcrumb labels, and false update dates. `node scripts/audit-production-search.mjs` performs the repeatable public HTTP crawl. Local reports are written under `test-results/`.

These checks establish the repository's explicit contract; they do not replace Google's Rich Results Test or Search Console URL Inspection. Google may choose not to show rich results even for valid markup. An attempted Google Rich Results code test returned “Log in and try again”; no independent Google validation result was obtained. Source-only implementation is not evidence of live publication; verify the release manifest after merge.

## AI search eligibility and next priorities

Google states that AI Overviews and AI Mode use ordinary SEO foundations and require indexed, snippet-eligible pages; no special AI schema or new text file is required. Existing `llms.txt` is an optional reader aid, not a Google requirement or a citation guarantee.

The useful next work is substantive content: answer distinct reader questions, cite primary evidence close to the claim, distinguish observed results from interpretation, and keep dates and authorship accurate. The priority map is in `search-topic-strategy.md`. Do not manufacture numerous near-duplicate pages to cover variants.

The unverified external checks are actual indexed status/selected canonicals, real query/page performance, Google Rich Results Test outcomes, and field Core Web Vitals. Obtain authorized native Search Console reporting or exports without purchasing another connector. No Search Console submissions, analytics activation, hosting changes, or social posts were performed.

## Official guidance consulted

- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [General structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Article markup](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb markup](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Schema.org TechArticle](https://schema.org/TechArticle)
