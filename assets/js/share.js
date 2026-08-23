(function () {
  "use strict";

  const RESET_DELAY = 2000;

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    // Fallback for insecure contexts, where navigator.clipboard is undefined.
    return new Promise(function (resolve, reject) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      let succeeded = false;
      try {
        succeeded = document.execCommand("copy");
      } catch (e) {
        succeeded = false;
      }
      document.body.removeChild(textarea);

      if (succeeded) {
        resolve();
      } else {
        reject(new Error("copy command was unsuccessful"));
      }
    });
  }

  function initShare() {
    const root = document.querySelector("[data-share]");
    if (!root) return;

    const button = root.querySelector("[data-share-button]");
    const label = root.querySelector("[data-share-label]");
    const status = root.querySelector("[data-share-status]");
    if (!button || !label) return;

    const url = button.getAttribute("data-share-url") || window.location.href;
    const title = button.getAttribute("data-share-title") || document.title;
    const canShare = typeof navigator.share === "function";
    const labelDefault = canShare
      ? button.getAttribute("data-label-share")
      : button.getAttribute("data-label-copy");
    const labelCopied = button.getAttribute("data-label-copied");

    let resetTimer = null;

    function announceCopied() {
      label.textContent = labelCopied;
      if (status) status.textContent = labelCopied;

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(function () {
        label.textContent = labelDefault;
        if (status) status.textContent = "";
      }, RESET_DELAY);
    }

    function copyFallback() {
      copyToClipboard(url).then(announceCopied, function () {
        // Nothing left to fall back to; leave the button as it was.
      });
    }

    label.textContent = labelDefault;
    button.hidden = false;

    button.addEventListener("click", function () {
      if (!canShare) {
        copyFallback();
        return;
      }

      navigator.share({ title: title, url: url }).catch(function (error) {
        // The user dismissing the share sheet is not a failure.
        if (error && error.name === "AbortError") return;
        copyFallback();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShare);
  } else {
    initShare();
  }
})();
