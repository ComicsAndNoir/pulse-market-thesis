import {
  Card,
  CardContent,
  Box,
  Typography,
  Slider,
  Button,
  Tooltip,
  Stack,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DIMENSIONS } from '../model/thesis';
import { normalizeWeights, toPercent, type WeightMap } from '../model/scoring';
import { brandTokens } from '../theme/theme';
import { trackEvent } from '../lib/analytics';

interface Props {
  weights: WeightMap;
  onChange: (id: string, value: number) => void;
  onReset: () => void;
  isDirty: boolean;
}

export function WeightPanel({ weights, onChange, onReset, isDirty }: Props) {
  const normalized = normalizeWeights(weights);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Rubric weights
            </Typography>
            <Tooltip
              title="Which dimensions carry the most weight is a judgment call in itself. Adjust any slider to see how sensitive the recommendation is."
              arrow
              placement="top"
            >
              <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            </Tooltip>
          </Box>
          <Button
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={() => {
              onReset();
              trackEvent('reset_weights');
            }}
            disabled={!isDirty}
            sx={{ color: 'text.secondary' }}
          >
            Reset
          </Button>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
          Adjust weights to re-test the recommendation.
        </Typography>

        <Stack spacing={2.5}>
          {DIMENSIONS.map((d) => (
            <Box key={d.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.25 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                    {d.label}
                  </Typography>
                  <Tooltip title={d.description} arrow placement="top">
                    <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary', flexShrink: 0 }} />
                  </Tooltip>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    color: 'text.primary',
                    ml: 1,
                  }}
                >
                  {toPercent(normalized[d.id])}%
                </Typography>
              </Box>
              <Slider
                value={weights[d.id]}
                onChange={(_, v) => onChange(d.id, v as number)}
                onChangeCommitted={(_, v) =>
                  trackEvent('adjust_weight', { dimension_id: d.id, weight_value: v as number })
                }
                min={0}
                max={40}
                step={1}
                size="small"
                aria-label={`${d.label} weight`}
              />
            </Box>
          ))}
        </Stack>

        <Typography
          variant="caption"
          sx={{ display: 'block', mt: 2.5, color: 'text.secondary', borderTop: `1px solid ${brandTokens.divider}`, pt: 1.5 }}
        >
          Weights normalize to 100% automatically, so the composite is always valid.
        </Typography>
      </CardContent>
    </Card>
  );
}
