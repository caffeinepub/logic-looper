import { PRNG } from '@/lib/prng';
import type { PuzzleInstance, ValidationResult, HintResult } from './types';

export interface NumberMatrixData {
  size: number;
  grid: (number | null)[][];
  given: boolean[][];
}

export function generateNumberMatrix(seed: number, difficulty: number): PuzzleInstance {
  const rng = new PRNG(seed);
  const size = 4;
  const solution: number[][] = [];
  
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(((i * 2 + j) % size) + 1);
    }
    solution.push(rng.shuffle(row));
  }
  
  const cellsToRemove = Math.floor(size * size * (0.4 + difficulty * 0.1));
  const grid: (number | null)[][] = solution.map(row => [...row]);
  const given: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(true));
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const i = rng.nextInt(0, size - 1);
    const j = rng.nextInt(0, size - 1);
    if (grid[i][j] !== null) {
      grid[i][j] = null;
      given[i][j] = false;
      removed++;
    }
  }
  
  return {
    puzzleType: 'numberMatrix',
    title: 'Number Matrix',
    description: `Fill the ${size}x${size} grid so each row and column contains numbers 1-${size} exactly once.`,
    data: { size, grid, given },
    solution,
  };
}

export function validateNumberMatrix(userInput: (number | null)[][], solution: number[][]): ValidationResult {
  const size = solution.length;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (userInput[i][j] === null) {
        return { isCorrect: false, message: 'Please fill all cells' };
      }
      if (userInput[i][j] !== solution[i][j]) {
        return { isCorrect: false, message: 'Some numbers are incorrect' };
      }
    }
  }
  
  return { isCorrect: true, message: 'Perfect! All numbers are correct!' };
}

export function getNumberMatrixHint(data: NumberMatrixData, solution: number[][]): HintResult {
  const { size, grid } = data;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === null) {
        return {
          message: `Try placing ${solution[i][j]} at row ${i + 1}, column ${j + 1}`,
          data: { row: i, col: j, value: solution[i][j] },
        };
      }
    }
  }
  
  return { message: 'No hints available' };
}
