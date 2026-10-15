/* ARM Builder governance gate: evaluate trusted breach evidence and set a release hold; never deploy or roll back directly. */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const inputPath = resolve(root, process.argv[2] ?? "ci/governance/sample-telemetry-breach.json");
const policy = JSON.parse(await readFile(resolve(root, "ci/governance/telemetry-thresholds.json"), "utf8"));
const event = JSON.parse(await readFile(inputPath, "utf8"));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(event.event_type === "portal.telemetry.threshold_breached", "Unexpected event type.");
assert(event.property_id === "arm-portal", "Telemetry event targets a different property.");
assert(typeof event.release_sha === "string" && /^[0-9a-f]{40}$/i.test(event.release_sha), "Telemetry event requires a full release SHA.");
assert(typeof event.threshold_id === "string" && policy.thresholds[event.threshold_id], "Telemetry event references an unknown threshold.");
assert(typeof event.correlation_id === "string" && event.correlation_id.length >= 16, "Telemetry event requires a correlation ID.");
assert(typeof event.source_attestation_reference === "string" && event.source_attestation_reference.length >= 6, "Telemetry event requires a trusted source-attestation reference.");
assert(event.measurement_window?.started_at && event.measurement_window?.ended_at, "Telemetry event requires a measurement window.");
assert(!Object.keys(event).some((key) => /token|cookie|ip_address|user_agent|security_report/i.test(key)), "Telemetry event includes a prohibited sensitive field.");

const threshold = policy.thresholds[event.threshold_id];

function meetsThreshold(id, payload, rule) {
  if (id === "synthetic_availability") return Number(payload.observed_value) >= Number(rule.minimum_independent_probes);
  if (id === "content_security_policy") return Number(payload.observed_value) >= 1;
  if (id === "uncaught_client_error") return Number(payload.observed_value) >= 5 && Number(payload.unique_sessions) >= Number(rule.minimum_unique_sessions);
  if (id === "governance_integrity") return payload.observed_value === "mismatch";
  return false;
}

assert(Boolean(threshold) && meetsThreshold(event.threshold_id, event, threshold), "Observed telemetry does not meet the configured breach threshold.");
const decision = {
  schemaVersion: 1,
  eventType: "builder.telemetry_gate.evaluated",
  evaluatedAt: new Date().toISOString(),
  correlationId: event.correlation_id,
  propertyId: event.property_id,
  releaseSha: event.release_sha,
  thresholdId: event.threshold_id,
  severity: threshold?.severity ?? "unknown",
  sourceAttestationReference: event.source_attestation_reference,
  validationPassed: errors.length === 0,
  action: errors.length === 0 ? "release_hold_and_human_rollback_review" : "ignore_untrusted_or_invalid_signal",
  errors,
};

await mkdir(resolve(root, "ci-artifacts"), { recursive: true });
await writeFile(resolve(root, "ci-artifacts/telemetry-decision.json"), `${JSON.stringify(decision, null, 2)}\n`);

if (process.env.GITHUB_OUTPUT) {
  await writeFile(process.env.GITHUB_OUTPUT, `decision=${decision.action}\nseverity=${decision.severity}\n`, { flag: "a" });
}

console.log(JSON.stringify(decision, null, 2));
if (errors.length) process.exitCode = 1;
