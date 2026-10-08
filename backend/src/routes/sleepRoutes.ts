import { Router } from 'express';
import { fetchSleepLogs, createSleepLog } from '../controllers/sleepController.js';

const router = Router();

router.get('/', fetchSleepLogs);
router.post('/', createSleepLog);

export default router;
