/**
 * Generic Analytics Wrapper
 * 
 * Future integrations with Google Analytics (GA4), Plausible,
 * or Mixpanel can be hooked into these functions.
 */

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event]: ${eventName}`, props || {});
  }
  // TODO: Add window.gtag or window.plausible here in production
};

export const trackPageView = (url: string) => {
  if (import.meta.env.DEV) {
    console.log(`[Analytics PageView]: ${url}`);
  }
  // TODO: Push to analytics router here
};
