import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DIMENSIONS } from '../model/thesis';
import { normalizeWeights, toPercent, type RankedSegment, type WeightMap } from '../model/scoring';
import { brandTokens } from '../theme/theme';
import { trackEvent } from '../lib/analytics';

interface Props {
  ranked: RankedSegment[];
  weights: WeightMap;
  selectedId: string;
  onSelect: (id: string) => void;
}

// Map a 1-5 score to a subtle white-intensity fill so the eye reads the pattern.
function cellBg(value: number): string {
  const alpha = 0.04 + ((value - 1) / 4) * 0.16; // 0.04 -> 0.20
  return `rgba(245,245,247,${alpha.toFixed(3)})`;
}

export function ScoreMatrix({ ranked, weights, selectedId, onSelect }: Props) {
  const normalized = normalizeWeights(weights);

  return (
    <Card>
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Score matrix
          </Typography>
          <Tooltip
            title="Every score is a hypothesis to validate with real buyers, not a measured fact."
            arrow
            placement="top"
          >
            <Box component="span" sx={{ display: 'inline-flex', cursor: 'help' }}>
              <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            </Box>
          </Tooltip>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Scored 1 (weak) to 5 (strong) — hover any cell for the reasoning.
        </Typography>

        <TableContainer>
          <Table size="small" sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: brandTokens.surfaceContainer, zIndex: 1 }}>
                  Segment
                </TableCell>
                {DIMENSIONS.map((d) => (
                  <TableCell key={d.id} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    <Tooltip title={d.description} arrow>
                      <Box component="span" sx={{ cursor: 'help' }}>
                        {d.label.split(' / ')[0]}
                        <Box component="span" sx={{ display: 'block', fontSize: '0.68rem', color: 'text.secondary', fontWeight: 400 }}>
                          {toPercent(normalized[d.id])}%
                        </Box>
                      </Box>
                    </Tooltip>
                  </TableCell>
                ))}
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  Composite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranked.map((r) => {
                const isSelected = r.segment.id === selectedId;
                return (
                  <TableRow
                    key={r.segment.id}
                    hover
                    onClick={() => {
                      onSelect(r.segment.id);
                      trackEvent('select_segment', { segment_id: r.segment.id, source: 'matrix' });
                    }}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent',
                      outline: isSelected ? `1px solid ${brandTokens.divider}` : 'none',
                    }}
                  >
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: isSelected ? '#1e1e24' : brandTokens.surfaceContainer,
                        zIndex: 1,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.segment.name}
                    </TableCell>
                    {DIMENSIONS.map((d) => {
                      const cell = r.segment.scores[d.id];
                      return (
                        <TableCell key={d.id} align="center" sx={{ p: 0.5 }}>
                          <Tooltip title={cell?.rationale ?? ''} arrow placement="top">
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 1.5,
                                fontVariantNumeric: 'tabular-nums',
                                fontWeight: 600,
                                cursor: 'help',
                                backgroundColor: cellBg(cell?.value ?? 0),
                              }}
                            >
                              {cell?.value ?? '—'}
                            </Box>
                          </Tooltip>
                        </TableCell>
                      );
                    })}
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: brandTokens.displayFontFamily,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        color: r.segment.verdict === 'winner' ? brandTokens.BRAND_ACCENT : 'text.primary',
                      }}
                    >
                      {r.composite.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
