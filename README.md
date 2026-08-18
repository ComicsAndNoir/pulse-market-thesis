# Pulse · First-Market Thesis

An interactive prioritization board that argues **which market Napster Pulse should enter first**.
Built as a concept exercise for the *Product Lead, Pulse* interview.

> **Unofficial concept.** Not affiliated with or endorsed by Napster. Every number in
> the app is an illustrative assumption to be validated with real buyers.

The board lets you drag the rubric weights and watch the ranking of candidate
conversations re-sort live. The seeded recommendation is **Exit / Churn Interviews**.

---

## Quick start (local, in VS Code)

**Prerequisites:** [Node.js](https://nodejs.org) 20+ (an `.nvmrc` pins 20 — run `nvm use` if you use nvm).

1. Unzip this folder into `~/Documents/GitHub/pulse-market-thesis`.
2. Open that folder in VS Code. When prompted, install the recommended extensions
   (ESLint + Prettier) — they're listed in `.vscode/extensions.json`.
3. In the VS Code terminal:
   ```bash
   npm install
   npm run dev
   ```
4. Open the printed URL (default http://localhost:5173). Hot-reload is on — every
   save updates the browser instantly.

**First thing to check:** the app compiles cleanly, but do a quick visual pass on load
to confirm it looks right.

### Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the hot-reload dev server               |
| `npm run build`   | Type-check + production build into `dist/`    |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | Run ESLint                                     |
| `npm run format`  | Format `src/` with Prettier                   |

---

## The brand

`src/theme/theme.ts` is seeded from values pulled directly out of napster.com's
production CSS: brand pink (`#BE369D` on CTAs, `#DD52CB` on eyebrow labels), the
near-black surface, and the confirmed fonts (Inter for body — self-hosted here
already; Avantt for display, which is proprietary and not embedded — Space Grotesk
stands in for it). See the comment block at the top of `theme.ts` for the sourcing.

## Analytics

GA4 (gtag.js) is loaded directly in `index.html`'s `<head>`, guarded by a plain
hostname check — it never loads or fires on `localhost`/`127.0.0.1`, so nothing
is sent while developing. `src/lib/analytics.ts` adds interaction events on top
of that (slider changes, resets, segment selection); it's a no-op wherever the
head script didn't run.

---

## How to change the thesis (this is the whole point)

The dashboard is a pure function of one data file. You almost never touch a component.

- **Re-weight the rubric** → edit `weight` values in `src/model/thesis.ts` (`DIMENSIONS`).
- **Add / retire a segment** → add or remove an entry in `SEGMENTS`.
- **Re-score a cell / change its reasoning** → edit `value` (1–5) and `rationale`.
- **Change the headline bet** → edit `THESIS.thesisStatement`.
- **Re-skin to the brand** → edit `src/theme/theme.ts`.

See `docs/` for the full spec, engineering plan, and an interview playbook.

---

## Deploy to Render (free static site)

1. Push this repo to GitHub (see below).
2. In Render: **New → Static Site**, connect the repo.
3. Settings:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Add a **Redirect/Rewrite rule**: Source `/*` → Destination `/index.html`, Action **Rewrite**.
5. Deploy. Every push to `main` auto-deploys.

Full walkthrough in `docs/04-deployment-render.md`.

### First push to GitHub

```bash
git init
git add .
git commit -m "Pulse First-Market Thesis dashboard"
git branch -M main
git remote add origin https://github.com/<you>/pulse-market-thesis.git
git push -u origin main
```

---

## Shareable weighting scenarios

The current weights are encoded in the URL (`?w=proof:20,roi:20,...`). Copy the URL after
you've set a weighting and it reopens in exactly that state — handy for a follow-up note
("here's the board weighted the way we discussed").

---

## Tech

Vite · React · TypeScript · MUI v6 (Material Design 3) · framer-motion · self-hosted Inter + Space Grotesk.
No backend, no environment variables, no browser storage — fully static. GA4 is the
one third-party script, and it's skipped entirely on localhost (see Analytics above).
