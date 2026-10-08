import React, { useState } from 'react';
import type { FitnessNotification } from '../../types/notification';

export const SmartNudgeCard: React.FC = () => {
  const [nudges, setNudges] = useState<FitnessNotification[]>([
    {
      id: 'n1',
      type: 'water',
      title: 'Hydration Alert 💧',
      message: 'Time for a glass of water! You are 1,000ml away from your daily target.',
      timestamp: '10 mins ago',
      isRead: false,
      priority: 'medium',
    },
    {
      id: 'n2',
      type: 'streak',
      title: 'Streak Multiplier Active 🔥',
      message: 'You have a 7-day streak going! Log a workout today to earn your next badge.',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'high',
    }
  ]);

  const dismissNudge = (id: string) => {
    setNudges((prev) => prev.filter((n) => n.id !== id));
  };

  if (nudges.length === 0) return null;

  return (
    <div className="space-y-2">
      {nudges.map((nudge) => (
        <div
          key={nudge.id}
          className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-xl p-3.5 flex items-start justify-between shadow-lg"
        >
          <div className="space-y-0.5 pr-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide">Smart Nudge</span>
              <span className="text-[10px] text-zinc-400 font-mono">• {nudge.timestamp}</span>
            </div>
            <h4 className="text-xs font-bold text-white">{nudge.title}</h4>
            <p className="text-xs text-zinc-300 leading-snug">{nudge.message}</p>
          </div>
          <button
            onClick={() => dismissNudge(nudge.id)}
            className="text-zinc-500 hover:text-zinc-300 text-xs font-bold p-1 shrink-0"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
