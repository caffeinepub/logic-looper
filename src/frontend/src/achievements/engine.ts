import { getUnlockedAchievements, unlockAchievement } from '@/storage/repo';
import { ACHIEVEMENTS } from './definitions';

interface PerformanceData {
  completedDates: string[];
  streak: number;
  score: number;
  timeTaken: number;
  hintsUsed: number;
}

export function evaluateAchievements(data: PerformanceData): void {
  const unlocked = getUnlockedAchievements();
  
  ACHIEVEMENTS.forEach(achievement => {
    if (unlocked.includes(achievement.id)) return;
    
    let shouldUnlock = false;
    
    switch (achievement.id) {
      case 'first_win':
        shouldUnlock = data.completedDates.length >= 1;
        break;
      case 'streak_3':
        shouldUnlock = data.streak >= 3;
        break;
      case 'streak_7':
        shouldUnlock = data.streak >= 7;
        break;
      case 'streak_30':
        shouldUnlock = data.streak >= 30;
        break;
      case 'no_hints':
        shouldUnlock = data.hintsUsed === 0;
        break;
      case 'speed_demon':
        shouldUnlock = data.timeTaken < 120;
        break;
      case 'perfect_score':
        shouldUnlock = data.score >= 1000;
        break;
      case 'completionist':
        shouldUnlock = data.completedDates.length >= 100;
        break;
    }
    
    if (shouldUnlock) {
      unlockAchievement(achievement.id);
    }
  });
}
