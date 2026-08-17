import { Card, CardContent, Box, Typography, Stack } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { SEGMENTS } from '../model/thesis';
import { brandTokens } from '../theme/theme';
import { trackEvent } from '../lib/analytics';

/**
 * KillList — what Pulse is NOT, and exactly why. Naming this unprompted is the
 * Kill Discipline competency made visible. The 1:1s entry is the headline: the
 * biggest market is the trap.
 */
export function KillList({ onSelect }: { onSelect: (id: string) => void }) {
  const kills = SEGMENTS.filter((s) => s.verdict === 'kill');

  // Pull the single most-diagnostic reason (lowest score) for each kill.
  const reasonFor = (id: string): string => {
    const seg = SEGMENTS.find((s) => s.id === id)!;
    const entries = Object.entries(seg.scores);
    entries.sort((a, b) => a[1].value - b[1].value);
    return entries[0][1].rationale;
  };

  return (
    <Card sx={{ borderColor: 'rgba(229,72,77,0.28)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <BlockIcon sx={{ fontSize: 18, color: brandTokens.kill }} />
          <Typography variant="overline" sx={{ color: brandTokens.kill }}>
            Kill list — what Pulse is not
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Ruled out deliberately, not by omission.
        </Typography>

        <Stack spacing={1.5}>
          {kills.map((s) => (
            <Box
              key={s.id}
              onClick={() => {
                onSelect(s.id);
                trackEvent('select_segment', { segment_id: s.id, source: 'kill_list' });
              }}
              sx={{
                p: 1.75,
                borderRadius: 2,
                border: `1px solid ${brandTokens.divider}`,
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' },
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.55 }}>
                {reasonFor(s.id)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
