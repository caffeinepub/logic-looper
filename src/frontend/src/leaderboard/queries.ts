import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { getFromDB, saveToDB } from '@/storage/db';
import type { ScoreEntry } from '../backend';

export function useLeaderboard(date: string) {
  const { actor } = useActor();
  const isOnline = useOnlineStatus();

  return useQuery<ScoreEntry[]>({
    queryKey: ['leaderboard', date],
    queryFn: async () => {
      if (!actor || !isOnline) {
        const cached = getFromDB(`leaderboard_${date}`) as ScoreEntry[] || [];
        return cached;
      }
      
      try {
        const data = await actor.getLeaderboard(date);
        saveToDB(`leaderboard_${date}`, data);
        return data;
      } catch (error) {
        const cached = getFromDB(`leaderboard_${date}`) as ScoreEntry[] || [];
        return cached;
      }
    },
    staleTime: 60000,
  });
}
