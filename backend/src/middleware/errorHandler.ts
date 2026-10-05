import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    if (err.message.includes('File too large') || (err as { code?: string }).code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: false,
        error: {
          code: 'IMAGE_TOO_LARGE',
          message: 'Image file is too large. Maximum size allowed is 10MB.',
        },
      });
      return;
    }
  }

  // Default internal server error (never leak internal provider keys/stack traces)
  console.error('[Internal Error]:', err.message);
  res.status(500).json({
    success: false,
    error: {
      code: 'ANALYSIS_FAILED',
      message: 'Unable to analyze this meal at this moment. Please try again.',
    },
  });
};
