import { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { NapsterWordmark } from './NapsterWordmark';
import { AboutDialog } from './AboutDialog';
import { brandTokens } from '../theme/theme';
import { trackEvent } from '../lib/analytics';

export function AppBarHeader() {
  const [aboutOpen, setAboutOpen] = useState(false);

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
        <Tooltip title="About this dashboard" arrow>
          <IconButton
            size="small"
            aria-label="About this dashboard"
            onClick={() => {
              setAboutOpen(true);
              trackEvent('open_about');
            }}
            sx={{ color: 'text.secondary' }}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </AppBar>
  );
}
