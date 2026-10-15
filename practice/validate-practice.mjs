/* Public-practice validator: verifies that Virtualmase proof records remain factual, bounded, source-linked, and connected through reader-benefit paths. It performs no network calls and never modifies source. */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const practiceDir = resolve(root, "practice");
const recordsDir = resolve(practiceDir, "records");
const failures = [];
const notes = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (path) => existsSync(path) ? readFileSync(path, "utf8") : "";

const expected = new Map([
  ["RES-001-engagement-evidence.yml", "Researcher"],
  ["CON-001-learning-pathway.yml", "Content Developer"],
  ["PRO-001-governance-lab.yml", "Prototype"],
  ["BLD-001-flagship-package.yml", "Builder"],
  ["GRW-001-discovery-readiness.yml", "Grower"],
  ["MNT-001-governance-pipeline.yml", "Maintainer"],
  ["SWP-001-terminology-correction.yml", "Sweeper"]
]);
const recordFiles = existsSync(recordsDir) ? readdirSync(recordsDir).filter((name) => name.endsWith(".yml")).sort() : [];
expect(recordFiles.length === expected.size, `Expected ${expected.size} public-practice records; found ${recordFiles.length}.`);
for (const [filename, capability] of expected) {
  const source = read(resolve(recordsDir, filename));
  expect(source, `Missing record ${filename}.`);
  if (!source) continue;
  for (const field of ["id:", "title:", "capability:", "status: completed", "property:", "scope:", "purpose:", "decision_rights:", "within_scope:", "not_authorized:", "evidence:", "outcome:", "open_questions:", "correction_route:", "retention:"]) {
    expect(source.includes(field), `${filename}: missing required ${field} field.`);
  }
  expect(source.includes(`capability: ${capability}`), `${filename}: capability must be ${capability}.`);
  expect(source.includes("https://github.com/virtualmase/"), `${filename}: requires a public GitHub source reference.`);
  expect(source.includes("correction_route: https://github.com/virtualmase/"), `${filename}: correction route must be public and owned by the project.`);
  expect(!/\b(?:master of|guaranteed|fully secure|certified|proven at scale|dominates)\b/i.test(source), `${filename}: contains a prohibited unsupported expertise claim.`);
  notes.push(`✓ ${filename}`);
}

const practicePage = read(resolve(practiceDir, "index.html"));
expect(practicePage.includes('<link rel="canonical" href="https://autonomousresourcemanagement.com/practice/">'), "practice/index.html: canonical must self-reference the reference-property practice URL.");
expect(practicePage.includes('"@type":"CollectionPage"'), "practice/index.html: missing CollectionPage structured data.");
expect(!/\b(?:master of|guaranteed|fully secure|certified|proven at scale|dominates)\b/i.test(practicePage), "practice/index.html: contains a prohibited unsupported expertise claim.");
for (const filename of expected.keys()) expect(practicePage.includes(`records/${filename}`), `practice/index.html: missing link to ${filename}.`);
expect(existsSync(resolve(practiceDir, "style.css")), "practice/index.html: missing stylesheet.");
expect(existsSync(resolve(practiceDir, "QA.md")), "practice: missing local visual QA record.");

const sitemap = read(resolve(root, "sitemap.xml"));
expect(sitemap.includes("https://autonomousresourcemanagement.com/practice/"), "sitemap.xml: missing public-practice route.");
const reference = read(resolve(root, "index.html"));
expect(reference.includes('href="/practice/"'), "reference index: missing public-practice route.");
const portal = read(resolve(root, "portal/index.html"));
expect(portal.includes('https://autonomousresourcemanagement.com/practice/'), "portal: missing source practice route.");
const flagship = read(resolve(root, "flagship/index.html"));
expect(flagship.includes('https://autonomousresourcemanagement.com/practice/'), "flagship: missing source practice route.");
const learning = read(resolve(root, "../ai-mastery/learning/autonomous-resource-management/index.html"));
expect(learning.includes('https://autonomousresourcemanagement.com/practice/'), "AI Mastery ARM lesson: missing source practice route.");
for (const [name, source] of [["practice index", practicePage], ["portal", portal], ["flagship", flagship], ["AI Mastery ARM lesson", learning]]) {
  expect(source.includes('https://virtualmase.github.io/action-boundary-brief/'), `${name}: missing pre-action Action Boundary Brief route.`);
  expect(source.includes('https://virtualmase.github.io/ai-change-record/'), `${name}: missing post-change AI Change Record route.`);
}

if (failures.length) {
  console.error("Public-practice validation failed:\n" + failures.map((message) => ` - ${message}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Public-practice validation passed:\n" + notes.join("\n"));
  console.log("✓ practice index, authority boundaries, correction routes, sitemap, and property pathways");
}
