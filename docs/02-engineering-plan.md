# 02 · Engineering plan

## Governing principle: optimize for changing our mind

The content of this thesis moved several times during planning and will move again after
the interview. So the dominant design force is **cheap iteration**. The rule that follows
from it: *nothing about the thesis lives in the component tree.* Segments, dimensions,
weights, scores, rationales, and verdicts all live in one declarative object
(`src/model/thesis.ts`), and the entire UI is a pure function of it.

Refining the thesis is therefore a **data edit**, never a component rewrite.

## The core architecture

```
src/
├─ model/
│  ├─ thesis.ts   ← SINGLE SOURCE OF TRUTH (segments, dimensions, seeded data)
│  └─ scoring.ts  ← pure derivation: weights → normalized → composite → ranking
├─ theme/
│  └─ theme.ts    ← MUI (MD3) theme seeded from Napster brand tokens
├─ state/
│  └─ useThesisState.ts  ← the only stateful hook (weights + selection + URL sync)
├─ components/    ← dumb renderers over the model + derived state
└─ App.tsx        ← responsive layout composition
```

Key decisions:

- **Scores are keyed by `dimension.id`, not array index.** Adding, removing, or reordering
  a dimension can't silently corrupt a segment's data.
- **Composite and ranking are derived, never stored** (`scoring.ts`). Change a weight and
  the ranking recomputes — the live re-sort is *free*, not wired by hand.
- **Weights normalize at runtime**, so they never have to sum to 100 in the data and can
  never produce a NaN composite (guarded against an all-zero sum).
- **One stateful hook.** `useThesisState` holds the working weights and the selected
  segment; everything else is `useMemo`'d off `(model, weights)`.

## Stack & the Material Design decision

Because the demo deploys as a **public GitHub → Render static site** (not a sandboxed
artifact), we use the real thing rather than an approximation:

- **Vite + React + TypeScript** — fast dev server, hot reload, static output.
- **MUI v6** = authentic **Material Design 3** via a custom dark theme. `createTheme`
  takes the Napster accent as a palette seed and MD3 generates the tonal surfaces.
- **framer-motion** — the `layout` prop animates the ranking re-sort smoothly with almost
  no code. This is the "money shot" of the demo, and it's why we did **not** use MUI X
  DataGrid: a controlled table + animated leaderboard gives better tooltip and reorder
  control than DataGrid's instant, un-animated re-sort. (DataGrid remains the natural
  upgrade if column resize / sort-by-dimension is ever wanted.)
- **Self-hosted fonts** (`@fontsource/inter`, `@fontsource/space-grotesk`) — no external
  CDN request, so it works offline and renders identically on Render.

Dependencies are kept deliberately tight to minimize "works on my machine" risk the night
before an interview. No backend, no env vars, no browser storage.

## Component breakdown

Each is a pure renderer over the model + derived state:

- **AppBarHeader / NapsterWordmark** — brand lockup + unofficial-concept tag.
- **ThesisHeader** — the one-sentence bet, above the tool.
- **WeightPanel** — MD3 sliders, live normalization; the interaction that carries the demo.
- **RankingView** — the animated, re-sorting leaderboard with verdict chips.
- **ScoreMatrix** — segments × dimensions, each cell's rationale on hover.
- **WhatWouldHaveToBeTrue** — ROI skeleton + assumptions for the selected segment.
- **KillList** — the retired use cases with reasons; 1:1s is the headline.

## Verification done before handoff

- `npm install` — clean (259 packages).
- `npm run build` — passes strict TypeScript (`tsc -b`) + Vite build; ~160 KB gzipped.
- `npm run lint` — clean.
- Not verified in the build sandbox: a live visual screenshot (no browser available there).
  **Run `npm run dev` locally and eyeball it first** — especially the accent color.

## Quality floor

Responsive down to a single column; keyboard focus visible (MUI defaults + slider focus
ring); `prefers-reduced-motion` respected (framer-motion `useReducedMotion` + a CSS
fallback in `index.css`).

## Natural next steps (not built)

- Confirm the exact Napster brand tokens and drop them into `theme.ts`.
- Optional: a light/dark toggle, a "share this scenario" button (weights already URL-encoded),
  or MUI X DataGrid if per-dimension column sorting becomes useful.
