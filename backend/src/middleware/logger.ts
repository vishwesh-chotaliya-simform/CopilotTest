import { Request, Response, NextFunction } from "express";
import morgan from "morgan";

/**
 * Extend Express Request to include startTime
 */
declare global {
  namespace Express {
    interface Request {
      startTime?: number;
    }
  }
}

/**
 * Custom Morgan token for execution time
 */
morgan.token("execution-time", (req: Request, res: Response) => {
  const startTime = req.startTime;
  if (startTime) {
    const duration = Date.now() - startTime;
    return `${duration}ms`;
  }
  return "0ms";
});

/**
 * Custom Morgan format
 * Format: [METHOD] /endpoint - Execution time: Xms
 */
const morganFormat = "[:method] :url - Execution time: :execution-time";

/**
 * Middleware to track request start time
 */
export const requestTimer = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.startTime = Date.now();
  next();
};

/**
 * Morgan logging middleware with custom format
 */
export const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message: string) => {
      console.log(message.trim());
    },
  },
});
