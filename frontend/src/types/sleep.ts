export interface SleepLog {
  id: string;
  date: string;
  durationHours: number;
  deepSleepMinutes: number;
  remSleepMinutes: number;
  qualityRating: 1 | 2 | 3 | 4 | 5;
  recoveryScore: number;
}
