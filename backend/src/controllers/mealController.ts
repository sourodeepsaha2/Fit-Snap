import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler.js';
import { analyzeMealWithAI } from '../services/ai/mealVisionService.js';

export async function analyzeMealController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      throw new AppError(400, 'NO_IMAGE_PROVIDED', 'No image file uploaded. Please upload a meal photo.');
    }

    const { mimetype, buffer, size } = req.file;

    // Allowed mimetypes check
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(mimetype.toLowerCase())) {
      throw new AppError(
        400,
        'UNSUPPORTED_IMAGE',
        'Unsupported image format. Please upload JPEG, PNG, or WEBP image.'
      );
    }

    // Size limit check (10MB)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (size > MAX_SIZE_BYTES) {
      throw new AppError(
        413,
        'IMAGE_TOO_LARGE',
        'Image file too large. Maximum size allowed is 10MB.'
      );
    }

    const analysisResult = await analyzeMealWithAI(buffer, mimetype);

    res.status(200).json(analysisResult);
  } catch (error) {
    next(error);
  }
}
