import { getFromDB, saveToDB } from '@/storage/db';

export interface DifficultyState {
  level: number;
  label: string;
}

const DIFFICULTY_LABELS = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];

export function getCurrentDifficulty(): DifficultyState {
  const level = getFromDB('difficultyLevel') as number || 0;
  return {
    level,
    label: DIFFICULTY_LABELS[Math.min(level, DIFFICULTY_LABELS.length - 1)],
  };
}

export function updateDifficulty(performanceData: {
  streak: number;
  avgTime: number;
  hintsUsed: number;
}): void {
  const current = getCurrentDifficulty();
  let newLevel = current.level;
  
  if (performanceData.streak >= 7 && performanceData.hintsUsed === 0) {
    newLevel = Math.min(newLevel + 1, DIFFICULTY_LABELS.length - 1);
  } else if (performanceData.streak < 3 && performanceData.hintsUsed >= 2) {
    newLevel = Math.max(newLevel - 1, 0);
  }
  
  if (newLevel !== current.level) {
    saveToDB('difficultyLevel', newLevel);
  }
}
