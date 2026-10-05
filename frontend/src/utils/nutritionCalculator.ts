import type { MealFood, Nutrition } from '../types';

/**
 * Scale food item macros proportionally based on a new quantity in grams.
 */
export function scaleFoodNutrition(food: MealFood, newQuantityGrams: number): MealFood {
  const safeQuantity = Math.max(newQuantityGrams, 0);
  const baseGrams = food.baseQuantityGrams || 100;
  const ratio = safeQuantity / baseGrams;

  return {
    ...food,
    quantityGrams: safeQuantity,
    calories: Math.round(food.baseCalories * ratio),
    protein: Math.round(food.baseProtein * ratio * 10) / 10,
    carbs: Math.round(food.baseCarbs * ratio * 10) / 10,
    fat: Math.round(food.baseFat * ratio * 10) / 10,
  };
}

/**
 * Calculate total nutrition summary for an array of food items.
 */
export function calculateMealTotals(foods: MealFood[]): Nutrition {
  return foods.reduce(
    (acc, food) => ({
      calories: acc.calories + (Number(food.calories) || 0),
      protein: Math.round((acc.protein + (Number(food.protein) || 0)) * 10) / 10,
      carbs: Math.round((acc.carbs + (Number(food.carbs) || 0)) * 10) / 10,
      fat: Math.round((acc.fat + (Number(food.fat) || 0)) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
