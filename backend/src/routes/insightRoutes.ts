import { Router } from 'express';
import { getHealthInsights } from '../controllers/insightController.js';

const router = Router();

router.get('/', getHealthInsights);

export default router;
