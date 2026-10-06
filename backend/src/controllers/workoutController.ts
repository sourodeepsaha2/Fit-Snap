import { Request, Response, NextFunction } from 'express';
import { WorkoutService } from '../services/workoutService.js';

export const getExercises = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { query, category } = req.query;
    const exercises = WorkoutService.getExerciseLibrary(
      typeof query === 'string' ? query : undefined,
      typeof category === 'string' ? category : undefined
    );
    res.json({ success: true, data: exercises });
  } catch (error) {
    next(error);
  }
};

export const estimateCalories = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { exerciseId, durationMin, userWeightKg } = req.body;
    if (!exerciseId || typeof durationMin !== 'number') {
      res.status(400).json({ success: false, error: 'exerciseId and durationMin are required' });
      return;
    }

    const estimatedCalories = WorkoutService.estimateCaloriesBurned({
      exerciseId,
      durationMin,
      userWeightKg: typeof userWeightKg === 'number' ? userWeightKg : undefined
    });

    res.json({ success: true, data: { estimatedCalories } });
  } catch (error) {
    next(error);
  }
};

export const getWorkouts = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const workouts = WorkoutService.getWorkoutLogs();
    res.json({ success: true, data: workouts });
  } catch (error) {
    next(error);
  }
};

export const logWorkout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { title, strength, cardio, date } = req.body;
    if (!Array.isArray(strength) || !Array.isArray(cardio)) {
      res.status(400).json({ success: false, error: 'strength and cardio must be arrays' });
      return;
    }

    const workout = WorkoutService.logWorkout({ title, strength, cardio, date });
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};
