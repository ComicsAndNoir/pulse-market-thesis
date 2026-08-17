import { Box, Typography } from '@mui/material';
import { brandTokens } from '../theme/theme';

/**
 * NapsterWordmark — a clean, self-contained wordmark lockup.
 *
 * We render the name in the brand's display face rather than hotlinking
 * Napster's CDN SVG (which is fragile and can fail to load). The small ringed
 * mark echoes the "agent presence" motif. If you want the exact official logo,
 * drop napster-logo.svg into /public and swap this component for an <img>.
 */
export function NapsterWordmark() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        component="svg"
        viewBox="0 0 32 32"
        sx={{ width: 26, height: 26, flexShrink: 0 }}
        aria-hidden
      >
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="none"
          stroke={brandTokens.textPrimary}
          strokeWidth="2.4"
        />
        <circle cx="16" cy="16" r="3.4" fill={brandTokens.BRAND_ACCENT} />
      </Box>
      <Typography
        component="span"
        sx={{
          fontFamily: brandTokens.displayFontFamily,
          fontWeight: 700,
          fontSize: '1.15rem',
          letterSpacing: '-0.01em',
          color: brandTokens.textPrimary,
        }}
      >
        napster
      </Typography>
    </Box>
  );
}
