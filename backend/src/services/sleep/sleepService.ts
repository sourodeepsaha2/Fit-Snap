export interface SleepLog {
  id: string;
  date: string;
  durationHours: number;
  deepSleepMinutes: number;
  remSleepMinutes: number;
  qualityRating: 1 | 2 | 3 | 4 | 5;
  recoveryScore: number; // 0-100
}

let mockSleepLogs: SleepLog[] = [
  {
    id: 's1',
    date: new Date().toISOString().split('T')[0],
    durationHours: 7.5,
    deepSleepMinutes: 110,
    remSleepMinutes: 95,
    qualityRating: 4,
    recoveryScore: 88,
  },
  {
    id: 's2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    durationHours: 6.8,
    deepSleepMinutes: 85,
    remSleepMinutes: 80,
    qualityRating: 3,
    recoveryScore: 76,
  }
];

export const getSleepLogs = async (): Promise<SleepLog[]> => {
  return mockSleepLogs;
};

export const calculateRecoveryScore = (durationHours: number, deepSleepMinutes: number, qualityRating: number): number => {
  const durationScore = Math.min((durationHours / 8) * 40, 40);
  const deepScore = Math.min((deepSleepMinutes / 120) * 30, 30);
  const qualityScore = (qualityRating / 5) * 30;
  return Math.round(durationScore + deepScore + qualityScore);
};

export const logSleepSession = async (log: Omit<SleepLog, 'id' | 'recoveryScore'>): Promise<SleepLog> => {
  const recoveryScore = calculateRecoveryScore(log.durationHours, log.deepSleepMinutes, log.qualityRating);
  const newLog: SleepLog = {
    ...log,
    id: `s_${Date.now()}`,
    recoveryScore,
  };
  mockSleepLogs.unshift(newLog);
  return newLog;
};
