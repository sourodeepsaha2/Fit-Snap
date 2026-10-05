import React from 'react';
import { Flame } from 'lucide-react';

interface CalorieRingProps {
  current: number;
  target: number;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({ current, target }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  const remaining = Math.max(target - current, 0);

  // SVG ring dimensions
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4">
        {/* Ring Chart */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-yellow-400 transition-all duration-1000 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-yellow-400 mb-0.5 animate-pulse" />
            <span className="text-xl font-black text-white tracking-tight leading-none">
              {current.toLocaleString()}
            </span>
            <span className="text-[11px] font-medium text-zinc-400 mt-0.5">
              / {target.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Today's Calories
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">
              {percentage}% <span className="text-xs font-normal text-zinc-400">of goal</span>
            </h2>
          </div>

          <div className="bg-zinc-950/80 rounded-xl p-2.5 border border-zinc-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Remaining</span>
              <span className="font-bold text-yellow-400">{remaining.toLocaleString()} kcal</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-yellow-400"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
