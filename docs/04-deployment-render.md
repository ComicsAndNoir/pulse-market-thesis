# 04 · Deployment (Render) + GitHub + local VS Code

## Local, in VS Code

1. Unzip into `~/Documents/GitHub/pulse-market-thesis` and open the folder in VS Code.
2. Accept the recommended extensions prompt (ESLint + Prettier).
3. Terminal:
   ```bash
   nvm use            # optional; reads .nvmrc (Node 20)
   npm install
   npm run dev        # http://localhost:5173, hot reload
   ```
4. Eyeball it — confirm the accent color and layout look right before pushing.

## Push to GitHub

```bash
git init
git add .
git commit -m "Pulse First-Market Thesis dashboard"
git branch -M main
git remote add origin https://github.com/<you>/pulse-market-thesis.git
git push -u origin main
```

`node_modules/` and `dist/` are gitignored, so the first commit is clean.

## Deploy on Render (free Static Site)

A Vite build is just static assets, so use a **Static Site** (free tier), not a Web Service.

1. Render dashboard → **New → Static Site**.
2. Connect the GitHub repo.
3. Configure:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. **Add a rewrite rule** (Redirects/Rewrites tab):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: **Rewrite**

   This prevents 404s on refresh/deep links. Cheap insurance even without a router today.
5. Create — you get a `https://<name>.onrender.com` URL.

Every push to `main` auto-deploys. That's also your post-interview iteration loop:
feedback → edit `src/model/thesis.ts` → push → live in a minute or two.

## Sanity checks after first deploy

- Open the live URL; confirm fonts load (self-hosted, so they should) and the ranking
  animates when you drag a weight.
- Confirm the `?w=...` URL updates as you move sliders, and that reopening that URL
  restores the weighting.
- Confirm the footer disclaimer is present and the page is `noindex` (view source →
  `<meta name="robots" content="noindex, nofollow">`).
- Check GA Realtime for a page_view — this fires on every load, including
  `npm run dev`, so it's easy to verify locally too.

## Google Analytics

GA4 (gtag.js) is Google's standard snippet, hardcoded into `index.html`'s
`<head>` with Measurement ID `G-NEXQ3KXMY3` — it tracks page views on every
load, localhost included. `src/lib/analytics.ts` adds the click/slider events
(`adjust_weight`, `reset_weights`, `select_segment`) on top of that, via the
same `gtag()` the head script sets up.
