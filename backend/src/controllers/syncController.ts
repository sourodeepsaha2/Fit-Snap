import { Request, Response, NextFunction } from 'express';
import { getCloudSyncStatus, triggerCloudSync, updateSyncPreferences } from '../services/sync/syncService.js';

export const getSyncStatus = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCloudSyncStatus();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const syncNow = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await triggerCloudSync();
    res.status(200).json({ success: true, message: 'Sync completed successfully', data });
  } catch (error) {
    next(error);
  }
};

export const updateSyncConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { autoBackup, interval } = req.body;
    const data = await updateSyncPreferences(Boolean(autoBackup), Number(interval) || 15);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
