export interface DailyRecord {
  dateKey: string;
  status: 'not_played' | 'attempted' | 'completed';
  score?: number;
  timeTaken?: number;
  puzzleType?: string;
  userInput?: unknown;
  completedAt?: number;
}

export interface Settings {
  timedMode: boolean;
}

export interface QueuedSubmission {
  dateKey: string;
  score: number;
  timeTaken: number;
  puzzleType: string;
  timestamp: number;
}
