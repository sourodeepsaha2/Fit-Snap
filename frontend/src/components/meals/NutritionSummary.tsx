import React from 'react';
import type { Nutrition } from '../../types';
import { Flame } from 'lucide-react';

interface NutritionSummaryProps {
  totals: Nutrition;
}

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({ totals }) => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Analysis Total
            </span>
            <h3 className="text-base font-extrabold text-white">Estimated Nutrition</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-white tracking-tight">
            {totals.calories}
          </span>
          <span className="text-xs font-bold text-yellow-400 ml-1">kcal</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-zinc-800/80">
        <div className="bg-zinc-950/80 border border-zinc-800/80 p-2.5 rounded-2xl text-center">
          <span className="text-[11px] text-zinc-400 font-semibold block">Protein</span>
          <span className="text-base font-black text-yellow-400">{totals.protein}g</span>
        </div>
        <div className="bg-zinc-950/80 border border-zinc-800/80 p-2.5 rounded-2xl text-center">
          <span className="text-[11px] text-zinc-400 font-semibold block">Carbs</span>
          <span className="text-base font-black text-amber-400">{totals.carbs}g</span>
        </div>
        <div className="bg-zinc-950/80 border border-zinc-800/80 p-2.5 rounded-2xl text-center">
          <span className="text-[11px] text-zinc-400 font-semibold block">Fat</span>
          <span className="text-base font-black text-orange-400">{totals.fat}g</span>
        </div>
      </div>
    </div>
  );
};
