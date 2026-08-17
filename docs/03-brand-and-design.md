# 03 · Brand & design

## Napster's observable brand direction

napster.com is a Webflow site with a stark, cinematic identity:

- **Monochrome and dark** — near-black backgrounds, high-contrast white text, video hero.
- **Oversized display headings** in a clean geometric sans.
- **Uppercase, letter-spaced eyebrow labels** ("MEET YOUR CREW", "NAPSTER APP") — a strong,
  cheap-to-reuse brand tell.
- **Minimal chrome** — very little chromatic color; restraint is the aesthetic.

## What could and couldn't be extracted

The site's exact CSS colors and font files sit on a Webflow CDN that the build tooling
could not fetch, and the HTML normalizes to text before raw color/font declarations can be
read. So exact hex/font values were **not** lifted byte-for-byte. Rather than fake
"extracted" values (a wrong hex looks worse on a projector than an honest, well-chosen
one), the theme reproduces the **observable** direction faithfully and isolates the single
uncertain value.

## The one value to confirm

`src/theme/theme.ts` → `BRAND.BRAND_ACCENT` (currently `#E9B949`, a restrained gold used
only for the winner state and positive signal). Confirm it against Napster's internal
brand guide and change one line; the whole UI re-skins from it.

## The MD3 mapping (Napster seeds Material Design 3)

- **Dark mode by default**, using MD3 tonal *surface elevation* (surface → container →
  container-high) to create depth on near-black instead of light-mode paper shadows.
- **Monochrome primary** (`#F2F2F4`): filled controls read white-on-black — a premium
  dark-UI look that matches the brand and keeps sliders elegant.
- **Type scale = MD3 roles, Napster character.** Space Grotesk for Display/Headline/Title
  and the eyebrow overline; Inter for body and dense table numbers (legibility in the
  matrix). The uppercase tracked-out eyebrow is preserved as a brand signature.
- **Single accent** (the gold) reserved for the winner highlight, the ROI panel, and
  positive deltas. Kills use a restrained red. Everything else stays quiet — the winner is
  the one thing that pops.

## Design intent

Spend the boldness in one place: the animated, re-sorting leaderboard and the gold winner
state. Keep everything around it disciplined — hairline dividers, generous spacing, tabular
numerals, no decorative color. The result should read as a confident internal tool a
product org would actually use, not a candidate's flourish.

## Assets

- The wordmark is rendered as a **self-contained inline SVG lockup** (`NapsterWordmark.tsx`)
  rather than hotlinking Napster's CDN SVG (fragile, can fail to load). To use the exact
  official logo, drop `napster-logo.svg` into `/public` and swap the component for an `<img>`.
