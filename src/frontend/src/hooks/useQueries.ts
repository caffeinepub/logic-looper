import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ScoreEntry } from '../backend';

export function useGetLeaderboard(date: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ScoreEntry[]>({
    queryKey: ['leaderboard', date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard(date);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}
