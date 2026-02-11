export interface PuzzleInstance {
  puzzleType: string;
  title: string;
  description: string;
  data: unknown;
  solution: unknown;
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
}

export interface HintResult {
  message: string;
  data?: unknown;
}
