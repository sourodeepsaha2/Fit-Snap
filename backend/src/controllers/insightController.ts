import { Request, Response, NextFunction } from 'express';
import { HealthInsightsService } from '../services/ai/healthInsightsService.js';

export const getHealthInsights = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const insights = HealthInsightsService.generateInsights();
    res.json({ success: true, data: insights });
  } catch (error) {
    next(error);
  }
};
