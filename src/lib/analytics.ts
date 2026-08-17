/**
 * analytics.ts — Google Analytics 4 (gtag.js).
 * ---------------------------------------------------------------------------
 * This is the standard Google-provided snippet:
 *
 *   <script async src="https://www.googletagmanager.com/gtag/js?id=G-NEXQ3KXMY3"></script>
 *   <script>
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments);}
 *     gtag('js', new Date());
 *     gtag('config', 'G-NEXQ3KXMY3');
 *   </script>
 *
 * — injected via JS instead of pasted into index.html, so it can be gated:
 * it loads and fires ONLY on a production build (`vite build`, which is what
 * Render serves) running on a real host. `npm run dev` and a local
 * `npm run preview` never load the GA script or send any event — no request
 * to Google happens while debugging on localhost. It will never show up in
 * "View Page Source" (that only shows HTML before JS runs, on any site) —
 * check the Network tab or Elements/DOM inspector on the live deploy instead.
 *
 * `gtag()` below uses rest params instead of the `arguments` object in
 * Google's snippet — this repo's lint config forbids `arguments` — but pushes
 * the exact same single array-like entry onto `dataLayer` per call.
 */
const GA_MEASUREMENT_ID = 'G-NEXQ3KXMY3';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
}

const analyticsEnabled = import.meta.env.PROD && !isLocalHost(window.location.hostname);

let initialized = false;

/** Injects gtag.js and fires the initial page_view. Call once on app start. */
export function initAnalytics(): void {
  if (!analyticsEnabled || initialized) return;
  initialized = true;

  // <script async src="https://www.googletagmanager.com/gtag/js?id=G-NEXQ3KXMY3"></script>
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

/** Fires a GA4 event. No-op outside a production deploy. */
export function trackEvent(action: string, params?: Record<string, string | number | boolean>): void {
  if (!analyticsEnabled) return;
  window.gtag?.('event', action, params);
}
