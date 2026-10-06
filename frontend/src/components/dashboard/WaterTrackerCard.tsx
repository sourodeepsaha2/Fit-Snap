import React, { useState } from 'react';
import { Droplet, Plus } from 'lucide-react';

interface WaterTrackerCardProps {
  initialIntakeMl?: number;
  targetMl?: number;
}

export const WaterTrackerCard: React.FC<WaterTrackerCardProps> = ({
  initialIntakeMl = 1250,
  targetMl = 2500,
}) => {
  const [currentMl, setCurrentMl] = useState(initialIntakeMl);

  const percentage = Math.min(100, Math.round((currentMl / targetMl) * 100));

  const handleAddWater = (amount: number) => {
    setCurrentMl((prev) => prev + amount);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Droplet className="w-4 h-4 fill-cyan-400/20" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100 tracking-tight">Hydration Tracker</h3>
            <p className="text-xs text-zinc-400">Daily target: {(targetMl / 1000).toFixed(1)}L</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-white tracking-tight">
            {(currentMl / 1000).toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-zinc-400 ml-1">/ {(targetMl / 1000).toFixed(1)} L</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1.5 mb-4 relative z-10">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-cyan-400">{percentage}% completed</span>
          <span className="text-zinc-500 font-medium">
            {targetMl - currentMl > 0 ? `${targetMl - currentMl} ml remaining` : 'Target reached! 🎉'}
          </span>
        </div>
        <div className="w-full h-3 bg-zinc-950/80 border border-zinc-800 rounded-full p-0.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-500/20"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Add Actions */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        <button
          type="button"
          onClick={() => handleAddWater(250)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-950/80 hover:bg-zinc-800/90 border border-zinc-800 rounded-2xl text-xs font-bold text-zinc-200 hover:text-white transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          +250 ml Glass
        </button>

        <button
          type="button"
          onClick={() => handleAddWater(500)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-950/80 hover:bg-zinc-800/90 border border-zinc-800 rounded-2xl text-xs font-bold text-zinc-200 hover:text-white transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          +500 ml Bottle
        </button>
      </div>
    </div>
  );
};
