import { Card, CardContent, Box, Typography, Chip, Tooltip } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BlockIcon from '@mui/icons-material/Block';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { RankedSegment } from '../model/scoring';
import type { Verdict } from '../model/thesis';
import { brandTokens } from '../theme/theme';
import { trackEvent } from '../lib/analytics';

interface Props {
  ranked: RankedSegment[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const verdictStyle: Record<
  Verdict,
  { label: string; color: string; icon?: React.ReactNode }
> = {
  winner: { label: 'Winner', color: brandTokens.BRAND_ACCENT, icon: <EmojiEventsIcon sx={{ fontSize: 15 }} /> },
  'runner-up': { label: 'Runner-up', color: brandTokens.runnerUp },
  parked: { label: 'Parked', color: brandTokens.textSecondary },
  kill: { label: 'Kill', color: brandTokens.kill, icon: <BlockIcon sx={{ fontSize: 14 }} /> },
};

// Composite runs 1-5; map to a 0-100% bar width.
const barPct = (composite: number) => ((composite - 1) / 4) * 100;

export function RankingView({ ranked, selectedId, onSelect }: Props) {
  const reduce = useReducedMotion();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Live ranking
          </Typography>
          <Tooltip
            title="Composite is the weighted sum of the rubric on the left. Adjust any weight and the ranking recalculates instantly."
            arrow
            placement="top"
          >
            <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
          </Tooltip>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Ranked by weighted composite score.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ranked.map((r) => {
            const v = verdictStyle[r.segment.verdict];
            const isSelected = r.segment.id === selectedId;
            return (
              <motion.div
                key={r.segment.id}
                layout={!reduce}
                transition={{ type: 'spring', stiffness: 480, damping: 42 }}
                onClick={() => {
                  onSelect(r.segment.id);
                  trackEvent('select_segment', { segment_id: r.segment.id, source: 'ranking' });
                }}
                style={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${isSelected ? v.color : brandTokens.divider}`,
                    backgroundColor: isSelected
                      ? 'rgba(255,255,255,0.04)'
                      : 'transparent',
                    transition: 'border-color 120ms, background-color 120ms',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography
                      sx={{
                        fontFamily: brandTokens.displayFontFamily,
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'text.secondary',
                        width: 22,
                        textAlign: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {r.rank}
                    </Typography>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }} noWrap>
                          {r.segment.name}
                        </Typography>
                        <Chip
                          size="small"
                          icon={v.icon as React.ReactElement | undefined}
                          label={v.label}
                          sx={{
                            height: 20,
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            color: v.color,
                            borderColor: v.color,
                            backgroundColor: 'transparent',
                            border: `1px solid ${v.color}`,
                            '& .MuiChip-icon': { color: v.color },
                          }}
                        />
                      </Box>
                      {/* Composite bar */}
                      <Box
                        sx={{
                          position: 'relative',
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            width: `${barPct(r.composite)}%`,
                            borderRadius: 999,
                            backgroundColor:
                              r.segment.verdict === 'winner'
                                ? brandTokens.BRAND_ACCENT
                                : r.segment.verdict === 'kill'
                                  ? 'rgba(229,72,77,0.5)'
                                  : 'rgba(245,245,247,0.55)',
                            transition: 'width 380ms cubic-bezier(0.2, 0, 0, 1)',
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: brandTokens.displayFontFamily,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: '1.05rem',
                        width: 46,
                        textAlign: 'right',
                        flexShrink: 0,
                      }}
                    >
                      {r.composite.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
