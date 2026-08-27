/* ARM flagship interaction contract: progressive disclosure only. The trace verifier keeps all state in memory, uses textContent, makes no network calls, stores no visitor data, and never claims certification or an automatic risk decision. */
(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-button]");
  const mainNav = document.querySelector("[data-main-nav]");
  if (menuButton && mainNav) {
    const closeMenu = function (restoreFocus) {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
      if (restoreFocus) menuButton.focus();
    };

    const browserNavigation = typeof window !== "undefined" && typeof document.addEventListener === "function" && typeof mainNav.querySelectorAll === "function";
    if (browserNavigation) {
      const activePath = window.location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/") || "/";
      mainNav.querySelectorAll("a").forEach(function (link) {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/") || "/";
        if (linkPath === activePath) link.setAttribute("aria-current", "page");
      });
    }

    menuButton.addEventListener("click", function () {
      const open = mainNav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Close" : "Menu";
    });

    if (browserNavigation) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
          event.preventDefault();
          closeMenu(true);
        }
      });

      mainNav.addEventListener("click", function (event) {
        if (event.target.closest("a") && window.matchMedia("(max-width: 820px)").matches) closeMenu(false);
      });

      window.matchMedia("(min-width: 821px)").addEventListener("change", function (event) {
        if (event.matches) closeMenu(false);
      });
    }
  }

  const checks = Array.from(document.querySelectorAll("[data-record-check]"));
  const result = document.querySelector("[data-record-result]");
  const resultText = document.querySelector("[data-record-result-text]");
  const resultDetail = document.querySelector("[data-record-result-detail]");

  function updateRecordState() {
    if (!result || !resultText || !resultDetail || checks.length === 0) return;
    const missing = checks.filter(function (check) {
      return check.getAttribute("aria-pressed") !== "true";
    });

    if (missing.length === 0) {
      result.dataset.complete = "true";
      resultText.textContent = "All five review questions are represented in this example.";
      resultDetail.textContent = "This is a completeness prompt—not a certification, score, or production approval.";
      return;
    }

    result.dataset.complete = "false";
    const names = missing.map(function (check) { return check.dataset.recordCheck; });
    resultText.textContent = "Not reconstructable yet: " + names.join(", ") + " missing.";
    resultDetail.textContent = "Select each record element to see the minimum questions a later reviewer needs.";
  }

  checks.forEach(function (check) {
    check.addEventListener("click", function () {
      const selected = check.getAttribute("aria-pressed") === "true";
      check.setAttribute("aria-pressed", String(!selected));
      updateRecordState();
    });
  });

  updateRecordState();
}());
