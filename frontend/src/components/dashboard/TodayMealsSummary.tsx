import React from 'react';
import { Plus, Coffee, Utensils, Cookie, Moon } from 'lucide-react';
import type { Meal } from '../../types';
import { Button } from '../common/Button';

interface TodayMealsSummaryProps {
  meals: Meal[];
  onAddMeal: () => void;
}

export const TodayMealsSummary: React.FC<TodayMealsSummaryProps> = ({
  meals,
  onAddMeal,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakfast':
        return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'lunch':
        return <Utensils className="w-4 h-4 text-yellow-400" />;
      case 'snack':
        return <Cookie className="w-4 h-4 text-orange-400" />;
      case 'dinner':
        return <Moon className="w-4 h-4 text-amber-300" />;
      default:
        return <Utensils className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-100 tracking-tight">Today's Meals</h3>
          <p className="text-xs text-zinc-400">{meals.length} meals logged</p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={<Plus className="w-4 h-4 stroke-[3]" />}
          onClick={onAddMeal}
        >
          Add Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between hover:border-zinc-700 transition-all tap-active"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-zinc-800/80 rounded-xl shrink-0">
                {getCategoryIcon(meal.category)}
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  {meal.name}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{meal.details}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                  <span>{meal.loggedAt}</span>
                  <span>•</span>
                  <span className="text-yellow-400 font-semibold">{meal.protein}g protein</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-base font-black text-white">
                {meal.calories}
              </span>
              <span className="text-xs text-zinc-400 block font-medium">kcal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
