import type { AIFoodItem, AINutritionTotals } from '../../types/meal.js';

export function calculateTotalsFromFoods(foods: AIFoodItem[]): AINutritionTotals {
  return foods.reduce(
    (acc, item) => ({
      calories: Math.round(acc.calories + (Number(item.calories) || 0)),
      protein: Math.round((acc.protein + (Number(item.protein) || 0)) * 10) / 10,
      carbs: Math.round((acc.carbs + (Number(item.carbs) || 0)) * 10) / 10,
      fat: Math.round((acc.fat + (Number(item.fat) || 0)) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function validateAIFoodItem(item: unknown): item is AIFoodItem {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.name === 'string' &&
    typeof obj.estimatedWeightGrams === 'number' &&
    typeof obj.calories === 'number' &&
    typeof obj.protein === 'number' &&
    typeof obj.carbs === 'number' &&
    typeof obj.fat === 'number'
  );
}
