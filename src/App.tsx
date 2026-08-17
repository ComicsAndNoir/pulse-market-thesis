import { Box, Container, Typography, Link } from '@mui/material';
import { AppBarHeader } from './components/AppBarHeader';
import { ThesisHeader } from './components/ThesisHeader';
import { WeightPanel } from './components/WeightPanel';
import { RankingView } from './components/RankingView';
import { ScoreMatrix } from './components/ScoreMatrix';
import { WhatWouldHaveToBeTrue } from './components/WhatWouldHaveToBeTrue';
import { UpsellTargets } from './components/UpsellTargets';
import { KillList } from './components/KillList';
import { useThesisState } from './state/useThesisState';
import { brandTokens } from './theme/theme';

export default function App() {
  const {
    weights,
    setWeight,
    resetWeights,
    isDirty,
    ranked,
    selected,
    selectedId,
    setSelectedId,
  } = useThesisState();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBarHeader />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <ThesisHeader />

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(280px, 1fr) minmax(0, 2.1fr) minmax(320px, 1.15fr)',
            },
            alignItems: 'start',
          }}
        >
          {/* Left: the lever */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 88 } }}>
            <WeightPanel
              weights={weights}
              onChange={setWeight}
              onReset={resetWeights}
              isDirty={isDirty}
            />
          </Box>

          {/* Center: the result */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, minWidth: 0 }}>
            <RankingView ranked={ranked} selectedId={selectedId} onSelect={setSelectedId} />
          </Box>

          {/* Right: the defense */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {selected && <WhatWouldHaveToBeTrue selected={selected} />}
            {selected && <UpsellTargets selected={selected} />}
            {selected && <KillList selected={selected} onSelect={setSelectedId} />}
          </Box>
        </Box>

        {/* Full-width: the detail, once the headline result is set. */}
        <Box sx={{ mt: 2.5 }}>
          <ScoreMatrix
            ranked={ranked}
            weights={weights}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Box>

        {/* Footer — the unofficial-concept disclaimer. */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: `1px solid ${brandTokens.divider}`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 640 }}>
            An unofficial concept built as an interview exercise for the Product Lead, Pulse
            role. Not affiliated with or endorsed by Napster. All figures are illustrative
            assumptions to be validated with real buyers.
          </Typography>
          <Link
            href="https://www.napster.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            napster.com
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
