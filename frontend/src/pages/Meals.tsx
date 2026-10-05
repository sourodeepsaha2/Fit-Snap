import React, { useState, useEffect } from 'react';
import { Camera, Plus, UtensilsCrossed, Sparkles, Clock } from 'lucide-react';
import { AddMealModal } from '../components/meals/AddMealModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Toast } from '../components/common/Toast';
import { mockTodayMeals, mockRecentMeals } from '../data/mockData';
import type { Meal } from '../types';

const MEALS_STORAGE_KEY = 'fitsnap_logged_meals';

export const Meals: React.FC = () => {
  const [mealsList, setMealsList] = useState<Meal[]>(() => {
    const saved = localStorage.getItem(MEALS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return mockTodayMeals;
      }
    }
    return mockTodayMeals;
  });

  const [recentMeals, setRecentMeals] = useState<Meal[]>(mockRecentMeals);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(mealsList));
  }, [mealsList]);

  // Calculate totals
  const totalCalories = mealsList.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = mealsList.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = mealsList.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = mealsList.reduce((acc, m) => acc + m.fat, 0);

  const handleAddMeal = (newMeal: Meal) => {
    setMealsList((prev) => [newMeal, ...prev]);
    setRecentMeals((prev) => [newMeal, ...prev]);
    setToastMessage(`Logged ${newMeal.details} (${newMeal.calories} kcal)`);
  };

  return (
    <div className="space-y-5 px-4 pt-4 pb-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Meals</h1>
          <p className="text-xs text-zinc-400">Track & analyze nutrition</p>
        </div>
        <Badge variant="yellow" icon={<Sparkles className="w-3.5 h-3.5" />}>
          AI Scanner Ready
        </Badge>
      </div>

      {/* Today's Total Summary Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
          Today's Total Intake
        </span>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-black text-white tracking-tight">
            {totalCalories.toLocaleString()}
          </span>
          <span className="text-sm font-extrabold text-yellow-400">kcal</span>
          <span className="text-zinc-600 text-sm mx-1">•</span>
          <span className="text-lg font-extrabold text-zinc-200">{totalProtein}g</span>
          <span className="text-xs text-zinc-400">protein</span>
        </div>

        {/* Macro breakdown pills */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-zinc-800/80">
          <div className="bg-zinc-950/80 p-2 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-medium">Protein</span>
            <span className="text-xs font-bold text-yellow-400">{totalProtein}g</span>
          </div>
          <div className="bg-zinc-950/80 p-2 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-medium">Carbs</span>
            <span className="text-xs font-bold text-amber-400">{totalCarbs}g</span>
          </div>
          <div className="bg-zinc-950/80 p-2 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-medium">Fat</span>
            <span className="text-xs font-bold text-orange-400">{totalFat}g</span>
          </div>
        </div>
      </div>

      {/* Prominent Large Add Meal Button */}
      <Button
        variant="primary"
        size="xl"
        fullWidth
        icon={<Camera className="w-6 h-6 stroke-[2.5]" />}
        onClick={() => setIsAddMealOpen(true)}
        className="glow-yellow"
      >
        📸 Add Meal
      </Button>

      {/* Today's Meal List */}
      <div className="space-y-3 pt-1">
        <h3 className="text-base font-bold text-zinc-100 tracking-tight flex items-center justify-between">
          <span>Today's Logged Meals</span>
          <span className="text-xs font-normal text-zinc-400">{mealsList.length} items</span>
        </h3>

        <div className="space-y-2.5">
          {mealsList.map((meal) => (
            <div
              key={meal.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-700 transition-all tap-active"
            >
              <div className="flex items-center gap-3">
                {meal.imageUrl ? (
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                    <img src={meal.imageUrl} alt={meal.details} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-xl shrink-0">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-yellow-400 uppercase">
                      {meal.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">• {meal.loggedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{meal.details}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400 font-medium">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fat}g</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-white">
                  {meal.calories}
                </span>
                <span className="text-xs text-zinc-400 block font-medium">kcal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Meals Section */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <h3 className="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span>Recent Meals</span>
        </h3>

        <div className="space-y-2">
          {recentMeals.slice(0, 4).map((meal) => (
            <div
              key={`recent-${meal.id}`}
              className="bg-zinc-950/70 border border-zinc-800/60 rounded-xl p-3 flex items-center justify-between hover:bg-zinc-900/60 transition-colors"
            >
              <div>
                <span className="text-xs font-semibold text-zinc-200">{meal.details}</span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {meal.loggedAt} • {meal.protein}g protein
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-yellow-400">{meal.calories} kcal</span>
                <button
                  onClick={() => handleAddMeal({ ...meal, id: `meal-${Date.now()}`, loggedAt: 'Just now' })}
                  className="p-1.5 bg-zinc-800 hover:bg-yellow-400/20 text-zinc-300 hover:text-yellow-400 rounded-lg transition-colors"
                  title="Re-log this meal"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal & Toast */}
      <AddMealModal
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
        onAddMeal={handleAddMeal}
      />

      <Toast
        isOpen={!!toastMessage}
        message={toastMessage || ''}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
