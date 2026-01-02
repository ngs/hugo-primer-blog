(function () {
  "use strict";

  function initCollapsible() {
    const collapsibles = document.querySelectorAll(".sidebar-collapsible");

    collapsibles.forEach(function (container) {
      const maxHeight = parseInt(container.dataset.maxHeight, 10) || 150;
      const contentHeight = container.scrollHeight;

      if (contentHeight <= maxHeight) return;

      // Create footer with toggle button
      const footer = document.createElement("div");
      footer.className = "sidebar-collapsible-footer mt-2 f6";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "sidebar-toggle-btn btn-link Link--secondary p-0 border-0 bg-transparent";
      toggleBtn.innerHTML =
        '<span class="sidebar-toggle-more">' +
        (container.dataset.labelMore || "Show more") +
        "</span>" +
        '<span class="sidebar-toggle-less" style="display: none;">' +
        (container.dataset.labelLess || "Show less") +
        "</span>";
      footer.appendChild(toggleBtn);

      // Add "view all" link if specified
      const viewAllUrl = container.dataset.viewAll;
      if (viewAllUrl) {
        const separator = document.createElement("span");
        separator.className = "mx-1";
        separator.textContent = "·";
        footer.appendChild(separator);

        const viewAllLink = document.createElement("a");
        viewAllLink.href = viewAllUrl;
        viewAllLink.className = "Link--secondary";
        viewAllLink.textContent = (container.dataset.labelViewAll || "View all") + " →";
        footer.appendChild(viewAllLink);
      }

      container.after(footer);

      // Collapse
      container.style.maxHeight = maxHeight + "px";
      container.classList.add("is-collapsed");

      toggleBtn.addEventListener("click", function () {
        const isCollapsed = container.classList.contains("is-collapsed");

        if (isCollapsed) {
          container.style.maxHeight = container.scrollHeight + "px";
          container.classList.remove("is-collapsed");
          toggleBtn.querySelector(".sidebar-toggle-more").style.display = "none";
          toggleBtn.querySelector(".sidebar-toggle-less").style.display = "";
        } else {
          container.style.maxHeight = maxHeight + "px";
          container.classList.add("is-collapsed");
          toggleBtn.querySelector(".sidebar-toggle-more").style.display = "";
          toggleBtn.querySelector(".sidebar-toggle-less").style.display = "none";
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsible);
  } else {
    initCollapsible();
  }
})();
