import { dateKeyToSeed } from '@/lib/dateSeed';

export const PUZZLE_TYPES = ['numberMatrix', 'sequenceSolver', 'patternMatch'] as const;
export type PuzzleType = typeof PUZZLE_TYPES[number];

export function selectPuzzleType(dateKey: string): PuzzleType {
  const seed = dateKeyToSeed(dateKey);
  const index = seed % PUZZLE_TYPES.length;
  return PUZZLE_TYPES[index];
}
