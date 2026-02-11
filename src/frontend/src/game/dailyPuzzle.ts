import { dateKeyToSeed } from '@/lib/dateSeed';
import { selectPuzzleType } from './puzzles/registry';
import { generateNumberMatrix } from './puzzles/numberMatrix';
import { generateSequenceSolver } from './puzzles/sequenceSolver';
import { generatePatternMatch } from './puzzles/patternMatch';
import { getCurrentDifficulty } from './difficulty';
import type { PuzzleInstance } from './puzzles/types';
import type { PuzzleType } from './puzzles/registry';

export function generateDailyPuzzle(dateKey: string, forcePuzzleType?: PuzzleType): PuzzleInstance {
  const seed = dateKeyToSeed(dateKey);
  const puzzleType = forcePuzzleType || selectPuzzleType(dateKey);
  const difficulty = getCurrentDifficulty();
  
  const puzzleSeed = seed + difficulty.level * 1000;
  
  switch (puzzleType) {
    case 'numberMatrix':
      return generateNumberMatrix(puzzleSeed, difficulty.level);
    case 'sequenceSolver':
      return generateSequenceSolver(puzzleSeed, difficulty.level);
    case 'patternMatch':
      return generatePatternMatch(puzzleSeed, difficulty.level);
    default:
      return generateNumberMatrix(puzzleSeed, difficulty.level);
  }
}
