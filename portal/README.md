# ARM Participation Interface

This directory is the initial **portable, static participation-interface package** for the future ARM portal property. It is a real contribution surface: visitors can select a capability and open a durable GitHub Discussion or Capability work record. It is not a product simulation and does not claim to be a hosted application.

The portal hostname has not been selected. Therefore this package deliberately carries `noindex, nofollow` metadata and no canonical element. On deployment, the portal maintainer must set a portal-local canonical URL, replace `noindex, nofollow` with an intentional robots policy, add that hostname to `docs/entity-registry.yml`, create its own sitemap, and verify the property separately in Search Console.

## Local preview

Run the following from the repository root:

```bash
python3 -m http.server 8080 --directory portal
```

Then open `http://localhost:8080`. No package manager, framework runtime, build command, backend, authentication store, or proprietary service is required.

## Publishing boundary

Do not deploy this directory under the reference domain as a substitute for an independent portal. Assign it a distinct hostname first, update the entity registry through the published governance process, and give it an individual sitemap, analytics view, and self-canonical policy.
