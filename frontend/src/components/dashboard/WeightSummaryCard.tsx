import React from 'react';
import { Scale, TrendingDown } from 'lucide-react';
import type { WeightSummary } from '../../types';

interface WeightSummaryCardProps {
  weightData: WeightSummary;
  onViewProgress?: () => void;
}

export const WeightSummaryCard: React.FC<WeightSummaryCardProps> = ({
  weightData,
  onViewProgress,
}) => {
  const { currentKg, targetKg, changeThisMonthKg } = weightData;
  
  const startingWeight = 78.0;
  const totalDifference = startingWeight - targetKg;
  const currentDifference = startingWeight - currentKg;
  const progressPercent = Math.min(Math.max(Math.round((currentDifference / totalDifference) * 100), 0), 100);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100 tracking-tight">Weight Tracker</h3>
            <span className="text-xs text-zinc-400 font-medium">Target: {targetKg} kg</span>
          </div>
        </div>

        {onViewProgress && (
          <button
            onClick={onViewProgress}
            className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Details &rarr;
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 items-center bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3.5">
        <div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            Current Weight
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black text-white tracking-tight">
              {currentKg}
            </span>
            <span className="text-xs font-medium text-zinc-400">kg</span>
          </div>
        </div>

        <div className="text-right border-l border-zinc-800/80 pl-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            This Month
          </span>
          <div className="inline-flex items-center gap-1 text-yellow-400 font-extrabold mt-1 bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20 text-xs">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{changeThisMonthKg} kg</span>
          </div>
        </div>
      </div>

      {/* Mini Weight Progress indicator */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-zinc-400 mb-1 font-medium">
          <span>Progress to {targetKg} kg</span>
          <span className="text-yellow-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
