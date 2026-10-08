export interface StreakData {
  currentStreakDays: number;
  longestStreakDays: number;
  lastActiveDate: string;
  totalCheckIns: number;
  milestones: {
    days: number;
    title: string;
    unlocked: boolean;
    rewardBadge: string;
  }[];
}

let mockStreakState: StreakData = {
  currentStreakDays: 7,
  longestStreakDays: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalCheckIns: 28,
  milestones: [
    { days: 3, title: 'Getting Started', unlocked: true, rewardBadge: '🔥 3-Day Starter' },
    { days: 7, title: 'One Week Strong', unlocked: true, rewardBadge: '⚡ 7-Day Warrior' },
    { days: 14, title: 'Fortnight Champion', unlocked: true, rewardBadge: '🏆 14-Day Master' },
    { days: 30, title: 'Monthly Legend', unlocked: false, rewardBadge: '👑 30-Day Titan' }
  ]
};

export const getStreakData = async (): Promise<StreakData> => {
  return mockStreakState;
};

export const logDailyCheckIn = async (): Promise<StreakData> => {
  const today = new Date().toISOString().split('T')[0];
  if (mockStreakState.lastActiveDate !== today) {
    mockStreakState.currentStreakDays += 1;
    if (mockStreakState.currentStreakDays > mockStreakState.longestStreakDays) {
      mockStreakState.longestStreakDays = mockStreakState.currentStreakDays;
    }
    mockStreakState.totalCheckIns += 1;
    mockStreakState.lastActiveDate = today;

    // Check unlocks
    mockStreakState.milestones = mockStreakState.milestones.map((m) => {
      if (mockStreakState.currentStreakDays >= m.days) {
        return { ...m, unlocked: true };
      }
      return m;
    });
  }
  return mockStreakState;
};
