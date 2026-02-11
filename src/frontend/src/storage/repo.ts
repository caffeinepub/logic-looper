import { getFromDB, saveToDB } from './db';
import type { DailyRecord, Settings, QueuedSubmission } from './models';

export function getDailyRecord(dateKey: string): DailyRecord | null {
  const records = getFromDB('dailyRecords') as Record<string, DailyRecord> || {};
  return records[dateKey] || null;
}

export function saveDailyRecord(record: DailyRecord): void {
  const records = getFromDB('dailyRecords') as Record<string, DailyRecord> || {};
  records[record.dateKey] = record;
  saveToDB('dailyRecords', records);
}

export function getAllCompletedDates(): string[] {
  const records = getFromDB('dailyRecords') as Record<string, DailyRecord> || {};
  return Object.values(records)
    .filter(r => r.status === 'completed')
    .map(r => r.dateKey);
}

export function getSettings(): Settings {
  return getFromDB('settings') as Settings || { timedMode: false };
}

export function saveSettings(settings: Settings): void {
  saveToDB('settings', settings);
}

export function getUnlockedAchievements(): string[] {
  return getFromDB('achievements') as string[] || [];
}

export function unlockAchievement(achievementId: string): void {
  const unlocked = getUnlockedAchievements();
  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    saveToDB('achievements', unlocked);
  }
}

export function enqueueSubmission(submission: QueuedSubmission): void {
  const queue = getFromDB('submissionQueue') as QueuedSubmission[] || [];
  queue.push(submission);
  saveToDB('submissionQueue', queue);
}

export function getSubmissionQueue(): QueuedSubmission[] {
  return getFromDB('submissionQueue') as QueuedSubmission[] || [];
}

export function clearSubmissionQueue(): void {
  saveToDB('submissionQueue', []);
}
