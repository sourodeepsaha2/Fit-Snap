import { Request, Response, NextFunction } from 'express';
import { getGoals, addGoal, updateGoalProgress } from '../services/goals/goalService.js';

export const fetchGoals = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const goals = await getGoals();
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    next(error);
  }
};

export const createGoal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, title, targetValue, currentValue, unit, deadline } = req.body;
    if (!title || !targetValue) {
      return res.status(400).json({ success: false, message: 'Title and targetValue are required' });
    }
    const newGoal = await addGoal({
      category: category || 'workout',
      title,
      targetValue: Number(targetValue),
      currentValue: Number(currentValue) || 0,
      unit: unit || '',
      deadline: deadline || '2026-12-31',
    });
    res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { currentValue } = req.body;
    const updated = await updateGoalProgress(id, Number(currentValue));
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
