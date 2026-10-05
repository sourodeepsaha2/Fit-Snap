import React from 'react';
import { Dumbbell, HeartPulse, Footprints, Flame } from 'lucide-react';
import type { ActivitySummary } from '../../types';

interface TodayActivityCardProps {
  activity: ActivitySummary;
}

export const TodayActivityCard: React.FC<TodayActivityCardProps> = ({ activity }) => {
  const items = [
    {
      title: 'Strength Training',
      value: `${activity.strengthDurationMin} min`,
      icon: <Dumbbell className="w-4 h-4 text-yellow-400" />,
      bgColor: 'bg-yellow-400/10 border-yellow-400/20',
    },
    {
      title: 'Cardio',
      value: `${activity.cardioDurationMin} min`,
      icon: <HeartPulse className="w-4 h-4 text-orange-400" />,
      bgColor: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      title: 'Steps',
      value: activity.steps.toLocaleString(),
      icon: <Footprints className="w-4 h-4 text-amber-400" />,
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Calories Burned',
      value: `${activity.caloriesBurned} kcal`,
      icon: <Flame className="w-4 h-4 text-yellow-400" />,
      bgColor: 'bg-yellow-400/10 border-yellow-400/20',
    },
  ];

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-zinc-100 tracking-tight">Today's Activity</h3>
        <span className="text-xs text-zinc-400 font-medium">Target active</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3 flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl border ${item.bgColor} shrink-0`}>
              {item.icon}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 block leading-tight">
                {item.title}
              </span>
              <span className="text-sm font-black text-white mt-0.5 block tracking-tight">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
