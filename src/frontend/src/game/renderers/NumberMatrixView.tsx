import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import type { NumberMatrixData } from '../puzzles/numberMatrix';

interface NumberMatrixViewProps {
  data: NumberMatrixData;
  initialInput?: (number | null)[][];
  onChange: (input: (number | null)[][]) => void;
  disabled?: boolean;
}

export default function NumberMatrixView({ data, initialInput, onChange, disabled }: NumberMatrixViewProps) {
  const [grid, setGrid] = useState<(number | null)[][]>(
    initialInput || data.grid.map(row => [...row])
  );

  useEffect(() => {
    onChange(grid);
  }, [grid, onChange]);

  const handleCellChange = (row: number, col: number, value: string) => {
    if (data.given[row][col] || disabled) return;
    
    const num = value === '' ? null : parseInt(value, 10);
    if (value !== '' && (isNaN(num as number) || (num as number) < 1 || (num as number) > data.size)) {
      return;
    }
    
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  return (
    <div className="flex justify-center">
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${data.size}, 1fr)` }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Input
              key={`${i}-${j}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={cell === null ? '' : cell}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              disabled={data.given[i][j] || disabled}
              className={`w-12 h-12 text-center text-lg font-semibold ${
                data.given[i][j] ? 'bg-muted font-bold' : ''
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
}
