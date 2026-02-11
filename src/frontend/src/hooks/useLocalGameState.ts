import { useState, useEffect, useCallback } from 'react';
import { getTodayKey, getLast365Days } from '@/lib/dateSeed';
import { getDailyRecord, saveDailyRecord, getAllCompletedDates, getSettings, saveSettings, getUnlockedAchievements } from '@/storage/repo';
import { calculateStreak } from '@/game/streaks';
import { getHintsRemaining, recordHintUsage } from '@/game/hints';
import { getCurrentDifficulty, updateDifficulty } from '@/game/difficulty';
import { evaluateAchievements } from '@/achievements/engine';
import { enqueueSubmission } from '@/storage/repo';
import type { DailyRecord, Settings } from '@/storage/models';

export function useLocalGameState() {
  const [todayStatus, setTodayStatus] = useState<'not_played' | 'attempted' | 'completed'>('not_played');
  const [streak, setStreak] = useState(0);
  const [streakBroken, setStreakBroken] = useState(false);
  const [settings, setSettingsState] = useState<Settings>(getSettings());
  const [difficulty] = useState(getCurrentDifficulty());

  useEffect(() => {
    const today = getTodayKey();
    const record = getDailyRecord(today);
    setTodayStatus(record?.status || 'not_played');

    const completedDates = getAllCompletedDates();
    const streakData = calculateStreak(completedDates);
    setStreak(streakData.currentStreak);
    setStreakBroken(streakData.streakBroken);
  }, []);

  const saveDailyProgress = useCallback((dateKey: string, userInput: unknown) => {
    const existing = getDailyRecord(dateKey);
    const record: DailyRecord = {
      dateKey,
      status: 'attempted',
      userInput,
      ...existing,
    };
    saveDailyRecord(record);
    setTodayStatus('attempted');
  }, []);

  const markCompleted = useCallback((dateKey: string, score: number, timeTaken: number, puzzleType: string) => {
    const record: DailyRecord = {
      dateKey,
      status: 'completed',
      score,
      timeTaken,
      puzzleType,
      completedAt: Date.now(),
    };
    saveDailyRecord(record);
    setTodayStatus('completed');

    const completedDates = getAllCompletedDates();
    const streakData = calculateStreak(completedDates);
    setStreak(streakData.currentStreak);
    setStreakBroken(false);

    updateDifficulty({
      streak: streakData.currentStreak,
      avgTime: timeTaken,
      hintsUsed: 3 - getHintsRemaining(),
    });

    evaluateAchievements({
      completedDates,
      streak: streakData.currentStreak,
      score,
      timeTaken,
      hintsUsed: 3 - getHintsRemaining(),
    });

    enqueueSubmission({
      dateKey,
      score,
      timeTaken,
      puzzleType,
      timestamp: Date.now(),
    });
  }, []);

  const updateSettings = useCallback((newSettings: Settings) => {
    saveSettings(newSettings);
    setSettingsState(newSettings);
  }, []);

  return {
    todayStatus,
    streak,
    streakBroken,
    settings,
    difficulty,
    saveDailyProgress,
    markCompleted,
    updateSettings,
  };
}

export function useHints() {
  const [hintsRemaining, setHintsRemaining] = useState(getHintsRemaining());

  const consumeHint = useCallback(() => {
    const success = recordHintUsage();
    if (success) {
      setHintsRemaining(getHintsRemaining());
    }
  }, []);

  return { hintsRemaining, consumeHint };
}

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(getUnlockedAchievements());

  useEffect(() => {
    const interval = setInterval(() => {
      setUnlockedAchievements(getUnlockedAchievements());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { unlockedAchievements };
}

export function useHeatmapData() {
  const [heatmapData, setHeatmapData] = useState<Record<string, string>>({});

  useEffect(() => {
    const dates = getLast365Days();
    const data: Record<string, string> = {};
    
    dates.forEach(dateKey => {
      const record = getDailyRecord(dateKey);
      data[dateKey] = record?.status || 'not_played';
    });
    
    setHeatmapData(data);
  }, []);

  return heatmapData;
}
