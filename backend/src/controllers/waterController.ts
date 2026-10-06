import { Request, Response, NextFunction } from 'express';
import { WaterService } from '../services/waterService.js';

export const getWaterLogs = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const progress = WaterService.getWaterProgress();
    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

export const logWater = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { amountMl } = req.body;
    if (typeof amountMl !== 'number' || amountMl <= 0) {
      res.status(400).json({ success: false, error: 'Valid positive amountMl is required' });
      return;
    }
    const updated = WaterService.addWaterLog(amountMl);
    res.status(201).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const updateWaterTarget = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { targetMl } = req.body;
    if (typeof targetMl !== 'number' || targetMl <= 0) {
      res.status(400).json({ success: false, error: 'Valid positive targetMl is required' });
      return;
    }
    const updated = WaterService.updateTarget(targetMl);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
