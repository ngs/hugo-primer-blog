(function () {
  "use strict";

  const STORAGE_KEY = "theme";
  const THEMES = ["auto", "light", "dark"];

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      if (theme === "auto") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch (e) {
      // localStorage not available
    }
  }

  function getSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    const html = document.documentElement;

    if (theme === "auto") {
      html.setAttribute("data-color-mode", "auto");
      html.setAttribute("data-light-theme", "light");
      html.setAttribute("data-dark-theme", "dark");
    } else {
      html.setAttribute("data-color-mode", theme);
      html.setAttribute("data-light-theme", theme);
      html.setAttribute("data-dark-theme", theme);
    }

    updateIcon(theme);
  }

  function updateIcon(theme) {
    const toggleButton = document.getElementById("theme-toggle");
    const lightIcon = document.querySelector(".theme-icon-light");
    const darkIcon = document.querySelector(".theme-icon-dark");
    const autoIcon = document.querySelector(".theme-icon-auto");

    // Update icons
    if (lightIcon && darkIcon && autoIcon) {
      lightIcon.style.display = "none";
      darkIcon.style.display = "none";
      autoIcon.style.display = "none";

      if (theme === "auto") {
        autoIcon.style.display = "block";
      } else if (theme === "light") {
        lightIcon.style.display = "block";
      } else {
        darkIcon.style.display = "block";
      }
    }

    // Update tooltip (aria-label is used by CSS tooltip)
    if (toggleButton) {
      const key = "tooltip" + theme.charAt(0).toUpperCase() + theme.slice(1);
      const tooltip = toggleButton.dataset[key];
      if (tooltip) {
        toggleButton.setAttribute("aria-label", tooltip);
      }
    }
  }

  function getCurrentTheme() {
    const stored = getStoredTheme();
    if (stored && THEMES.includes(stored)) {
      return stored;
    }
    return "auto";
  }

  function cycleTheme() {
    const current = getCurrentTheme();
    const currentIndex = THEMES.indexOf(current);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];

    setStoredTheme(nextTheme);
    applyTheme(nextTheme);
  }

  function init() {
    const theme = getCurrentTheme();
    applyTheme(theme);

    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", cycleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", function () {
          if (getCurrentTheme() === "auto") {
            applyTheme("auto");
          }
        });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
