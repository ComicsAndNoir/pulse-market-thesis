import { Box, Typography } from '@mui/material';
import { THESIS } from '../model/thesis';
import { brandTokens } from '../theme/theme';

/**
 * ThesisHeader — leads with the BET, not the framework.
 * The dashboard below is the defense of this sentence, not a neutral tool.
 */
export function ThesisHeader() {
  return (
    <Box sx={{ maxWidth: 880 }}>
      <Typography variant="overline" sx={{ color: brandTokens.eyebrowAccent }}>
        The recommendation
      </Typography>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mt: 1, mb: 1.5, fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.08 }}
      >
        {THESIS.thesisStatement}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.02rem', lineHeight: 1.6 }}>
        {THESIS.thesisContext}
      </Typography>
    </Box>
  );
}
