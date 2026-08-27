/* ARM Builder Governance Lab: local-only simulation of a bounded reviewed DOM update. */

const TYPE_PRESETS = Object.freeze({
  decision: "type-decision",
  working: "type-working",
  trace: "type-trace",
});

const ALLOWED_TARGETS = Object.freeze({
  "portal-principle": { propertyId: "arm-portal", selector: "#portal-principle", allowedPresets: ["decision", "working"] },
  "portal-status": { propertyId: "arm-portal", selector: "#portal-status", allowedPresets: ["trace"] },
});

const scenarios = Object.freeze({
  approved: {
    propertyId: "arm-portal", targetId: "portal-principle", typePreset: "decision", reviewer: "independent-maintainer",
    text: "Work becomes trustworthy when its limits are legible.", gates: [true, true, true, true],
  },
  "self-review": {
    propertyId: "arm-portal", targetId: "portal-principle", typePreset: "decision", reviewer: "builder-example",
    text: "This update must stop before it reaches the record.", gates: [true, true, true, true],
  },
  "wrong-property": {
    propertyId: "arm-flagship", targetId: "portal-principle", typePreset: "decision", reviewer: "independent-maintainer",
    text: "A portal target cannot be altered under another property’s authority.", gates: [true, true, true, true],
  },
  markup: {
    propertyId: "arm-portal", targetId: "portal-principle", typePreset: "decision", reviewer: "independent-maintainer",
    text: "<img src=x onerror=alert('unsafe')>", gates: [true, true, true, true],
  },
});

const auditEvents = [];
const form = document.querySelector("#change-form");
const formInputs = {
  workRecordId: document.querySelector("#work-record"), commitSha: document.querySelector("#commit-sha"), propertyId: document.querySelector("#property-id"),
  targetId: document.querySelector("#target-id"), typePreset: document.querySelector("#type-preset"), reviewer: document.querySelector("#reviewer"), text: document.querySelector("#proposed-text"),
  gates: [document.querySelector("#property-boundary"), document.querySelector("#claim-review"), document.querySelector("#security-review"), document.querySelector("#independent-review")],
};
const result = document.querySelector("#run-result");
const auditList = document.querySelector("#audit-list");
const eventOutput = document.querySelector("#event-output");
const previewSurface = document.querySelector("#preview-surface");
const viewportSlider = document.querySelector("#viewport-slider");
const viewportOutput = document.querySelector("#viewport-output");
const characterCount = document.querySelector("#character-count");

function assert(condition, code, message) {
  if (!condition) throw Object.assign(new Error(message), { code });
}

function makeChangeRecord() {
  return {
    capability: "Builder",
    author: "builder-example",
    workRecordId: formInputs.workRecordId.value.trim(),
    commitSha: formInputs.commitSha.value.trim(),
    propertyId: formInputs.propertyId.value,
    targetId: formInputs.targetId.value,
    typePreset: formInputs.typePreset.value,
    text: formInputs.text.value.trim(),
    approval: { status: formInputs.gates[3].checked ? "approved" : "pending", reviewer: formInputs.reviewer.value.trim(), expiresAt: "2030-01-01T00:00:00.000Z" },
    governanceGate: {
      propertyBoundary: formInputs.gates[0].checked ? "passed" : "pending",
      publicClaimReview: formInputs.gates[1].checked ? "passed" : "pending",
      securityReview: formInputs.gates[2].checked ? "not-required" : "pending",
    },
  };
}

