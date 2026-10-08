import { Router } from 'express';
import { getStreak, checkIn } from '../controllers/streakController.js';

const router = Router();

router.get('/', getStreak);
router.post('/checkin', checkIn);

export default router;
