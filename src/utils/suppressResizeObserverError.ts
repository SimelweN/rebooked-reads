/**
 * Minimal ResizeObserver Error Suppression
 * Only suppresses known browser ResizeObserver loop limit errors
 */

// Store original console methods
const originalError = console.error;
const originalWarn = console.warn;

function isBenignResizeObserverMessage(text: string): boolean {
  const msg = text.toLowerCase();
  return (
    msg.includes("resizeobserver") && (
      msg.includes("loop limit exceeded") ||
      msg.includes("loop completed") ||
      msg.includes("undelivered notifications")
    )
  );
}

// Override console.error to suppress specific ResizeObserver errors
console.error = function (...args) {
  const message = args.map(String).join(" ");
  if (isBenignResizeObserverMessage(message)) {
    return; // Silently ignore this known browser quirk
  }
  originalError.apply(this, args as any);
};

// Also suppress via console.warn if it appears there
console.warn = function (...args) {
  const message = args.map(String).join(" ");
  if (isBenignResizeObserverMessage(message)) {
    return; // Ignore benign ResizeObserver warnings
  }
  originalWarn.apply(this, args as any);
};

// Also handle as a global error
window.addEventListener("error", (event) => {
  const message = (event.message || "").toLowerCase();
  if (isBenignResizeObserverMessage(message)) {
    event.preventDefault();
    return false as any;
  }
});

export {};
