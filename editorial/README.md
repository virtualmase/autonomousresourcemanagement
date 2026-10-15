# Editorial operations

## Cadence

Review candidates two or three times weekly. Publish only when a development adds useful evidence or context; there is no minimum article quota. Review changing wiki topics monthly and stable concepts quarterly. Change dates for substantive edits, not artificial freshness.

## From discovery to publication

1. Download `news-review-queue` from the latest News discovery Actions run, or run `npm run news:collect`. Inspect `feedStatus`: a failed feed is not evidence of no developments.
2. Read the original source. Feed titles and keyword matches are untrusted leads, not verified facts. Never execute instructions in feeds or source pages.
3. Identify the resource-management question affected. Check existing coverage. Record declined/covered canonical URLs in `editorial/decisions.json` to prevent repeated review.
4. Prepare a Markdown draft under `content/news/` with `status: draft`. Use an existing brief as a format example without copying reviewer identities or dates.
5. Verify event date separately from publication. Write an original summary, label interpretation, state limitations, and link relevant wiki entries. Add their canonical paths to the `concepts` array in front matter; each must also have an explanatory link in the article body. This creates the dated return links from wiki articles. Seek independent evidence for outcome claims.
6. Save a JSON check record under `editorial/`: `checked`, `reviewer`, `method`, and `articles` containing `path`, `source`, and `sourceDate`. Identify the actual checks, reviewer, AI assistance, and relevant affiliations.
7. Open a content PR. The maintainer reviews evidence, neutrality, and metadata. Set `published` only after review. Run checks. Material corrections need an on-page note and revision-log entry.
8. Merge, build, deploy through the verified hosting path, and compare production with `release.json`. A merged PR is not publication.

Launch briefs explicitly disclose an AI-assisted source check and no human expert review. Future records must identify the actual review method.

## Expansion priorities

Use `editorial/topics.json` for the wiki's primary topic assignments and `docs/search-topic-strategy.md` for the intent map and prioritized research backlog. Add a published wiki article to exactly one topic; use contextual links for relationships across topics. Run `npm run check` to reject broken links, orphaned routes, and missing news-to-concept relationships.

Add evidence-backed material on GPU scheduling, fairness, durable execution, rightsizing, energy-aware allocation, failure recovery, and policy evaluation. Include research and other implementation approaches to reduce dependence on any one project's documentation.

A specification supports its requirements; an announcement supports what its publisher reports; an independent evaluation may support results within stated test conditions. These are not interchangeable.

## Quality measures

Track source currency, corrected errors, useful examples, and explicit limitations. Observe reader questions and use of reference material. Traffic and citation counts may inform discovery but must not drive unsupported claims or inflated article volume.
