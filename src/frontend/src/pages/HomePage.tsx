import { useNavigate } from '@tanstack/react-router';
import { Play, Calendar, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocalGameState } from '@/hooks/useLocalGameState';
import { getTodayKey } from '@/lib/dateSeed';
import Heatmap365 from '@/components/Heatmap365';

export default function HomePage() {
  const navigate = useNavigate();
  const { todayStatus, streak, streakBroken } = useLocalGameState();
  const todayKey = getTodayKey();

  const getStatusBadge = () => {
    if (todayStatus === 'completed') {
      return <Badge className="bg-green-600 text-white">Completed</Badge>;
    }
    if (todayStatus === 'attempted') {
      return <Badge variant="secondary">In Progress</Badge>;
    }
    return <Badge variant="outline">Not Started</Badge>;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Adwait Loop</h1>
        <p className="text-muted-foreground">Challenge your mind with daily logic puzzles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Puzzle
            </CardTitle>
            <CardDescription>{todayKey}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {getStatusBadge()}
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/puzzle' })}
            >
              <Play className="mr-2 h-5 w-5" />
              {todayStatus === 'completed' ? 'View Solution' : 'Play Now'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Current Streak
            </CardTitle>
            <CardDescription>Keep the momentum going!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{streak}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {streak === 1 ? 'day' : 'days'}
              </div>
            </div>
            {streakBroken && (
              <div className="text-sm text-destructive text-center">
                Streak broken! Start a new one today.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Activity</CardTitle>
          <CardDescription>Last 365 days of puzzle completions</CardDescription>
        </CardHeader>
        <CardContent>
          <Heatmap365 />
        </CardContent>
      </Card>
    </div>
  );
}
