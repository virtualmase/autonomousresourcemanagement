/* ARM Builder governance gate: portable static checks, no credentials, no deployment authority. */

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const requiredFiles = [
  "portal/index.html",
  "portal/404.html",
  "portal/style.css",
  "portal/app.js",
  "portal/README.md",
  "docs/entity-registry.yml",
  "docs/capability-registry.yml",
  "ci/governance/telemetry-thresholds.json",
];
const failures = [];
const checks = [];

async function exists(relativePath) {
  try {
    await access(resolve(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function addCheck(id, passed, message) {
  checks.push({ id, passed, message });
  if (!passed) failures.push(`${id}: ${message}`);
}

for (const relativePath of requiredFiles) {
  addCheck(`required-file:${relativePath}`, await exists(relativePath), `Required file is present: ${relativePath}`);
}

const [portalHtml, portalCss, portalScript, registry, thresholds] = await Promise.all([
  readFile(resolve(root, "portal/index.html"), "utf8"),
  readFile(resolve(root, "portal/style.css"), "utf8"),
  readFile(resolve(root, "portal/app.js"), "utf8"),
  readFile(resolve(root, "docs/entity-registry.yml"), "utf8"),
  readFile(resolve(root, "ci/governance/telemetry-thresholds.json"), "utf8"),
]);

addCheck("portal:pre-host-robots", portalHtml.includes('meta name="robots" content="noindex, nofollow"'), "Portal is intentionally non-indexable until it receives its own hostname.");
addCheck("portal:no-premature-canonical", !/<link[^>]+rel="canonical"/i.test(portalHtml), "Portal has no canonical before an independent hostname is selected.");
addCheck("portal:durable-contribution-route", portalHtml.includes("capability-work.yml") && portalHtml.includes("/discussions"), "Portal routes bounded work to Issues and open-ended discussion to Discussions.");
addCheck("portal:authored-type-system", ["Hedvig Letters Serif", "Schibsted Grotesk", "Fragment Mono"].every((font) => portalCss.includes(font)), "Portal preserves the documented three-layer type system.");
addCheck("portal:no-vite-runtime", ![portalHtml, portalCss, portalScript].some((file) => /vite/i.test(file)), "Portal contains no Vite runtime or dependency reference.");
addCheck("registry:self-canonical-rule", registry.includes("Each indexable property page uses a self-referencing canonical URL."), "Entity registry retains self-canonical rule.");
addCheck("registry:no-cross-property-duplication", registry.includes("Substantially duplicative pages are prohibited across properties."), "Entity registry retains anti-duplication rule.");

let thresholdPolicy;
try {
  thresholdPolicy = JSON.parse(thresholds);
  addCheck("telemetry:valid-policy", Boolean(thresholdPolicy.schema_version === 1 && thresholdPolicy.thresholds), "Telemetry threshold policy is valid and versioned.");
  addCheck("telemetry:privacy-boundary", Array.isArray(thresholdPolicy.privacy?.prohibited_fields) && thresholdPolicy.privacy.prohibited_fields.includes("access tokens"), "Telemetry policy explicitly prohibits credential collection.");
} catch {
  addCheck("telemetry:valid-policy", false, "Telemetry threshold policy is valid JSON.");
}

const report = {
  schemaVersion: 1,
  eventType: "builder.governance_gate.evaluated",
  evaluatedAt: new Date().toISOString(),
  repository: process.env.GITHUB_REPOSITORY ?? "local",
  sourceSha: process.env.GITHUB_SHA ?? "local-uncommitted",
  propertyId: "arm-portal",
  passed: failures.length === 0,
  checks,
  failures,
};

await mkdir(resolve(root, "ci-artifacts"), { recursive: true });
await writeFile(resolve(root, "ci-artifacts/governance-gate.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (failures.length) process.exitCode = 1;
