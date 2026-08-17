import { AppBar, Toolbar, Box, Typography, Chip, Divider } from '@mui/material';
import { NapsterWordmark } from './NapsterWordmark';
import { brandTokens } from '../theme/theme';

export function AppBarHeader() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(10,10,12,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${brandTokens.divider}`,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: { xs: 60, sm: 64 } }}>
        <NapsterWordmark />
        <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1.2 }}>
            Pulse
          </Typography>
          <Typography sx={{ fontFamily: brandTokens.displayFontFamily, fontWeight: 600, fontSize: '0.95rem' }}>
            First-Market Dashboard
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Chip
          label="Unofficial concept"
          size="small"
          variant="outlined"
          sx={{
            color: 'text.secondary',
            borderColor: brandTokens.divider,
            fontSize: '0.7rem',
            display: { xs: 'none', sm: 'flex' },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
