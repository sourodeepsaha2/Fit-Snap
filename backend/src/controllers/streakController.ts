import { Request, Response, NextFunction } from 'express';
import { getStreakData, logDailyCheckIn } from '../services/streak/streakService.js';

export const getStreak = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getStreakData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const checkIn = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await logDailyCheckIn();
    res.status(200).json({ success: true, message: 'Check-in recorded!', data });
  } catch (error) {
    next(error);
  }
};
