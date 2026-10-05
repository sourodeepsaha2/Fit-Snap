export interface AIFoodItem {
  name: string;
  estimatedWeightGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: number;
}

export interface AINutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealAnalysisAPIResponse {
  foods: AIFoodItem[];
  totals: AINutritionTotals;
}

export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
