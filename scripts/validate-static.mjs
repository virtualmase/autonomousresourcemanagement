/* ARM Builder guardrail: validate portable static packages without a framework, build step, or hidden runtime. */

import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const requiredFiles = ["portal/index.html", "portal/404.html", "portal/style.css", "portal/app.js", "portal/README.md"];
const failures = [];

for (const relativePath of requiredFiles) {
  try {
    await access(resolve(root, relativePath));
  } catch {
    failures.push(`Missing required file: ${relativePath}`);
  }
}

const portalHtml = await readFile(resolve(root, "portal/index.html"), "utf8");
const portalCss = await readFile(resolve(root, "portal/style.css"), "utf8");
const portalScript = await readFile(resolve(root, "portal/app.js"), "utf8");

const checks = [
  [portalHtml.includes('meta name="robots" content="noindex, nofollow"'), "Portal remains non-indexable before a portal hostname is assigned."],
  [!portalHtml.match(/<link[^>]+rel="canonical"/i), "Portal has no premature canonical URL."],
  [portalHtml.includes("capability-work.yml"), "Portal links work entry to the durable capability issue form."],
  [portalHtml.includes("github.com/virtualmase/autonomousresourcemanagement/discussions"), "Portal links open-ended work to Discussions."],
  [portalCss.includes("Hedvig Letters Serif") && portalCss.includes("Schibsted Grotesk") && portalCss.includes("Fragment Mono"), "Portal uses the documented authored type system."],
  [!portalHtml.includes("vite") && !portalCss.includes("vite") && !portalScript.includes("vite"), "Portal contains no Vite dependency."],
];

for (const [passed, description] of checks) {
  if (!passed) failures.push(`Failed: ${description}`);
}

if (failures.length) {
  console.error("Static-package validation failed:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log(`Static-package validation passed (${requiredFiles.length} files, ${checks.length} policy checks).`);
}
