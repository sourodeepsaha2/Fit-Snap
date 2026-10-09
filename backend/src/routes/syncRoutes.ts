import { Router } from 'express';
import { getSyncStatus, syncNow, updateSyncConfig } from '../controllers/syncController.js';

const router = Router();

router.get('/status', getSyncStatus);
router.post('/now', syncNow);
router.patch('/config', updateSyncConfig);

export default router;
