# Flagship static deployment contract

The `flagship/` directory is portable static source. It can be previewed directly for editorial review, but a public deployment must be rendered with an explicit origin and indexing policy before it is uploaded to a host.

## Preview build

Use a non-production HTTPS origin and keep indexing disabled. The command produces only public HTML, CSS, JavaScript, images, manifest, robots, and sitemap files; it excludes source documents and validation scripts.

```bash
ARM_SITE_ORIGIN=https://arm-flagship-preview.pages.dev \
ARM_ALLOW_INDEXING=false \
ARM_STATIC_OUTPUT=/tmp/arm-flagship-preview \
node scripts/prepare-static-site.mjs

ARM_SITE_ORIGIN=https://arm-flagship-preview.pages.dev \
ARM_ALLOW_INDEXING=false \
ARM_STATIC_ROOT=/tmp/arm-flagship-preview \
node scripts/validate-static.mjs
```

The preview renderer applies self-referencing preview canonicals, `noindex,nofollow` meta directives, and a `Disallow: /` robots policy. It does not alter the source package, attach a custom domain, create analytics, collect data, or activate a commercial contact path.

## Production build

Production is an owner-controlled action. Run it only after the intended hostname, canonical-host redirect, source revision, DNS plan, TLS readiness, and release acceptance are approved.

```bash
ARM_SITE_ORIGIN=https://autonomousresourcemanagement.xyz \
ARM_ALLOW_INDEXING=true \
ARM_STATIC_OUTPUT=/tmp/arm-flagship-production \
node scripts/prepare-static-site.mjs

ARM_SITE_ORIGIN=https://autonomousresourcemanagement.xyz \
ARM_ALLOW_INDEXING=true \
ARM_STATIC_ROOT=/tmp/arm-flagship-production \
node scripts/validate-static.mjs
```

The rendered directory, not the working source directory, is the host-upload artifact. Preserve the source commit SHA and the generated `.arm-deployment-manifest.json` with any release record.
