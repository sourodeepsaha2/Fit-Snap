export interface StrengthExerciseLog {
  id: string;
  name: string;
  weightKg: number;
  reps: number;
  sets: number;
}

export interface CardioExerciseLog {
  id: string;
  name: string;
  durationMin: number;
  incline?: number;
  speedKmh?: number;
  caloriesBurned: number;
}

export interface WorkoutLogRequest {
  title: string;
  date?: string;
  strength: StrengthExerciseLog[];
  cardio: CardioExerciseLog[];
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  category: 'strength' | 'cardio';
  muscleGroup?: string;
  metValue: number; // Metabolic Equivalent of Task for calorie calculations
  defaultDurationMin?: number;
}

export interface CalorieBurnEstimateRequest {
  exerciseId: string;
  durationMin: number;
  userWeightKg?: number;
}
