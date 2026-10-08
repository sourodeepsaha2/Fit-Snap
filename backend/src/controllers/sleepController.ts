import { Request, Response, NextFunction } from 'express';
import { getSleepLogs, logSleepSession } from '../services/sleep/sleepService.js';

export const fetchSleepLogs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getSleepLogs();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createSleepLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, durationHours, deepSleepMinutes, remSleepMinutes, qualityRating } = req.body;
    if (!durationHours) {
      return res.status(400).json({ success: false, message: 'durationHours is required' });
    }
    const newLog = await logSleepSession({
      date: date || new Date().toISOString().split('T')[0],
      durationHours: Number(durationHours),
      deepSleepMinutes: Number(deepSleepMinutes) || 90,
      remSleepMinutes: Number(remSleepMinutes) || 80,
      qualityRating: Number(qualityRating) as 1 | 2 | 3 | 4 | 5 || 4,
    });
    res.status(201).json({ success: true, data: newLog });
  } catch (error) {
    next(error);
  }
};
