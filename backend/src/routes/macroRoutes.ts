import { Router } from 'express';
import { getPresets, computeMacros } from '../controllers/macroController.js';

const router = Router();

router.get('/presets', getPresets);
router.post('/calculate', computeMacros);

export default router;
