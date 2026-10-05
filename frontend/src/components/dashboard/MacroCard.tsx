import React from 'react';
import type { NutritionMacros, NutritionGoal } from '../../types';

interface MacroCardProps {
  current: NutritionMacros;
  goal: NutritionGoal;
}

export const MacroCard: React.FC<MacroCardProps> = ({ current, goal }) => {
  const macros = [
    {
      label: 'Protein',
      value: current.protein,
      target: goal.protein,
      unit: 'g',
      color: 'bg-yellow-400',
      badgeBg: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
      barColor: 'bg-yellow-400',
    },
    {
      label: 'Carbs',
      value: current.carbs,
      target: goal.carbs,
      unit: 'g',
      color: 'bg-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      barColor: 'bg-amber-400',
    },
    {
      label: 'Fat',
      value: current.fat,
      target: goal.fat,
      unit: 'g',
      color: 'bg-orange-400',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      barColor: 'bg-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {macros.map((macro) => {
        const pct = Math.min(Math.round((macro.value / macro.target) * 100), 100);
        return (
          <div
            key={macro.label}
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-zinc-300">{macro.label}</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${macro.badgeBg}`}>
                {pct}%
              </span>
            </div>

            <div className="my-1">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white tracking-tight">
                  {macro.value}
                </span>
                <span className="text-xs text-zinc-400">
                  / {macro.target}{macro.unit}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all duration-500 ${macro.barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
