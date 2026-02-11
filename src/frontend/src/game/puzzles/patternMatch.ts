import { PRNG } from '@/lib/prng';
import type { PuzzleInstance, ValidationResult, HintResult } from './types';

export interface PatternData {
  patterns: string[];
  question: string;
  options: string[];
}

export function generatePatternMatch(seed: number, difficulty: number): PuzzleInstance {
  const rng = new PRNG(seed);
  
  const shapes = ['●', '■', '▲', '◆'];
  const colors = ['🔴', '🔵', '🟢', '🟡'];
  
  const patternType = rng.nextInt(0, 1);
  
  if (patternType === 0) {
    const sequence = [shapes[0], shapes[1], shapes[2], shapes[0], shapes[1]];
    const correctAnswer = shapes[2];
    const wrongOptions = rng.shuffle([shapes[1], shapes[3], shapes[0]]).slice(0, 2);
    const options = rng.shuffle([correctAnswer, ...wrongOptions]);
    
    return {
      puzzleType: 'patternMatch',
      title: 'Pattern Matching',
      description: 'What comes next in the pattern?',
      data: {
        patterns: sequence,
        question: 'What comes next?',
        options,
      },
      solution: correctAnswer,
    };
  } else {
    const sequence = [colors[0], colors[1], colors[2], colors[3], colors[0]];
    const correctAnswer = colors[1];
    const wrongOptions = rng.shuffle([colors[2], colors[3], colors[0]]).slice(0, 2);
    const options = rng.shuffle([correctAnswer, ...wrongOptions]);
    
    return {
      puzzleType: 'patternMatch',
      title: 'Pattern Matching',
      description: 'What comes next in the pattern?',
      data: {
        patterns: sequence,
        question: 'What comes next?',
        options,
      },
      solution: correctAnswer,
    };
  }
}

export function validatePatternMatch(userInput: string, solution: string): ValidationResult {
  if (userInput === solution) {
    return { isCorrect: true, message: 'Great job! You found the pattern!' };
  }
  return { isCorrect: false, message: 'Not quite right. Try again!' };
}

export function getPatternMatchHint(solution: string): HintResult {
  return {
    message: `The correct answer is ${solution}`,
    data: { answer: solution },
  };
}
