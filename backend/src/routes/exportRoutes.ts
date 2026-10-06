import { Router } from 'express';
import { getExportData } from '../controllers/exportController.js';

const router = Router();

router.get('/', getExportData);

export default router;
