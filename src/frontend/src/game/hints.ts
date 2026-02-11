import { getTodayKey } from '@/lib/dateSeed';
import { getFromDB, saveToDB } from '@/storage/db';

const DAILY_HINT_LIMIT = 3;

export function getHintsRemaining(): number {
  const today = getTodayKey();
  const hintsData = getFromDB('hintsUsed') as Record<string, number> || {};
  const used = hintsData[today] || 0;
  return Math.max(0, DAILY_HINT_LIMIT - used);
}

export function recordHintUsage(): boolean {
  const today = getTodayKey();
  const hintsData = getFromDB('hintsUsed') as Record<string, number> || {};
  const used = hintsData[today] || 0;
  
  if (used >= DAILY_HINT_LIMIT) {
    return false;
  }
  
  hintsData[today] = used + 1;
  saveToDB('hintsUsed', hintsData);
  return true;
}
