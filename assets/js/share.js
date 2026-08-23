(function () {
  "use strict";

  const RESET_DELAY = 2000;
  // Ceiling on the in-flight lock, for engines that leave the share promise
  // pending forever instead of settling it.
  const SHARE_LOCK_TIMEOUT = 60000;

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

      let succeeded = false;
      try {
        textarea.select();
        // select() alone does not reliably set the selection on iOS.
        textarea.setSelectionRange(0, text.length);
        succeeded = document.execCommand("copy");
      } catch (e) {
        succeeded = false;
      } finally {
        // Must run even on an unexpected throw: an orphaned textarea is
        // invisible, holds focus, and swallows every later keystroke.
        document.body.removeChild(textarea);
        if (previous && typeof previous.focus === "function") {
          previous.focus({ preventScroll: true });
        }
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

    // The icon is aria-hidden, so a missing label would leave the button with
    // no accessible name. Leave it hidden instead, as it is without scripting.
    if (!labelDefault || !labelCopied || !labelError) return;

    let resetTimer = null;
    let statusFrame = null;
    let sharing = false;
    let shareGuard = null;
    let shareToken = 0;

    function clearStatus() {
      // A frame queued while the tab was hidden would otherwise run on return
      // and resurrect a stale announcement after reset() had cleared it.
      if (statusFrame !== null) {
        window.cancelAnimationFrame(statusFrame);
        statusFrame = null;
      }
      if (status) status.textContent = "";
    }

    function reset() {
      label.textContent = labelDefault;
      clearStatus();
    }

    function announce(message) {
      label.textContent = message;
      clearStatus();

      if (status) {
        // Clearing first means a repeated announcement of the same string is
        // still picked up as a change by assistive technology.
        statusFrame = window.requestAnimationFrame(function () {
          statusFrame = null;
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

    // Tokenised so a share that settles long after its watchdog released the
    // lock cannot unlock, or copy over, a newer one that is still in flight.
    function endShare(token) {
      if (token !== shareToken) return false;
      sharing = false;
      window.clearTimeout(shareGuard);
      shareGuard = null;
      return true;
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
      const token = ++shareToken;
      // Release the lock even if the promise never settles, so a wedged share
      // leaves a working button rather than a dead one.
      shareGuard = window.setTimeout(function () {
        endShare(token);
      }, SHARE_LOCK_TIMEOUT);

      let result;
      try {
        result = navigator.share({ title: title, url: url });
      } catch (e) {
        // Some engines throw synchronously rather than rejecting.
        endShare(token);
        copyFallback();
        return;
      }

      if (!result || typeof result.then !== "function") {
        endShare(token);
        return;
      }

      result.then(function () {
        endShare(token);
      }, function (error) {
        // A settle this late belongs to a share the watchdog already gave up
        // on; acting on it would disturb whichever share is current now.
        if (!endShare(token)) return;
        // The reader dismissing the share sheet is not a failure.
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
