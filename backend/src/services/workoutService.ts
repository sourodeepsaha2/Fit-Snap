import { ExerciseDefinition, WorkoutLogRequest, CalorieBurnEstimateRequest } from '../types/workout.js';

const PRESET_EXERCISES: ExerciseDefinition[] = [
  { id: 'ex-1', name: 'Barbell Bench Press', category: 'strength', muscleGroup: 'Chest', metValue: 6.0 },
  { id: 'ex-2', name: 'Barbell Squat', category: 'strength', muscleGroup: 'Legs', metValue: 7.0 },
  { id: 'ex-3', name: 'Deadlift', category: 'strength', muscleGroup: 'Back', metValue: 8.0 },
  { id: 'ex-4', name: 'Overhead Shoulder Press', category: 'strength', muscleGroup: 'Shoulders', metValue: 5.5 },
  { id: 'ex-5', name: 'Dumbbell Bicep Curls', category: 'strength', muscleGroup: 'Arms', metValue: 4.5 },
  { id: 'ex-6', name: 'Incline Treadmill Run', category: 'cardio', metValue: 9.8, defaultDurationMin: 30 },
  { id: 'ex-7', name: 'Stationary Cycling', category: 'cardio', metValue: 7.5, defaultDurationMin: 45 },
  { id: 'ex-8', name: 'Rowing Machine', category: 'cardio', metValue: 8.5, defaultDurationMin: 20 },
  { id: 'ex-9', name: 'Jump Rope / HIIT', category: 'cardio', metValue: 11.0, defaultDurationMin: 15 },
  { id: 'ex-10', name: 'Elliptical Trainer', category: 'cardio', metValue: 6.8, defaultDurationMin: 30 }
];

const mockWorkoutLogs: Array<WorkoutLogRequest & { id: string; loggedAt: string; totalCaloriesBurned: number }> = [
  {
    id: 'w-101',
    title: 'Morning Push & Cardio Session',
    date: new Date().toISOString().split('T')[0],
    loggedAt: new Date().toISOString(),
    strength: [
      { id: 'ex-1', name: 'Barbell Bench Press', weightKg: 80, reps: 10, sets: 4 },
      { id: 'ex-4', name: 'Overhead Shoulder Press', weightKg: 50, reps: 12, sets: 3 }
    ],
    cardio: [
      { id: 'ex-6', name: 'Incline Treadmill Run', durationMin: 25, incline: 4, speedKmh: 9.5, caloriesBurned: 245 }
    ],
    totalCaloriesBurned: 420
  }
];

export class WorkoutService {
  public static getExerciseLibrary(query?: string, category?: string): ExerciseDefinition[] {
    let filtered = PRESET_EXERCISES;

    if (category && (category === 'strength' || category === 'cardio')) {
      filtered = filtered.filter(ex => ex.category === category);
    }

    if (query && query.trim().length > 0) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(
        ex => ex.name.toLowerCase().includes(q) || (ex.muscleGroup && ex.muscleGroup.toLowerCase().includes(q))
      );
    }

    return filtered;
  }

  public static estimateCaloriesBurned(params: CalorieBurnEstimateRequest): number {
    const exercise = PRESET_EXERCISES.find(ex => ex.id === params.exerciseId);
    const met = exercise ? exercise.metValue : 6.0;
    const userWeightKg = params.userWeightKg || 70; // default 70kg standard weight
    const durationHours = params.durationMin / 60;

    // Formula: MET * body weight (kg) * duration (hours)
    return Math.round(met * userWeightKg * durationHours);
  }

  public static getWorkoutLogs() {
    return mockWorkoutLogs;
  }

  public static logWorkout(data: WorkoutLogRequest) {
    const cardioCalories = data.cardio.reduce((acc, c) => acc + (c.caloriesBurned || 0), 0);
    // Estimated strength calories (~5 kcal per set per minute equivalent)
    const strengthCalories = data.strength.reduce((acc, s) => acc + (s.sets * 15), 0);
    const totalCaloriesBurned = cardioCalories + strengthCalories;

    const newLog = {
      id: `w-${Date.now()}`,
      title: data.title || 'Workout Session',
      date: data.date || new Date().toISOString().split('T')[0],
      loggedAt: new Date().toISOString(),
      strength: data.strength,
      cardio: data.cardio,
      totalCaloriesBurned
    };

    mockWorkoutLogs.unshift(newLog);
    return newLog;
  }
}
