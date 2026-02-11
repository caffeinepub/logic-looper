import { getTodayKey } from '@/lib/dateSeed';

export interface StreakData {
  currentStreak: number;
  lastPlayedDate: string;
  streakBroken: boolean;
}

export function calculateStreak(completionDates: string[]): StreakData {
  if (completionDates.length === 0) {
    return { currentStreak: 0, lastPlayedDate: '', streakBroken: false };
  }
  
  const sortedDates = [...completionDates].sort().reverse();
  const today = getTodayKey();
  const yesterday = getYesterdayKey();
  
  let streak = 0;
  let streakBroken = false;
  
  if (sortedDates[0] === today) {
    streak = 1;
    let checkDate = yesterday;
    let index = 1;
    
    while (index < sortedDates.length && sortedDates[index] === checkDate) {
      streak++;
      checkDate = getPreviousDateKey(checkDate);
      index++;
    }
  } else if (sortedDates[0] === yesterday) {
    streak = 1;
    let checkDate = getPreviousDateKey(yesterday);
    let index = 1;
    
    while (index < sortedDates.length && sortedDates[index] === checkDate) {
      streak++;
      checkDate = getPreviousDateKey(checkDate);
      index++;
    }
    streakBroken = true;
  } else {
    streakBroken = true;
  }
  
  return {
    currentStreak: streak,
    lastPlayedDate: sortedDates[0],
    streakBroken,
  };
}

function getYesterdayKey(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDateKey(date);
}

function getPreviousDateKey(dateKey: string): string {
  const parts = dateKey.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() - 1);
  return formatDateKey(date);
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
