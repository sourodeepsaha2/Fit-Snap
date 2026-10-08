import { Router } from 'express';
import { fetchNotifications, markAsRead } from '../controllers/notificationController.js';

const router = Router();

router.get('/', fetchNotifications);
router.patch('/:id/read', markAsRead);

export default router;
