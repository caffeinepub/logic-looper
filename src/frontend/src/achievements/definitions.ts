export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    title: 'First Victory',
    description: 'Complete your first puzzle',
  },
  {
    id: 'streak_3',
    title: '3-Day Streak',
    description: 'Complete puzzles for 3 consecutive days',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Complete puzzles for 7 consecutive days',
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Complete puzzles for 30 consecutive days',
  },
  {
    id: 'no_hints',
    title: 'Pure Logic',
    description: 'Complete a puzzle without using any hints',
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a puzzle in under 2 minutes',
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Achieve a score of 1000 or more',
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Complete 100 puzzles',
  },
];
