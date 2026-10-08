export interface Milestone {
  days: number;
  title: string;
  unlocked: boolean;
  rewardBadge: string;
}

export interface StreakInfo {
  currentStreakDays: number;
  longestStreakDays: number;
  lastActiveDate: string;
  totalCheckIns: number;
  milestones: Milestone[];
}
