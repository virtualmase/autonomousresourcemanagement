/* ARM field-record visual language: interactions clarify work scope, never simulate autonomous authority. */

const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const cards = Array.from(document.querySelectorAll(".capability-card"));
const emptyState = document.querySelector(".filter-empty");

function setCapabilityFilter(filter) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = filter === "all" || card.dataset.categories.split(" ").includes(filter);
    card.classList.toggle("is-hidden", !matches);
    if (matches) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setCapabilityFilter(button.dataset.filter));
});
