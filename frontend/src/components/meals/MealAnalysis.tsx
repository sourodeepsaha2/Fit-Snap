import React, { useState } from 'react';
import { Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { MealImageUploader } from './MealImageUploader';
import { FoodItemCard } from './FoodItemCard';
import { NutritionSummary } from './NutritionSummary';
import { AddFoodForm } from './AddFoodForm';
import { MealTypeSelector } from './MealTypeSelector';
import { SaveMealButton } from './SaveMealButton';
import { analyzeMealImage } from '../../services/mealAnalysisService';
import { calculateMealTotals } from '../../utils/nutritionCalculator';
import type { MealFood, MealCategory, Meal } from '../../types';

interface MealAnalysisProps {
  onMealSaved: (newMeal: Meal) => void;
  onCancel?: () => void;
}

export const MealAnalysis: React.FC<MealAnalysisProps> = ({
  onMealSaved,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Analysis result state
  const [analysisDone, setAnalysisDone] = useState(false);
  const [foods, setFoods] = useState<MealFood[]>([]);
  const [mealCategory, setMealCategory] = useState<MealCategory>('lunch');

  const handleImageSelected = (file: File, objectUrl: string) => {
    setSelectedFile(file);
    setSelectedImageUrl(objectUrl);
    setError(null);
    setAnalysisDone(false);
  };

  const handleClearImage = () => {
    if (selectedImageUrl && selectedImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedFile(null);
    setSelectedImageUrl(null);
    setError(null);
    setAnalysisDone(false);
    setFoods([]);
  };

  const startAnalysis = async () => {
    if (!selectedImageUrl && !selectedFile) {
      setError('Please select or capture a photo first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setLoadingStep(0);

    // Animate loading step messages
    const step1 = setTimeout(() => setLoadingStep(1), 500);
    const step2 = setTimeout(() => setLoadingStep(2), 1100);

    try {
      const result = await analyzeMealImage(selectedFile || selectedImageUrl!);

      setFoods(result.detectedFoods);
      setAnalysisDone(true);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(errMsg);
    } finally {
      clearTimeout(step1);
      clearTimeout(step2);
      setIsAnalyzing(false);
    }
  };

  const handleUpdateFood = (updatedFood: MealFood) => {
    setFoods((prev) =>
      prev.map((item) => (item.id === updatedFood.id ? updatedFood : item))
    );
  };

  const handleDeleteFood = (id: string) => {
    setFoods((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddFood = (newFood: MealFood) => {
    setFoods((prev) => [...prev, newFood]);
  };

  const totals = calculateMealTotals(foods);

  const handleSaveMeal = () => {
    if (foods.length === 0) {
      setError('Cannot save an empty meal. Please add at least one food item.');
      return;
    }

    const primaryFoodName = foods[0]?.name || 'Meal';
    const otherFoodsCount = foods.length - 1;
    const detailsString =
      otherFoodsCount > 0
        ? `${primaryFoodName} + ${otherFoodsCount} item${otherFoodsCount > 1 ? 's' : ''}`
        : foods.map((f) => f.name).join(', ');

    const newMeal: Meal = {
      id: `meal-${Date.now()}`,
      name: mealCategory.charAt(0).toUpperCase() + mealCategory.slice(1),
      details: detailsString,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat,
      category: mealCategory,
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: selectedImageUrl || undefined,
      foods,
    };

    onMealSaved(newMeal);
  };

  return (
    <div className="space-y-4">
      {!analysisDone && !isAnalyzing && (
        <MealImageUploader
          onImageSelected={handleImageSelected}
          onAnalyze={() => startAnalysis()}
          onClear={handleClearImage}
          selectedImageUrl={selectedImageUrl}
          selectedFile={selectedFile}
          error={error}
        />
      )}

      {/* Analysis Loading State */}
      {isAnalyzing && (
        <div className="py-10 text-center space-y-5 animate-fade-in bg-zinc-950/90 border border-zinc-800 rounded-3xl p-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400/20 animate-ping" />
            <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center border border-yellow-400/40 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-white">Analyzing your meal...</h3>
            <p className="text-xs text-zinc-400 mt-1">
              FitSnap AI vision scanner extracting ingredients & portion estimates
            </p>
          </div>

          {/* Step Indicators */}
          <div className="space-y-2 max-w-xs mx-auto text-left text-xs font-semibold bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
            <div className={`flex items-center gap-2.5 transition-opacity ${loadingStep >= 0 ? 'text-yellow-400' : 'text-zinc-500 opacity-40'}`}>
              <span>🔍</span>
              <span>Identifying foods</span>
            </div>
            <div className={`flex items-center gap-2.5 transition-opacity ${loadingStep >= 1 ? 'text-yellow-400' : 'text-zinc-500 opacity-40'}`}>
              <span>⚖️</span>
              <span>Estimating portions</span>
            </div>
            <div className={`flex items-center gap-2.5 transition-opacity ${loadingStep >= 2 ? 'text-yellow-400' : 'text-zinc-500 opacity-40'}`}>
              <span>📊</span>
              <span>Calculating nutrition</span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {analysisDone && !isAnalyzing && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Image Preview Thumbnail */}
          {selectedImageUrl && (
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-zinc-800 shadow-md group">
              <img
                src={selectedImageUrl}
                alt="Analyzed meal"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-3">
                <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg border border-zinc-700/60 backdrop-blur-sm">
                  Meal Photo
                </span>
                <button
                  onClick={handleClearImage}
                  className="text-xs font-bold text-yellow-400 hover:text-yellow-300 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-zinc-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Change Photo
                </button>
              </div>
            </div>
          )}

          {/* Nutrition Totals Summary Card */}
          <NutritionSummary totals={totals} />

          {/* Meal Type Segmented Selector */}
          <MealTypeSelector
            selectedCategory={mealCategory}
            onSelectCategory={setMealCategory}
          />

          {/* Detected Foods Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-yellow-400" />
                <h3 className="text-base font-extrabold text-zinc-100 tracking-tight">
                  Detected Foods
                </h3>
              </div>
              <span className="text-xs font-semibold text-zinc-400">
                {foods.length} items
              </span>
            </div>

            {foods.length === 0 ? (
              <div className="p-6 text-center bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-zinc-200">No foods in list</h4>
                <p className="text-xs text-zinc-400">
                  You removed all items. Add a custom food item below or re-analyze the image.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {foods.map((food) => (
                  <FoodItemCard
                    key={food.id}
                    food={food}
                    onUpdate={handleUpdateFood}
                    onDelete={handleDeleteFood}
                  />
                ))}
              </div>
            )}

            {/* Add Custom Food Form */}
            <AddFoodForm onAddFood={handleAddFood} />
          </div>

          {/* Sticky Save Meal Button */}
          <SaveMealButton
            onSave={handleSaveMeal}
            totalCalories={totals.calories}
            disabled={foods.length === 0}
          />
        </div>
      )}
    </div>
  );
};
