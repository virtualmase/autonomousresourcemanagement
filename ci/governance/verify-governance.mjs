/* ARM Builder governance verification: exercises local success and fail-closed policy paths without external writes. */

import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(process.cwd());
const knownGoodSha = "2d8c2c89e11fc304852b594722bb1ae689a99644";
let failures = 0;

async function run(label, args, expectSuccess, expectation) {
  try {
    const { stdout, stderr } = await execFileAsync("node", args, { cwd: root });
    if (!expectSuccess) throw new Error(`${label} unexpectedly succeeded.\n${stdout}\n${stderr}`);
    console.log(`PASS  ${label}`);
  } catch (error) {
    const output = `${error.stdout ?? ""}\n${error.stderr ?? ""}`;
    if (expectSuccess || !expectation.test(output)) {
      failures += 1;
      console.error(`FAIL  ${label}\n${output || error.message}`);
      return;
    }
    console.log(`PASS  ${label} (correctly failed closed)`);
  }
}

const tempDir = await mkdtemp(resolve(tmpdir(), "arm-governance-"));
try {
  const breach = JSON.parse(await readFile(resolve(root, "ci/governance/sample-telemetry-breach.json"), "utf8"));
  const belowThreshold = { ...breach, observed_value: 1, correlation_id: "5521318a-bbee-447f-b334-210c20c8da58" };
  await writeFile(resolve(tempDir, "below-threshold.json"), `${JSON.stringify(belowThreshold, null, 2)}\n`);

  await run("static package policy", ["scripts/validate-static.mjs"], true, /./);
  await run("Builder governance gate", ["ci/governance/check-release-gates.mjs"], true, /./);
  await run("trusted threshold breach produces release hold", ["ci/governance/evaluate-telemetry.mjs", "ci/governance/sample-telemetry-breach.json"], true, /./);
  await run("below-threshold telemetry is ignored", ["ci/governance/evaluate-telemetry.mjs", resolve(tempDir, "below-threshold.json")], false, /Observed telemetry does not meet the configured breach threshold/);
  await run("known-good immutable rollback target", ["ci/governance/validate-rollback.mjs", "arm-portal", "#123", knownGoodSha], true, /./);
  await run("unknown rollback target is rejected", ["ci/governance/validate-rollback.mjs", "arm-portal", "#123", "0000000000000000000000000000000000000000"], false, /Known-good SHA is not a commit/);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

if (failures) process.exitCode = 1;
