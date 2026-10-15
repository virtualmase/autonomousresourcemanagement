/* ARM flagship interaction test: minimal fake DOM exercises the local-only verifier and menu state without a browser framework, network call, storage API, or external dependency. */
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

class ClassList {
  constructor() { this.values = new Set(); }
  toggle(value) { if (this.values.has(value)) { this.values.delete(value); return false; } this.values.add(value); return true; }
  contains(value) { return this.values.has(value); }
}

class Element {
  constructor({ dataset = {}, attributes = {}, textContent = "" } = {}) {
    this.dataset = dataset;
    this.attributes = new Map(Object.entries(attributes));
    this.textContent = textContent;
    this.listeners = new Map();
    this.classList = new ClassList();
  }
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  click() { this.listeners.get("click")?.(); }
}

const checks = ["source", "scope", "decision right", "action", "outcome"].map((name) => new Element({ dataset: { recordCheck: name }, attributes: { "aria-pressed": "false" } }));
const menuButton = new Element({ attributes: { "aria-expanded": "false" } });
const mainNav = new Element();
const result = new Element({ dataset: { complete: "false" } });
const resultText = new Element();
const resultDetail = new Element();

const fakeDocument = {
  querySelector(selector) {
    return new Map([
      ["[data-menu-button]", menuButton],
      ["[data-main-nav]", mainNav],
      ["[data-record-result]", result],
      ["[data-record-result-text]", resultText],
      ["[data-record-result-detail]", resultDetail]
    ]).get(selector) ?? null;
  },
  querySelectorAll(selector) { return selector === "[data-record-check]" ? checks : []; }
};

const source = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../site.js"), "utf8");
runInNewContext(source, { document: fakeDocument });

function assert(condition, message) { if (!condition) throw new Error(message); }

assert(result.dataset.complete === "false", "Initial verifier state must be incomplete.");
assert(resultText.textContent.includes("source, scope, decision right, action, outcome missing"), "Initial verifier message must name all five missing record elements.");

checks.forEach((check) => check.click());
assert(result.dataset.complete === "true", "Verifier must become complete after all five represented elements are selected.");
assert(resultText.textContent === "All five review questions are represented in this example.", "Complete verifier state must not become a score, certification, or approval.");
assert(resultDetail.textContent.includes("not a certification, score, or production approval"), "Complete verifier state must preserve its authority boundary.");

checks[4].click();
assert(result.dataset.complete === "false", "Verifier must return to incomplete if a required element is removed.");
assert(resultText.textContent.includes("outcome missing"), "Incomplete verifier state must identify the newly missing question.");

menuButton.click();
assert(mainNav.classList.contains("is-open"), "Menu must open on first activation.");
assert(menuButton.getAttribute("aria-expanded") === "true", "Menu must expose open state to assistive technology.");
assert(menuButton.textContent === "Close", "Menu must expose its current action.");
menuButton.click();
assert(!mainNav.classList.contains("is-open"), "Menu must close on second activation.");
assert(menuButton.getAttribute("aria-expanded") === "false", "Menu must expose closed state to assistive technology.");

console.log("✓ site.js interaction tests passed: verifier initial/complete/incomplete states and accessible menu state");
