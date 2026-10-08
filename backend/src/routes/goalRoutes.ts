import { Router } from 'express';
import { fetchGoals, createGoal, updateProgress } from '../controllers/goalController.js';

const router = Router();

router.get('/', fetchGoals);
router.post('/', createGoal);
router.patch('/:id/progress', updateProgress);

export default router;
