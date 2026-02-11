import { PRNG } from '@/lib/prng';
import type { PuzzleInstance, ValidationResult, HintResult } from './types';

export interface SequenceData {
  sequence: (number | null)[];
  rule: string;
}

export function generateSequenceSolver(seed: number, difficulty: number): PuzzleInstance {
  const rng = new PRNG(seed);
  const patterns = [
    { rule: 'Add 3 each time', gen: (i: number) => 2 + i * 3 },
    { rule: 'Multiply by 2 each time', gen: (i: number) => 2 * Math.pow(2, i) },
    { rule: 'Add increasing numbers (1, 2, 3...)', gen: (i: number) => 1 + (i * (i + 1)) / 2 },
    { rule: 'Square numbers', gen: (i: number) => (i + 1) * (i + 1) },
  ];
  
  const pattern = patterns[rng.nextInt(0, patterns.length - 1)];
  const length = 6;
  const solution = Array.from({ length }, (_, i) => pattern.gen(i));
  
  const blanksCount = 2 + Math.floor(difficulty);
  const sequence: (number | null)[] = [...solution];
  const blanks = new Set<number>();
  
  while (blanks.size < blanksCount && blanks.size < length - 2) {
    const index = rng.nextInt(1, length - 2);
    blanks.add(index);
  }
  
  blanks.forEach(i => {
    sequence[i] = null;
  });
  
  return {
    puzzleType: 'sequenceSolver',
    title: 'Sequence Solver',
    description: 'Find the pattern and fill in the missing numbers.',
    data: { sequence, rule: pattern.rule },
    solution,
  };
}

export function validateSequenceSolver(userInput: (number | null)[], solution: number[]): ValidationResult {
  for (let i = 0; i < solution.length; i++) {
    if (userInput[i] === null) {
      return { isCorrect: false, message: 'Please fill all blanks' };
    }
    if (userInput[i] !== solution[i]) {
      return { isCorrect: false, message: 'Some numbers are incorrect' };
    }
  }
  
  return { isCorrect: true, message: 'Excellent! You found the pattern!' };
}

export function getSequenceSolverHint(data: SequenceData, solution: number[]): HintResult {
  const { sequence } = data;
  
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === null) {
      return {
        message: `Position ${i + 1} should be ${solution[i]}`,
        data: { index: i, value: solution[i] },
      };
    }
  }
  
  return { message: 'No hints available' };
}
