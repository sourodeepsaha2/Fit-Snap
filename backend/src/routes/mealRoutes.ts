import { Router } from 'express';
import multer from 'multer';
import { analyzeMealController } from '../controllers/mealController.js';

const router = Router();

// Configure Multer for in-memory temporary storage (no permanent disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

router.post('/analyze', upload.single('image'), analyzeMealController);

export default router;
