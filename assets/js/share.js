(function () {
  "use strict";

  const RESET_DELAY = 2000;

  function copyWithExecCommand(text) {
    return new Promise(function (resolve, reject) {
      const previous = document.activeElement;
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      // Fixed positioning keeps select() from scrolling the document.
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      let succeeded = false;
      try {
        succeeded = document.execCommand("copy");
      } catch (e) {
        succeeded = false;
      }

      document.body.removeChild(textarea);
      if (previous && typeof previous.focus === "function") {
        previous.focus();
      }

      if (succeeded) {
        resolve();
      } else {
        reject(new Error("copy command was unsuccessful"));
      }
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return copyWithExecCommand(text);
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
    const labelError = button.getAttribute("data-label-error");

    let resetTimer = null;
    let sharing = false;

    function reset() {
      label.textContent = labelDefault;
      if (status) status.textContent = "";
    }

    function announce(message) {
      label.textContent = message;

      if (status) {
        // Clear first so repeated announcements of the same string are still
        // picked up as a change by assistive technology.
        status.textContent = "";
        window.requestAnimationFrame(function () {
          status.textContent = message;
        });
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(reset, RESET_DELAY);
    }

    function copyFallback() {
      copyToClipboard(url).then(
        function () {
          announce(labelCopied);
        },
        function () {
          announce(labelError);
        }
      );
    }

    function onShareSettled(error) {
      sharing = false;
      // The reader dismissing the share sheet is not a failure.
      if (error && error.name === "AbortError") return;
      if (error) copyFallback();
    }

    label.textContent = labelDefault;
    button.hidden = false;

    button.addEventListener("click", function () {
      if (!canShare) {
        copyFallback();
        return;
      }

      // A share sheet is already open; a second click would otherwise be
      // rejected as a concurrent share and silently copy the link instead.
      if (sharing) return;
      sharing = true;

      let result;
      try {
        result = navigator.share({ title: title, url: url });
      } catch (e) {
        // Some engines throw synchronously rather than rejecting.
        sharing = false;
        copyFallback();
        return;
      }

      if (!result || typeof result.then !== "function") {
        sharing = false;
        return;
      }

      result.then(function () {
        onShareSettled(null);
      }, onShareSettled);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShare);
  } else {
    initShare();
  }
})();
