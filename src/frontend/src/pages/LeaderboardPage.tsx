import { useState } from 'react';
import { Calendar, WifiOff, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLeaderboard } from '@/leaderboard/queries';
import { getTodayKey } from '@/lib/dateSeed';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export default function LeaderboardPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const isOnline = useOnlineStatus();
  const { identity, login } = useInternetIdentity();
  const { data: leaderboard, isLoading } = useLeaderboard(selectedDate);

  const myPrincipal = identity?.getPrincipal().toString();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top 100 players for each day</p>
      </div>

      {!isOnline && (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're offline. Showing cached leaderboard data.
          </AlertDescription>
        </Alert>
      )}

      {!identity && (
        <Alert>
          <LogIn className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Sign in to submit your scores to the leaderboard</span>
            <Button size="sm" variant="outline" onClick={login}>
              Sign In
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {selectedDate}
              </CardTitle>
              <CardDescription>Daily rankings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading leaderboard...
            </div>
          ) : !leaderboard || leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No entries yet for this date
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Puzzle</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => {
                  const isMe = entry.principal.toString() === myPrincipal;
                  return (
                    <TableRow key={index} className={isMe ? 'bg-accent' : ''}>
                      <TableCell className="font-medium">
                        {index + 1}
                        {index === 0 && ' 🥇'}
                        {index === 1 && ' 🥈'}
                        {index === 2 && ' 🥉'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs truncate max-w-[200px]">
                            {entry.principal.toString().slice(0, 8)}...
                          </span>
                          {isMe && <Badge variant="secondary">You</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.puzzleType}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {entry.score.toString()}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {Math.floor(Number(entry.timeTaken) / 60)}m {Number(entry.timeTaken) % 60}s
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
