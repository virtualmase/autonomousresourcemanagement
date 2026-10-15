# Static deployment and production verification

## Verified starting state — 15 October 2026

- Live homepage responds from Hostinger (`platform: hostinger`, `server: hcdn`).
- GitHub Pages API returned 404; the old CNAME did not establish Pages deployment.
- An active `webhooks.hostinger.com` GitHub hook exists. The existing root snapshot is retained; no hosting-source cutover is required by this PR. Confirm its branch filter before merging.
- Production differs from the original repository homepage. A local snapshot exists at `/tmp/arm-production-backup-20261015.html`; it is not a complete hosting backup.
- Hostinger account discovery timed out twice. Account identity, document root, integration, and server file inventory remain unverified.

## Release procedure

1. Run `npm ci`, `npm test`, `npm run check`, and browser checks on the exact release commit. Use the quality workflow's validated artifact or build locally.
2. Resolve the hosting account and root through Hostinger's website list. Inspect files, Git integration, redirects, verification files, and AURE subdomain relationships. Do not infer the document root.
3. Back up the existing root-site files and server configuration. The homepage snapshot alone cannot roll back a full release. Never replace a shared root blindly.
4. ZIP only `dist/` contents, with `index.html` and `.htaccess` at archive root. Merge existing server directives where necessary to preserve unrelated configuration.
5. Deploy through the static archive tool after resource mapping and any required approval. No production Node runtime is required.
6. Verify home, wiki, news, RSS, sitemap, machine-readable files, CSS, search, and verification file. Check the historical `/practice/` route remains available, nonexistent routes return 404, old archives are not exposed, and the separate AURE subdomain remains unchanged.
7. Run `node scripts/verify-production.mjs` to compare the live release with the local manifest. Clear stale hosting cache if needed and repeat only after investigating mismatches.
8. Record commit, artifact hash, time, and parity result. Restore the backed-up root release if verification fails.

Automatic production deployment is intentionally absent until hosting mapping and rollback are verified. News discovery cannot deploy.
