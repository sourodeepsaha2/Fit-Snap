import type {
  UserProfile,
  NutritionMacros,
  NutritionGoal,
  Meal,
  ActivitySummary,
  WeightSummary,
  CalorieLog,
  WorkoutData,
  ProgressStats,
  UserPreferences
} from '../types';

export const mockUserProfile: UserProfile = {
  name: 'Alex Vance',
  greeting: 'Good morning 👋',
  heightCm: 178,
  weightKg: 75.0,
  targetWeightKg: 65.0,
  dailyCalorieGoal: 2200,
  dailyProteinGoal: 150,
  dailyCarbsGoal: 220,
  dailyFatGoal: 65,
};

export const mockUserPreferences: UserPreferences = {
  darkMode: true,
  notifications: true,
  hapticFeedback: true,
  unit: 'kg',
};

export const mockTodayNutritionGoal: NutritionGoal = {
  calories: 2200,
  protein: 150,
  carbs: 220,
  fat: 65,
};

export const mockTodayNutritionCurrent: NutritionMacros = {
  calories: 1842,
  protein: 137,
  carbs: 184,
  fat: 58,
};

export const mockTodayMeals: Meal[] = [
  {
    id: 'meal-1',
    name: 'Breakfast',
    details: '4 Poached Eggs',
    calories: 342,
    protein: 24,
    carbs: 2,
    fat: 22,
    category: 'breakfast',
    loggedAt: '08:15 AM',
  },
  {
    id: 'meal-2',
    name: 'Lunch',
    details: 'Rice + Chicken Curry',
    calories: 684,
    protein: 52,
    carbs: 76,
    fat: 18,
    category: 'lunch',
    loggedAt: '01:30 PM',
  },
  {
    id: 'meal-3',
    name: 'Snack',
    details: 'Whey Protein',
    calories: 120,
    protein: 25,
    carbs: 3,
    fat: 1.5,
    category: 'snack',
    loggedAt: '04:45 PM',
  },
  {
    id: 'meal-4',
    name: 'Dinner',
    details: 'Chicken + Rice',
    calories: 696,
    protein: 56,
    carbs: 78,
    fat: 16.5,
    category: 'dinner',
    loggedAt: '08:00 PM',
  },
];

export const mockRecentMeals: Meal[] = [
  ...mockTodayMeals,
  {
    id: 'meal-5',
    name: 'Yesterday Lunch',
    details: 'Grilled Salmon Bowl',
    calories: 620,
    protein: 44,
    carbs: 55,
    fat: 22,
    category: 'lunch',
    loggedAt: 'Yesterday 1:15 PM',
  },
  {
    id: 'meal-6',
    name: 'Yesterday Dinner',
    details: 'Lean Beef Wrap & Salad',
    calories: 580,
    protein: 42,
    carbs: 48,
    fat: 20,
    category: 'dinner',
    loggedAt: 'Yesterday 7:45 PM',
  },
];

export const mockTodayActivity: ActivitySummary = {
  strengthDurationMin: 75,
  cardioDurationMin: 30,
  steps: 7240,
  caloriesBurned: 430,
};

export const mockWeightSummary: WeightSummary = {
  currentKg: 75.0,
  targetKg: 65.0,
  changeThisMonthKg: -1.2,
  history: [
    { day: 'Mon', weight: 76.2 },
    { day: 'Tue', weight: 75.9 },
    { day: 'Wed', weight: 75.7 },
    { day: 'Thu', weight: 75.4 },
    { day: 'Fri', weight: 75.0 },
    { day: 'Sat', weight: 74.9 },
    { day: 'Sun', weight: 75.0 },
  ],
};

export const mockWeeklyCalorieHistory: CalorieLog[] = [
  { day: 'Mon', dateStr: 'Sep 19', calories: 1950, target: 2200, protein: 142 },
  { day: 'Tue', dateStr: 'Sep 20', calories: 2100, target: 2200, protein: 155 },
  { day: 'Wed', dateStr: 'Sep 21', calories: 1870, target: 2200, protein: 138 },
  { day: 'Thu', dateStr: 'Sep 22', calories: 2020, target: 2200, protein: 148 },
  { day: 'Fri', dateStr: 'Sep 23', calories: 1842, target: 2200, protein: 137 },
  { day: 'Sat', dateStr: 'Sep 24', calories: 2050, target: 2200, protein: 150 },
  { day: 'Sun', dateStr: 'Sep 25', calories: 1900, target: 2200, protein: 140 },
];

export const mockTodayWorkout: WorkoutData = {
  date: 'September 25, 2026',
  title: 'Chest & Cardio Blast',
  strength: [
    {
      id: 'ex-1',
      name: 'Bench Press',
      weightKg: 60,
      reps: 8,
      sets: 3,
    },
    {
      id: 'ex-2',
      name: 'Incline Dumbbell Press',
      weightKg: 22.5,
      reps: 10,
      sets: 3,
    },
    {
      id: 'ex-3',
      name: 'Cable Fly',
      weightKg: 15,
      reps: 12,
      sets: 3,
    },
  ],
  cardio: [
    {
      id: 'cardio-1',
      name: 'Treadmill',
      durationMin: 30,
      incline: 12,
      speedKmh: 3.0,
      caloriesBurned: 240,
    },
  ],
};

export const mockProgressStats: ProgressStats = {
  averageDailyCalories: 1961,
  averageProteinGrams: 144,
  totalWorkoutsThisMonth: 18,
  totalCardioTimeMin: 450,
  totalStepsThisMonth: 218400,
};
