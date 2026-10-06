import { Request, Response, NextFunction } from 'express';
import { ExportService } from '../services/exportService.js';

export const getExportData = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const data = ExportService.generateExportPackage();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
