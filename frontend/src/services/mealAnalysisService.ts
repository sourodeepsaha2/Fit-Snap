import type { MealAnalysisResult, MealFood } from '../types';
import { calculateMealTotals } from '../utils/nutritionCalculator';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface BackendFoodItem {
  name: string;
  estimatedWeightGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: number;
}

interface BackendAPIResponse {
  foods: BackendFoodItem[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface BackendErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export async function analyzeMealImage(
  imageSource: File | string
): Promise<MealAnalysisResult> {
  const formData = new FormData();
  let previewUrl = '';

  if (imageSource instanceof File) {
    formData.append('image', imageSource);
    previewUrl = URL.createObjectURL(imageSource);
  } else if (typeof imageSource === 'string') {
    previewUrl = imageSource;
    // Convert data URL or blob URL to blob file for upload
    try {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      const file = new File([blob], 'meal-photo.jpg', { type: blob.type || 'image/jpeg' });
      formData.append('image', file);
    } catch {
      throw new Error('Unable to process the image for upload.');
    }
  } else {
    throw new Error('No valid image provided for analysis.');
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/meals/analyze`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const errData = data as BackendErrorResponse;
      const errorMessage = errData?.error?.message || 'Failed to analyze meal image.';
      throw new Error(errorMessage);
    }

    const apiResponse = data as BackendAPIResponse;

    const detectedFoods: MealFood[] = apiResponse.foods.map((food, idx) => {
      const grams = Math.max(Number(food.estimatedWeightGrams) || 100, 0);
      const calories = Math.max(Number(food.calories) || 0, 0);
      const protein = Math.max(Number(food.protein) || 0, 0);
      const carbs = Math.max(Number(food.carbs) || 0, 0);
      const fat = Math.max(Number(food.fat) || 0, 0);

      return {
        id: `food-${Date.now()}-${idx}`,
        name: food.name || 'Identified Food',
        quantityGrams: grams,
        calories,
        protein,
        carbs,
        fat,
        confidence: food.confidence,
        baseQuantityGrams: grams,
        baseCalories: calories,
        baseProtein: protein,
        baseCarbs: carbs,
        baseFat: fat,
      };
    });

    const totals = calculateMealTotals(detectedFoods);

    return {
      id: `analysis-${Date.now()}`,
      imageUrl: previewUrl,
      detectedFoods,
      totalNutrition: totals,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Unable to connect to FitSnap backend service. Make sure the server is running.');
  }
}
