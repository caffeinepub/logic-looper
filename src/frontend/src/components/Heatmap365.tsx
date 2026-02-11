import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getLast365Days } from '@/lib/dateSeed';
import { useHeatmapData } from '@/hooks/useLocalGameState';

export default function Heatmap365() {
  const dates = useMemo(() => getLast365Days(), []);
  const heatmapData = useHeatmapData();

  const getStatusColor = (dateKey: string) => {
    const status = heatmapData[dateKey];
    if (status === 'completed') return 'bg-green-600';
    if (status === 'attempted') return 'bg-yellow-500';
    return 'bg-muted';
  };

  const weeks = useMemo(() => {
    const result: string[][] = [];
    let currentWeek: string[] = [];
    
    dates.forEach((date, index) => {
      currentWeek.push(date);
      if (currentWeek.length === 7 || index === dates.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return result;
  }, [dates]);

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((date) => (
                <Tooltip key={date}>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-3 h-3 rounded-sm ${getStatusColor(date)} transition-colors hover:ring-2 hover:ring-primary cursor-pointer`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{date}</p>
                    <p className="text-xs text-muted-foreground">
                      {heatmapData[date] || 'Not played'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <span>Not played</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-yellow-500" />
            <span>Attempted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-600" />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
