import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, CheckCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import NumberMatrixView from './NumberMatrixView';
import SequenceSolverView from './SequenceSolverView';
import PatternMatchView from './PatternMatchView';
import { validateNumberMatrix, getNumberMatrixHint } from '../puzzles/numberMatrix';
import { validateSequenceSolver, getSequenceSolverHint } from '../puzzles/sequenceSolver';
import { validatePatternMatch, getPatternMatchHint } from '../puzzles/patternMatch';
import { useHints } from '@/hooks/useLocalGameState';
import type { PuzzleInstance } from '../puzzles/types';

interface PuzzleRendererProps {
  puzzle: PuzzleInstance;
  onProgressUpdate: (userInput: unknown) => void;
  onComplete: (score: number) => void;
  disabled?: boolean;
}

export default function PuzzleRenderer({ puzzle, onProgressUpdate, onComplete, disabled }: PuzzleRendererProps) {
  const [userInput, setUserInput] = useState<unknown>(null);
  const { hintsRemaining, consumeHint } = useHints();

  const handleInputChange = useCallback((input: unknown) => {
    setUserInput(input);
    onProgressUpdate(input);
  }, [onProgressUpdate]);

  const handleCheck = () => {
    let result;
    
    switch (puzzle.puzzleType) {
      case 'numberMatrix':
        result = validateNumberMatrix(userInput as (number | null)[][], puzzle.solution as number[][]);
        break;
      case 'sequenceSolver':
        result = validateSequenceSolver(userInput as (number | null)[], puzzle.solution as number[]);
        break;
      case 'patternMatch':
        result = validatePatternMatch(userInput as string, puzzle.solution as string);
        break;
      default:
        result = { isCorrect: false, message: 'Unknown puzzle type' };
    }
    
    if (result.isCorrect) {
      const baseScore = 1000;
      const hintPenalty = (3 - hintsRemaining) * 100;
      const score = Math.max(baseScore - hintPenalty, 100);
      onComplete(score);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleHint = () => {
    if (hintsRemaining <= 0) {
      toast.error('No hints remaining for today');
      return;
    }
    
    let hint;
    
    switch (puzzle.puzzleType) {
      case 'numberMatrix':
        hint = getNumberMatrixHint(puzzle.data as any, puzzle.solution as number[][]);
        break;
      case 'sequenceSolver':
        hint = getSequenceSolverHint(puzzle.data as any, puzzle.solution as number[]);
        break;
      case 'patternMatch':
        hint = getPatternMatchHint(puzzle.solution as string);
        break;
      default:
        hint = { message: 'No hints available' };
    }
    
    consumeHint();
    toast.info(hint.message);
  };

  const handleReset = () => {
    setUserInput(null);
    toast.info('Puzzle reset');
  };

  return (
    <div className="space-y-6">
      <div className="min-h-[300px]">
        {puzzle.puzzleType === 'numberMatrix' && (
          <NumberMatrixView
            data={puzzle.data as any}
            initialInput={userInput as any}
            onChange={handleInputChange}
            disabled={disabled}
          />
        )}
        {puzzle.puzzleType === 'sequenceSolver' && (
          <SequenceSolverView
            data={puzzle.data as any}
            initialInput={userInput as any}
            onChange={handleInputChange}
            disabled={disabled}
          />
        )}
        {puzzle.puzzleType === 'patternMatch' && (
          <PatternMatchView
            data={puzzle.data as any}
            initialInput={userInput as any}
            onChange={handleInputChange}
            disabled={disabled}
          />
        )}
      </div>

      {!disabled && (
        <div className="flex items-center justify-center gap-3">
          <Button onClick={handleCheck} size="lg">
            <CheckCircle className="mr-2 h-5 w-5" />
            Check Answer
          </Button>
          <Button onClick={handleHint} variant="outline" size="lg">
            <Lightbulb className="mr-2 h-5 w-5" />
            Hint ({hintsRemaining})
          </Button>
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
