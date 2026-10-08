import React, { useState } from 'react';
import type { FitnessGoal } from '../../types/goal';

export const FitnessGoalsCard: React.FC = () => {
  const [goals, setGoals] = useState<FitnessGoal[]>([
    {
      id: 'g1',
      category: 'weight',
      title: 'Target Weight Goal',
      targetValue: 70,
      currentValue: 73.5,
      unit: 'kg',
      deadline: 'Nov 15',
      isCompleted: false,
    },
    {
      id: 'g2',
      category: 'workout',
      title: 'Weekly Workouts',
      targetValue: 5,
      currentValue: 4,
      unit: 'sessions',
      deadline: 'Oct 12',
      isCompleted: false,
    },
    {
      id: 'g3',
      category: 'water',
      title: 'Daily Water Target',
      targetValue: 2.5,
      currentValue: 2.5,
      unit: 'L',
      deadline: 'Daily',
      isCompleted: true,
    }
  ]);

  const incrementGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextVal = Number((g.currentValue + 0.5).toFixed(1));
          return {
            ...g,
            currentValue: nextVal,
            isCompleted: nextVal >= g.targetValue,
          };
        }
        return g;
      })
    );
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl text-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🎯</span>
          <h3 className="text-sm font-bold text-zinc-100">Personal Fitness Goals</h3>
        </div>
        <span className="text-[11px] text-zinc-400 font-semibold bg-zinc-800/80 px-2 py-0.5 rounded-full">
          {goals.filter((g) => g.isCompleted).length}/{goals.length} Completed
        </span>
      </div>

      <div className="space-y-2.5">
        {goals.map((g) => {
          const percentage = Math.min(Math.round((g.currentValue / g.targetValue) * 100), 100);
          return (
            <div key={g.id} className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-zinc-200">{g.title}</span>
                <span className="text-zinc-400 font-mono">
                  {g.currentValue} / {g.targetValue} {g.unit}
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    g.isCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-yellow-400 to-amber-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span>Deadline: {g.deadline}</span>
                <button
                  onClick={() => incrementGoal(g.id)}
                  disabled={g.isCompleted}
                  className="text-yellow-400 hover:text-yellow-300 font-bold disabled:text-zinc-600"
                >
                  {g.isCompleted ? '✓ Done' : '+ Log Progress'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
