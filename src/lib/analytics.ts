/**
 * Generic Analytics Wrapper
 *
 * Forwards to whichever analytics script is installed on the page.
 * Supports Plausible (`window.plausible`) and GA4 (`window.gtag`) out of the
 * box — add the corresponding <script> tag in index.html to activate one.
 */

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown>; u?: string }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event]: ${eventName}`, props || {});
    return;
  }
  window.plausible?.(eventName, props ? { props } : undefined);
  window.gtag?.("event", eventName, props || {});
};

export const trackPageView = (url: string) => {
  if (import.meta.env.DEV) {
    console.log(`[Analytics PageView]: ${url}`);
    return;
  }
  window.plausible?.("pageview", { u: url });
  window.gtag?.("event", "page_view", { page_path: url });
};
