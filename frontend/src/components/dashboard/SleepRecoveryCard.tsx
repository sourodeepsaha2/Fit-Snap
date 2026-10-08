import React, { useState } from 'react';
import type { SleepLog } from '../../types/sleep';

export const SleepRecoveryCard: React.FC = () => {
  const [sleepLog, setSleepLog] = useState<SleepLog>({
    id: 's1',
    date: 'Today',
    durationHours: 7.5,
    deepSleepMinutes: 110,
    remSleepMinutes: 95,
    qualityRating: 4,
    recoveryScore: 88,
  });

  const getRecoveryLabel = (score: number) => {
    if (score >= 85) return { text: 'Optimal Recovery', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (score >= 70) return { text: 'Good Recovery', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
    return { text: 'Needs Rest', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const status = getRecoveryLabel(sleepLog.recoveryScore);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl text-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🌙</span>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Sleep & Body Recovery</h3>
            <p className="text-[11px] text-zinc-400">Last Night Log</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.color}`}>
          {status.text}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 text-center">
          <div className="text-base font-black text-indigo-400">{sleepLog.durationHours}h</div>
          <div className="text-[10px] text-zinc-400 font-semibold uppercase">Duration</div>
        </div>
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 text-center">
          <div className="text-base font-black text-purple-400">{sleepLog.deepSleepMinutes}m</div>
          <div className="text-[10px] text-zinc-400 font-semibold uppercase">Deep Sleep</div>
        </div>
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 text-center">
          <div className="text-base font-black text-emerald-400">{sleepLog.recoveryScore}%</div>
          <div className="text-[10px] text-zinc-400 font-semibold uppercase">Recovery</div>
        </div>
      </div>
    </div>
  );
};
