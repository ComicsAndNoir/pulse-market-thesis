/**
 * scoring.ts — pure, side-effect-free derivation.
 * ---------------------------------------------------------------------------
 * Composite scores and ranking are NEVER stored. They are computed from
 * (segments, dimensions, weights) every render. That is what makes the live
 * re-sort free: change a weight, and the ranking recomputes and re-orders.
 */

import type { Dimension, Segment } from './thesis';

export type WeightMap = Record<string, number>;

export interface RankedSegment {
  segment: Segment;
  /** Weighted composite on the 1-5 scale. */
  composite: number;
  /** 1-based rank after sorting by composite (desc). */
  rank: number;
}

/** Build the initial weight map from the dimensions' declared weights. */
export function initialWeights(dimensions: Dimension[]): WeightMap {
  return dimensions.reduce<WeightMap>((acc, d) => {
    acc[d.id] = d.weight;
    return acc;
  }, {});
}

/**
 * Normalize raw weights to fractions that sum to 1.
 * Guards against a zero-sum (all sliders at 0) to avoid NaN composites.
 */
export function normalizeWeights(weights: WeightMap): WeightMap {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (total <= 0) {
    const keys = Object.keys(weights);
    const even = keys.length > 0 ? 1 / keys.length : 0;
    return keys.reduce<WeightMap>((acc, k) => {
      acc[k] = even;
      return acc;
    }, {});
  }
  return Object.fromEntries(
    Object.entries(weights).map(([k, w]) => [k, w / total]),
  );
}

/** Weighted composite for a single segment on the 1-5 scale. */
export function compositeFor(
  segment: Segment,
  normalized: WeightMap,
): number {
  return Object.entries(normalized).reduce((sum, [dimId, w]) => {
    const cell = segment.scores[dimId];
    const value = cell ? cell.value : 0;
    return sum + value * w;
  }, 0);
}

/**
 * Rank all segments by composite (desc). Ties are broken deterministically by
 * name so the order never flickers between renders.
 */
export function rankSegments(
  segments: Segment[],
  weights: WeightMap,
): RankedSegment[] {
  const normalized = normalizeWeights(weights);

  const scored = segments.map((segment) => ({
    segment,
    composite: compositeFor(segment, normalized),
  }));

  scored.sort((a, b) => {
    if (b.composite !== a.composite) return b.composite - a.composite;
    return a.segment.name.localeCompare(b.segment.name);
  });

  return scored.map((s, i) => ({ ...s, rank: i + 1 }));
}

/** Percentage form of a normalized weight, rounded for display. */
export function toPercent(fraction: number): number {
  return Math.round(fraction * 100);
}
