/**
 * analytics.ts — custom Google Analytics 4 event tracking.
 * ---------------------------------------------------------------------------
 * The base gtag.js snippet (page views) is loaded directly in index.html's
 * <head>, unconditionally — it tracks on localhost and every deployment.
 * This file only adds the custom interaction events (slider changes, resets,
 * segment selection) on top of that.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 event. */
export function trackEvent(action: string, params?: Record<string, string | number | boolean>): void {
  window.gtag?.('event', action, params);
}
