import React, { useState } from 'react';
import type { StreakInfo } from '../../types/streak';

export const StreakGamificationCard: React.FC = () => {
  const [streak, setStreak] = useState<StreakInfo>({
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
  });
  const [checkedToday, setCheckedToday] = useState(false);

  const handleCheckIn = () => {
    if (checkedToday) return;
    setStreak((prev) => ({
      ...prev,
      currentStreakDays: prev.currentStreakDays + 1,
      longestStreakDays: Math.max(prev.longestStreakDays, prev.currentStreakDays + 1),
      totalCheckIns: prev.totalCheckIns + 1,
    }));
    setCheckedToday(true);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl text-white space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl animate-bounce">🔥</span>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Workout & Streak Tracker</h3>
            <p className="text-xs text-zinc-400">Keep the momentum going!</p>
          </div>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={checkedToday}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            checkedToday
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:opacity-90 active:scale-95 shadow-lg shadow-orange-500/20'
          }`}
        >
          {checkedToday ? '✓ Checked In' : '⚡ Daily Check-in'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
          <div className="text-lg font-black text-orange-400">{streak.currentStreakDays} Days</div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Current Streak</div>
        </div>
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
          <div className="text-lg font-black text-yellow-400">{streak.longestStreakDays} Days</div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Best Streak</div>
        </div>
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
          <div className="text-lg font-black text-emerald-400">{streak.totalCheckIns}</div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Total Days</div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-zinc-300">Badges & Milestones</div>
        <div className="grid grid-cols-2 gap-2">
          {streak.milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                m.unlocked
                  ? 'bg-orange-950/30 border-orange-500/30 text-orange-200'
                  : 'bg-zinc-950/40 border-zinc-800 text-zinc-500 opacity-60'
              }`}
            >
              <span className="font-semibold">{m.rewardBadge}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 font-mono">
                {m.unlocked ? 'Unlocked' : `${m.days}d`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
