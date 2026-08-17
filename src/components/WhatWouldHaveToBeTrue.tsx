import { Card, CardContent, Box, Typography, Chip, Stack, Divider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import type { RankedSegment } from '../model/scoring';
import { brandTokens } from '../theme/theme';

interface Props {
  selected: RankedSegment;
}

const modeLabel: Record<string, string> = {
  evidentiary: 'Evidentiary mode',
  exploratory: 'Exploratory mode',
  mixed: 'Mixed mode',
};

export function WhatWouldHaveToBeTrue({ selected }: Props) {
  const { segment } = selected;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          What would have to be true
        </Typography>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 0.5, flexWrap: 'wrap' }}
        >
          <Typography variant="h5" component="h2">
            {segment.name}
          </Typography>
          <Chip
            size="small"
            label={modeLabel[segment.mode]}
            variant="outlined"
            sx={{ borderColor: brandTokens.divider, color: 'text.secondary', fontSize: '0.7rem' }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, whiteSpace: 'pre-line' }}>
          {segment.tagline}
        </Typography>

        {segment.roi && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: alpha(brandTokens.BRAND_ACCENT, 0.08),
              border: `1px solid ${alpha(brandTokens.BRAND_ACCENT, 0.3)}`,
              mb: 2,
            }}
          >
            <Typography variant="overline" sx={{ color: brandTokens.eyebrowAccent }}>
              ROI skeleton
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
              Buyer: {segment.roi.buyer}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.6 }}>
              {segment.roi.math}
            </Typography>
          </Box>
        )}

        {segment.whatWouldHaveToBeTrue && segment.whatWouldHaveToBeTrue.length > 0 && (
          <>
            <Divider sx={{ mb: 1.5 }} />
            <Stack spacing={1.25}>
              {segment.whatWouldHaveToBeTrue.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 18, color: brandTokens.BRAND_ACCENT, mt: '2px', flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
