/* ARM Builder rollback gate: a rollback may promote only a known-good source target after independent environment approval. */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const execFileAsync = promisify(execFile);
const [propertyId, incidentReference, knownGoodSha] = process.argv.slice(2);
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(propertyId === "arm-portal", "Rollback is only scoped to arm-portal in this workflow.");
assert(/^#\d+$/.test(incidentReference ?? ""), "Rollback requires a linked public incident or release-hold Issue number.");
assert(/^[0-9a-f]{40}$/i.test(knownGoodSha ?? ""), "Rollback requires a full immutable known-good SHA.");

if (!errors.length) {
  try {
    await execFileAsync("git", ["cat-file", "-e", `${knownGoodSha}^{commit}`]);
  } catch {
    errors.push("Known-good SHA is not a commit available in the checked-out repository history.");
  }
}

const result = {
  schemaVersion: 1,
  eventType: "builder.rollback_gate.evaluated",
  evaluatedAt: new Date().toISOString(),
  propertyId,
  incidentReference,
  knownGoodSha,
  passed: errors.length === 0,
  errors,
};

await mkdir(resolve(process.cwd(), "ci-artifacts"), { recursive: true });
await writeFile(resolve(process.cwd(), "ci-artifacts/rollback-gate.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
