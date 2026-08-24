import { Card, CardContent, Box, Typography, Stack, Tooltip, Link } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { RankedSegment } from '../model/scoring';
import { brandTokens } from '../theme/theme';

interface Props {
  selected: RankedSegment;
}

/**
 * UpsellTargets — existing Napster accounts where this segment is a plausible
 * expansion. Only renders when the selected segment has targets to show.
 */
export function UpsellTargets({ selected }: Props) {
  const { segment } = selected;
  if (!segment.upsellTargets || segment.upsellTargets.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="overline" sx={{ color: brandTokens.eyebrowAccent }}>
            Upsell targets
          </Typography>
          <Tooltip
            title="Existing Napster accounts where Pulse is a plausible expansion — not a validated pipeline."
            arrow
            placement="top"
          >
            <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
          </Tooltip>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Existing accounts to approach first.
        </Typography>

        {segment.demoAccess && (
          <Box
            sx={{
              p: 1.75,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1px solid ${brandTokens.divider}`,
              mb: 2,
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Live demos of these conversations are available at{' '}
              <Link
                href={segment.demoAccess.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: brandTokens.eyebrowAccent }}
              >
                {segment.demoAccess.url.replace(/^https?:\/\//, '')}
              </Link>
              . A password is required to prevent API limits from being exceeded. Request one
              from{' '}
              <Link
                href={`mailto:${segment.demoAccess.contactEmail}`}
                sx={{ color: brandTokens.eyebrowAccent }}
              >
                {segment.demoAccess.contactEmail}
              </Link>
              .
            </Typography>
          </Box>
        )}

        <Stack spacing={1.5}>
          {segment.upsellTargets.map((t) => (
            <Box
              key={t.name}
              sx={{
                p: 1.75,
                borderRadius: 2,
                border: `1px solid ${brandTokens.divider}`,
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.55 }}>
                {t.rationale}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
