import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalorieRing } from '../components/dashboard/CalorieRing';
import { MacroCard } from '../components/dashboard/MacroCard';
import { TodayMealsSummary } from '../components/dashboard/TodayMealsSummary';
import { TodayActivityCard } from '../components/dashboard/TodayActivityCard';
import { WaterTrackerCard } from '../components/dashboard/WaterTrackerCard';
import { WeightSummaryCard } from '../components/dashboard/WeightSummaryCard';
import { WeeklyCalorieChart } from '../components/dashboard/WeeklyCalorieChart';
import { WeightTrendPreview } from '../components/dashboard/WeightTrendPreview';
import { AddMealModal } from '../components/meals/AddMealModal';
import { Toast } from '../components/common/Toast';
import {
  mockUserProfile,
  mockTodayNutritionGoal,
  mockTodayNutritionCurrent,
  mockTodayMeals,
  mockTodayActivity,
  mockWeightSummary,
  mockWeeklyCalorieHistory,
} from '../data/mockData';
import type { Meal } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>(mockTodayMeals);
  const [nutritionCurrent, setNutritionCurrent] = useState(mockTodayNutritionCurrent);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddMeal = (newMeal: Meal) => {
    setMeals((prev) => [newMeal, ...prev]);
    setNutritionCurrent((prev) => ({
      calories: prev.calories + newMeal.calories,
      protein: prev.protein + newMeal.protein,
      carbs: prev.carbs + newMeal.carbs,
      fat: prev.fat + newMeal.fat,
    }));
    setToastMessage(`Added ${newMeal.details} (${newMeal.calories} kcal)`);
  };

  const formattedDate = 'September 25';

  return (
    <div className="space-y-5 px-4 pt-4 pb-6 animate-fade-in">
      {/* Header Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
            {mockUserProfile.greeting}
          </h1>
          <p className="text-xs font-bold text-yellow-400 mt-0.5">
            {formattedDate}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-yellow-400/30 overflow-hidden shrink-0 flex items-center justify-center font-extrabold text-yellow-400 text-sm shadow-md">
          AV
        </div>
      </div>

      {/* Today's Calorie Summary Ring */}
      <CalorieRing
        current={nutritionCurrent.calories}
        target={mockTodayNutritionGoal.calories}
      />

      {/* Compact Macro Cards */}
      <MacroCard current={nutritionCurrent} goal={mockTodayNutritionGoal} />

      {/* Today's Meals Section */}
      <TodayMealsSummary
        meals={meals}
        onAddMeal={() => setIsAddMealOpen(true)}
      />

      {/* Today's Activity */}
      <TodayActivityCard activity={mockTodayActivity} />

      {/* Water Intake Tracker */}
      <WaterTrackerCard initialIntakeMl={1500} targetMl={2500} />

      {/* Weight Summary */}
      <WeightSummaryCard
        weightData={mockWeightSummary}
        onViewProgress={() => navigate('/progress')}
      />

      {/* Weekly Calorie Chart */}
      <WeeklyCalorieChart
        data={mockWeeklyCalorieHistory}
        targetCalories={mockTodayNutritionGoal.calories}
      />

      {/* Weight Trend Preview */}
      <WeightTrendPreview
        history={mockWeightSummary.history}
        onViewProgress={() => navigate('/progress')}
      />

      {/* Modal & Toast */}
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
