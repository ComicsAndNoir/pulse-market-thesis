import { useCallback, useEffect, useMemo, useState } from 'react';
import { DIMENSIONS, SEGMENTS } from '../model/thesis';
import { initialWeights, rankSegments, type WeightMap } from '../model/scoring';

/**
 * useThesisState — the only stateful piece of the app.
 *
 * Holds two things: the working weight map and the selected segment. Everything
 * else (composites, ranking, the winner) is DERIVED, so a weight change re-sorts
 * the board with no extra wiring.
 *
 * Weights are also mirrored into the URL (?w=proof:20,roi:20,...) so a specific
 * weighting scenario is a shareable link — e.g. "here's the board weighted the
 * way we discussed" in a follow-up note.
 */

const SEED = initialWeights(DIMENSIONS);

function parseWeightsFromUrl(): WeightMap | null {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('w');
  if (!raw) return null;
  const parsed: WeightMap = { ...SEED };
  let matched = false;
  for (const pair of raw.split(',')) {
    const [id, valueStr] = pair.split(':');
    const value = Number(valueStr);
    if (id in SEED && Number.isFinite(value) && value >= 0) {
      parsed[id] = value;
      matched = true;
    }
  }
  return matched ? parsed : null;
}

function writeWeightsToUrl(weights: WeightMap): void {
  const encoded = Object.entries(weights)
    .map(([id, w]) => `${id}:${Math.round(w)}`)
    .join(',');
  const url = new URL(window.location.href);
  url.searchParams.set('w', encoded);
  window.history.replaceState({}, '', url.toString());
}

export function useThesisState() {
  const [weights, setWeights] = useState<WeightMap>(
    () => parseWeightsFromUrl() ?? { ...SEED },
  );
  const [selectedId, setSelectedId] = useState<string>(() => {
    // Default selection = the seeded winner (top of the initial ranking).
    const ranked = rankSegments(SEGMENTS, parseWeightsFromUrl() ?? SEED);
    return ranked[0]?.segment.id ?? SEGMENTS[0].id;
  });

  // Keep the URL in sync so the current scenario is always shareable.
  useEffect(() => {
    writeWeightsToUrl(weights);
  }, [weights]);

  const ranked = useMemo(() => rankSegments(SEGMENTS, weights), [weights]);

  const setWeight = useCallback((id: string, value: number) => {
    setWeights((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetWeights = useCallback(() => {
    setWeights({ ...SEED });
  }, []);

  const selected = useMemo(
    () => ranked.find((r) => r.segment.id === selectedId) ?? ranked[0],
    [ranked, selectedId],
  );

  const isDirty = useMemo(
    () => DIMENSIONS.some((d) => weights[d.id] !== SEED[d.id]),
    [weights],
  );

  return {
    weights,
    setWeight,
    resetWeights,
    isDirty,
    ranked,
    selected,
    selectedId,
    setSelectedId,
  };
}
