import { Request, Response, NextFunction } from 'express';
import { getNotifications, markNotificationAsRead } from '../services/notifications/notificationService.js';

export const fetchNotifications = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getNotifications();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updated = await markNotificationAsRead(id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
