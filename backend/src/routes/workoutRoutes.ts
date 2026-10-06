import { Router } from 'express';
import { getExercises, estimateCalories, getWorkouts, logWorkout } from '../controllers/workoutController.js';

const router = Router();

router.get('/exercises', getExercises);
router.post('/estimate-calories', estimateCalories);
router.get('/', getWorkouts);
router.post('/log', logWorkout);

export default router;
