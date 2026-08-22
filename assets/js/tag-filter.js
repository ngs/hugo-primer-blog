(function () {
  "use strict";

  function initTagFilter() {
    const root = document.querySelector("[data-tag-filter]");
    if (!root) return;

    const input = root.querySelector("[data-tag-filter-input]");
    const status = root.querySelector("[data-tag-filter-status]");
    const empty = root.querySelector("[data-tag-filter-empty]");
    const items = Array.prototype.slice.call(root.querySelectorAll("[data-tag-name]"));

    if (!input) return;

    const total = items.length;
    const template = status ? status.getAttribute("data-tag-filter-template") || "" : "";

    function render() {
      const query = input.value.trim().toLowerCase();
      let shown = 0;

      items.forEach(function (item) {
        const name = item.getAttribute("data-tag-name") || "";
        if (query === "" || name.indexOf(query) !== -1) {
          item.hidden = false;
          shown++;
        } else {
          item.hidden = true;
        }
      });

      if (status && template) {
        status.textContent = template
          .replace("__SHOWN__", String(shown))
          .replace("__TOTAL__", String(total));
      }

      if (empty) {
        empty.hidden = shown !== 0;
      }
    }

    input.addEventListener("input", render);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTagFilter);
  } else {
    initTagFilter();
  }
})();
