import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getTodayKey } from '@/lib/dateSeed';
import { generateDailyPuzzle } from '@/game/dailyPuzzle';
import { useLocalGameState } from '@/hooks/useLocalGameState';
import PuzzleRenderer from '@/game/renderers/PuzzleRenderer';
import { decodeSharePayload, encodeSharePayload } from '@/game/sharing';
import type { PuzzleInstance } from '@/game/puzzles/types';
import type { PuzzleType } from '@/game/puzzles/registry';

export default function PuzzlePage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as { share?: string };
  const { todayStatus, saveDailyProgress, markCompleted, settings } = useLocalGameState();
  const [puzzle, setPuzzle] = useState<PuzzleInstance | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (searchParams.share) {
      try {
        const decoded = decodeSharePayload(searchParams.share);
        const sharedPuzzle = generateDailyPuzzle(decoded.dateKey, decoded.puzzleType as PuzzleType);
        setPuzzle(sharedPuzzle);
        toast.info('Playing a shared puzzle!');
      } catch (error) {
        toast.error('Invalid share link');
        const todayPuzzle = generateDailyPuzzle(getTodayKey());
        setPuzzle(todayPuzzle);
      }
    } else {
      const todayPuzzle = generateDailyPuzzle(getTodayKey());
      setPuzzle(todayPuzzle);
    }
  }, [searchParams.share]);

  const handleProgressUpdate = (userInput: unknown) => {
    if (puzzle) {
      saveDailyProgress(getTodayKey(), userInput);
    }
  };

  const handleComplete = (score: number) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    markCompleted(getTodayKey(), score, timeTaken, puzzle?.puzzleType || 'unknown');
    toast.success('Puzzle completed! 🎉');
  };

  const handleShare = () => {
    if (!puzzle) return;
    const payload = encodeSharePayload({
      puzzleType: puzzle.puzzleType,
      dateKey: getTodayKey(),
    });
    const url = `${window.location.origin}/puzzle?share=${payload}`;
    setShareUrl(url);
    setShareDialogOpen(true);
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  if (!puzzle) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading puzzle...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex items-center gap-2">
          {todayStatus === 'completed' && (
            <Badge className="bg-green-600 text-white">Completed</Badge>
          )}
          {settings.timedMode && (
            <Badge variant="outline">Timed Mode</Badge>
          )}
        </div>
      </div>

      <Card
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/puzzle-bg-tile.dim_512x512.png)',
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        <div className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{puzzle.title}</CardTitle>
                <CardDescription>{puzzle.description}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PuzzleRenderer
              puzzle={puzzle}
              onProgressUpdate={handleProgressUpdate}
              onComplete={handleComplete}
              disabled={todayStatus === 'completed'}
            />
          </CardContent>
        </div>
      </Card>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share This Puzzle</DialogTitle>
            <DialogDescription>
              Challenge your friends with this puzzle!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md break-all text-sm">
              {shareUrl}
            </div>
            <Button onClick={copyShareUrl} className="w-full">
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
