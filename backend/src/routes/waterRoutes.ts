import { Router } from 'express';
import { getWaterLogs, logWater, updateWaterTarget } from '../controllers/waterController.js';

const router = Router();

router.get('/', getWaterLogs);
router.post('/log', logWater);
router.patch('/target', updateWaterTarget);

export default router;
