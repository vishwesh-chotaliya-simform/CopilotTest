import { Response } from "express";

/**
 * Send a standardized error response
 */
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
): void => {
  res.status(statusCode).json({ error: message });
};

/**
 * Send a standardized not found response
 */
export const sendNotFoundResponse = (
  res: Response,
  message: string = "Resource not found",
): void => {
  sendErrorResponse(res, 404, message);
};

/**
 * Send a standardized success response
 */
export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
): void => {
  res.status(statusCode).json(data);
};