function validateChange(change) {
  assert(change.capability === "Builder", "CAPABILITY_INVALID", "Only a Builder work record may use this executor.");
  assert(/^#\d+$/.test(change.workRecordId), "WORK_RECORD_MISSING", "A valid GitHub work-record number is required.");
  assert(/^[0-9a-f]{40}$/i.test(change.commitSha), "COMMIT_INVALID", "A full reviewed 40-character source SHA is required.");
  assert(change.approval.status === "approved", "REVIEW_PENDING", "An independent review must be current.");
  assert(change.approval.reviewer && change.approval.reviewer !== change.author, "SELF_REVIEW", "The reviewer must be named and independent from the Builder.");
  assert(new Date(change.approval.expiresAt) > new Date(), "APPROVAL_EXPIRED", "The review approval has expired.");
  assert(change.governanceGate.propertyBoundary === "passed", "PROPERTY_GATE_PENDING", "The property-boundary gate is unresolved.");
  assert(change.governanceGate.publicClaimReview === "passed", "CLAIM_GATE_PENDING", "The public-claim gate is unresolved.");
  assert(["passed", "not-required"].includes(change.governanceGate.securityReview), "SECURITY_GATE_PENDING", "The security-review gate is unresolved.");
  const target = ALLOWED_TARGETS[change.targetId];
  assert(target, "TARGET_NOT_ALLOWED", "The requested DOM target is not allow-listed.");
  assert(target.propertyId === change.propertyId, "PROPERTY_SCOPE_MISMATCH", "Target and property authority do not match.");
  assert(target.allowedPresets.includes(change.typePreset), "TYPE_PRESET_NOT_ALLOWED", "This semantic type preset is not allowed for the requested target.");
  assert(change.text.length > 0 && change.text.length <= 280, "TEXT_OUT_OF_RANGE", "Replacement text must be between 1 and 280 characters.");
  assert(!/[<>]/.test(change.text), "MARKUP_REJECTED", "Replacement text may not contain markup characters.");
  return target;
}

function recordEvent(status, payload) {
  const event = Object.freeze({
    eventType: status === "success" ? "builder.dom_update.applied" : "builder.dom_update.blocked",
    eventVersion: 1,
    occurredAt: new Date().toISOString(),
    correlationId: crypto.randomUUID(),
    localOnly: true,
    ...payload,
  });
  auditEvents.unshift(event);
  auditEvents.splice(5);
  eventOutput.textContent = JSON.stringify(event, null, 2);
  auditList.innerHTML = auditEvents.map((audit) => {
    const eventClass = audit.eventType.endsWith("applied") ? "success" : "blocked";
    const label = audit.eventType.endsWith("applied") ? "Update applied" : "Update blocked";
    const detail = audit.reasonCode ? `${audit.reasonCode} — ${audit.message}` : `${audit.targetId} · ${audit.typePreset} · ${audit.workRecordId}`;
    return `<li class="${eventClass}"><time>${new Date(audit.occurredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</time><div><b>${label}</b><p>${detail}</p></div></li>`;
  }).join("");
  return event;
}

function applySafeUpdate(change) {
  const targetRule = validateChange(change);
  const target = document.querySelector(targetRule.selector);
  assert(target, "DOM_TARGET_MISSING", "The allow-listed DOM element is not present.");
  const before = target.textContent;
  target.textContent = change.text;
  target.className = TYPE_PRESETS[change.typePreset];
  target.dataset.workRecord = change.workRecordId;
  target.dataset.commit = change.commitSha.slice(0, 12);
  target.dataset.updatedAt = new Date().toISOString();
  return recordEvent("success", {
    propertyId: change.propertyId, capability: change.capability, workRecordId: change.workRecordId, commitSha: change.commitSha,
    targetId: change.targetId, typePreset: change.typePreset, author: change.author, reviewer: change.approval.reviewer,
    before: before.slice(0, 280), after: change.text, governanceGates: change.governanceGate,
  });
}

function setResult(message, state) {
  result.textContent = message;
  result.className = `run-result ${state}`;
}

function execute() {
  const change = makeChangeRecord();
  try {
    const event = applySafeUpdate(change);
    document.querySelector("#portal-status").textContent = `AUDIT ${event.correlationId.slice(0, 8)} / REVIEWED`;
    setResult(`PASS — bounded update applied with audit ${event.correlationId.slice(0, 8)}.`, "is-success");
  } catch (error) {
    const event = recordEvent("blocked", {
      propertyId: change.propertyId, capability: change.capability, workRecordId: change.workRecordId || "unavailable",
      targetId: change.targetId, typePreset: change.typePreset, reasonCode: error.code ?? "UNKNOWN_FAILURE", message: error.message,
    });
    document.querySelector("#portal-status").textContent = `AUDIT ${event.correlationId.slice(0, 8)} / BLOCKED`;
    setResult(`BLOCKED — ${error.code ?? "UNKNOWN_FAILURE"}: ${error.message}`, "is-failure");
  }
  refreshTokenReadouts();
}

function loadScenario(name) {
  const scenario = scenarios[name];
  formInputs.propertyId.value = scenario.propertyId;
  formInputs.targetId.value = scenario.targetId;
  formInputs.typePreset.value = scenario.typePreset;
  formInputs.reviewer.value = scenario.reviewer;
  formInputs.text.value = scenario.text;
  formInputs.gates.forEach((input, index) => { input.checked = scenario.gates[index]; });
  document.querySelectorAll(".scenario").forEach((button) => button.classList.toggle("is-active", button.dataset.scenario === name));
  updateCharacterCount();
}

function updateCharacterCount() { characterCount.textContent = `${formInputs.text.value.length} / 280 characters`; }

function setPreviewWidth() {
  const width = Number(viewportSlider.value);
  previewSurface.style.setProperty("--simulated-width", `${width}px`);
  previewSurface.style.setProperty("--lab-hero-size", `${width * 0.102}px`);
  previewSurface.style.setProperty("--lab-decision-size", `${width * 0.05}px`);
  viewportOutput.value = `${width}px`;
  refreshTokenReadouts();
}

function refreshTokenReadouts() {
  document.querySelector("#hero-size-value").textContent = `${Math.round(parseFloat(getComputedStyle(document.querySelector(".type-decision--hero")).fontSize))}px`;
  document.querySelector("#decision-size-value").textContent = `${Math.round(parseFloat(getComputedStyle(document.querySelector("#portal-principle")).fontSize))}px`;
  document.querySelector("#trace-size-value").textContent = `${Math.round(parseFloat(getComputedStyle(document.querySelector("#portal-status")).fontSize))}px`;
}

form.addEventListener("submit", (event) => { event.preventDefault(); execute(); });
formInputs.text.addEventListener("input", updateCharacterCount);
viewportSlider.addEventListener("input", setPreviewWidth);
document.querySelectorAll(".scenario").forEach((button) => button.addEventListener("click", () => loadScenario(button.dataset.scenario)));

loadScenario("approved");
setPreviewWidth();
recordEvent("blocked", { reasonCode: "AWAITING_EXECUTION", message: "No Builder update has been evaluated yet." });
