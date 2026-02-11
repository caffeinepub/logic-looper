import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { PatternData } from '../puzzles/patternMatch';

interface PatternMatchViewProps {
  data: PatternData;
  initialInput?: string;
  onChange: (input: string) => void;
  disabled?: boolean;
}

export default function PatternMatchView({ data, initialInput, onChange, disabled }: PatternMatchViewProps) {
  const [selected, setSelected] = useState<string>(initialInput || '');

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center gap-4 text-4xl mb-6">
          {data.patterns.map((pattern, index) => (
            <span key={index}>{pattern}</span>
          ))}
          <span className="text-muted-foreground">?</span>
        </div>
        <p className="text-lg font-medium">{data.question}</p>
      </div>
      <div className="flex justify-center gap-4">
        {data.options.map((option, index) => (
          <Button
            key={index}
            variant={selected === option ? 'default' : 'outline'}
            size="lg"
            onClick={() => handleSelect(option)}
            disabled={disabled}
            className="text-3xl w-20 h-20"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
