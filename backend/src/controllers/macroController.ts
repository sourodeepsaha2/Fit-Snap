import { Request, Response, NextFunction } from 'express';
import { MACRO_PRESETS, calculateMacroGrams } from '../services/macro/macroService.js';

export const getPresets = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, data: MACRO_PRESETS });
  } catch (error) {
    next(error);
  }
};

export const computeMacros = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { calories, presetId } = req.body;
    if (!calories) {
      return res.status(400).json({ success: false, message: 'calories parameter is required' });
    }
    const result = calculateMacroGrams(Number(calories), presetId || 'balanced');
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
