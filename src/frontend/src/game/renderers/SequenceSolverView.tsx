import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import type { SequenceData } from '../puzzles/sequenceSolver';

interface SequenceSolverViewProps {
  data: SequenceData;
  initialInput?: (number | null)[];
  onChange: (input: (number | null)[]) => void;
  disabled?: boolean;
}

export default function SequenceSolverView({ data, initialInput, onChange, disabled }: SequenceSolverViewProps) {
  const [sequence, setSequence] = useState<(number | null)[]>(
    initialInput || [...data.sequence]
  );

  useEffect(() => {
    onChange(sequence);
  }, [sequence, onChange]);

  const handleChange = (index: number, value: string) => {
    if (data.sequence[index] !== null || disabled) return;
    
    const num = value === '' ? null : parseInt(value, 10);
    if (value !== '' && isNaN(num as number)) {
      return;
    }
    
    const newSequence = [...sequence];
    newSequence[index] = num;
    setSequence(newSequence);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">Pattern: {data.rule}</p>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {sequence.map((num, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <Input
              type="text"
              inputMode="numeric"
              value={num === null ? '' : num}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={data.sequence[index] !== null || disabled}
              className={`w-16 h-16 text-center text-xl font-semibold ${
                data.sequence[index] !== null ? 'bg-muted font-bold' : ''
              }`}
            />
            <span className="text-xs text-muted-foreground">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
