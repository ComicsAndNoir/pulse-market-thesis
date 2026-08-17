import { createTheme, alpha } from '@mui/material/styles';

/**
 * theme.ts — Napster brand tokens mapped onto Material Design 3 (via MUI).
 * ---------------------------------------------------------------------------
 * Pulled directly from napster.com's production CSS (Webflow bundle at
 * cdn.prod.website-files.com/.../napsternew.shared.*.min.css), not guessed:
 *
 *   - Accent: brand pink `#BE369D` (primary CTA fill, e.g. `.pink-button`,
 *     `.nnw-download-app-btn`) and a lighter eyebrow pink `#DD52CB` used
 *     specifically on uppercase tracked-out labels (`.crew-heading` etc.).
 *   - Surface: near-black `#070707` (`--color-bg-elevated`).
 *   - Text: white primary, secondary at `#ffffff80` (50% white) — confirms
 *     the near-black / high-contrast-white direction already in use here.
 *   - Fonts: body is `Inter` (confirmed exact match — already self-hosted
 *     below). Display/headline face is `Avantt`, a proprietary licensed
 *     typeface served from Napster's own CDN — we reference it by name with
 *     Napster's own fallback chain, but do not embed/redistribute the font
 *     files, since we don't hold a license to them. Space Grotesk (already
 *     self-hosted) is the shipped stand-in when Avantt isn't available.
 *
 * Napster has no dark/negative semantic color on their marketing site to
 * confirm against, so `kill` remains our own reasoned choice.
 */

/* ----------------------------- BRAND TOKENS ------------------------------ */

const BRAND = {
  // Surfaces — MD3 tonal elevation on near-black.
  bg: '#070707',
  surface: '#141418',
  surfaceContainer: '#1A1A1F',
  surfaceContainerHigh: '#22222A',
  // Text.
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.5)',
  divider: 'rgba(255,255,255,0.15)',
  // Monochrome "primary" — filled controls read white-on-black (premium dark UI).
  // Deliberate: everything stays quiet so the single brand-pink accent is the
  // one thing that pops (winner state, positive signal).
  primary: '#F2F2F4',
  // Confirmed brand pink — primary CTA color on napster.com.
  BRAND_ACCENT: '#BE369D',
  // Confirmed lighter pink used specifically on napster.com's uppercase eyebrow labels.
  eyebrowAccent: '#DD52CB',
  // Confirmed real display typeface (Avantt, proprietary/not embedded) with
  // Space Grotesk as the self-hosted stand-in, then Napster's own fallback.
  displayFontFamily: '"Avantt", "Space Grotesk", Arial, sans-serif',
  // Semantic (no brand source for this — our own reasoned choice).
  kill: '#E5484D',
  runnerUp: '#B8B8C2',
} as const;

/* ------------------------------- THEME ----------------------------------- */

export const pulseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: BRAND.primary,
      contrastText: BRAND.bg,
    },
    secondary: {
      main: BRAND.BRAND_ACCENT,
      contrastText: BRAND.bg,
    },
    background: {
      default: BRAND.bg,
      paper: BRAND.surface,
    },
    text: {
      primary: BRAND.textPrimary,
      secondary: BRAND.textSecondary,
    },
    divider: BRAND.divider,
    error: { main: BRAND.kill },
    warning: { main: BRAND.BRAND_ACCENT },
  },
  shape: {
    // MD3 leans on generous rounding; keep it confident but not bubbly.
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    // MD3 display / headline roles use the characterful geometric face.
    h1: { fontFamily: BRAND.displayFontFamily, fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontFamily: BRAND.displayFontFamily, fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: BRAND.displayFontFamily, fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: BRAND.displayFontFamily, fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontFamily: BRAND.displayFontFamily, fontWeight: 600 },
    h6: { fontFamily: BRAND.displayFontFamily, fontWeight: 600 },
    // Body + data use Inter for dense-number legibility.
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none' },
    // The brand tell: uppercase, tracked-out eyebrow labels.
    overline: {
      fontFamily: BRAND.displayFontFamily,
      fontWeight: 600,
      fontSize: '0.72rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${BRAND.divider}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: BRAND.surfaceContainer,
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: BRAND.surfaceContainerHigh,
          border: `1px solid ${BRAND.divider}`,
          color: BRAND.textPrimary,
          fontSize: '0.8rem',
          lineHeight: 1.5,
          maxWidth: 320,
          padding: '10px 12px',
        },
        arrow: { color: BRAND.surfaceContainerHigh },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: { height: 6 },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: `0 0 0 8px ${alpha(BRAND.primary, 0.16)}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: BRAND.divider },
        head: {
          fontFamily: BRAND.displayFontFamily,
          fontWeight: 600,
          color: BRAND.textSecondary,
        },
      },
    },
  },
});

// Re-export raw tokens for components that need brand colors outside the palette.
export const brandTokens = BRAND;
