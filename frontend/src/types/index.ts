export type MealCategory = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type MealType = MealCategory;

export interface NutritionMacros {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
}

export interface NutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealFood {
  id: string;
  name: string;
  quantityGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: number;
  // Base reference values for scaling calculations
  baseQuantityGrams: number;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFat: number;
}

export interface MealAnalysisResult {
  id: string;
  imageUrl: string;
  detectedFoods: MealFood[];
  totalNutrition: Nutrition;
  timestamp: string;
}

export interface Meal {
  id: string;
  name: string;
  details: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: MealCategory;
  loggedAt: string; // e.g. "8:30 AM"
  imageUrl?: string;
  foods?: MealFood[];
}

export interface ActivitySummary {
  strengthDurationMin: number;
  cardioDurationMin: number;
  steps: number;
  caloriesBurned: number;
}

export interface WeightSummary {
  currentKg: number;
  targetKg: number;
  changeThisMonthKg: number;
  history: Array<{
    day: string;
    weight: number;
  }>;
}

export interface CalorieLog {
  day: string;
  dateStr: string;
  calories: number;
  target: number;
  protein: number;
}

export interface StrengthExercise {
  id: string;
  name: string;
  weightKg: number;
  reps: number;
  sets: number;
}

export interface CardioExercise {
  id: string;
  name: string;
  durationMin: number;
  incline?: number;
  speedKmh?: number;
  caloriesBurned: number;
}

export interface WorkoutData {
  date: string;
  title: string;
  strength: StrengthExercise[];
  cardio: CardioExercise[];
}

export interface UserProfile {
  name: string;
  greeting: string;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  dailyCalorieGoal: number;
  dailyProteinGoal: number;
  dailyCarbsGoal: number;
  dailyFatGoal: number;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  hapticFeedback: boolean;
  unit: 'kg' | 'lbs';
}

export interface ProgressStats {
  averageDailyCalories: number;
  averageProteinGrams: number;
  totalWorkoutsThisMonth: number;
  totalCardioTimeMin: number;
  totalStepsThisMonth: number;
}
