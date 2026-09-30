import { Response } from 'express';
import { IAuthResponse } from '../interface/auth.interface';
import { ValidationMessages } from '../enums/validation.enum';

export const handleErrorResponse = (
  res: Response,
  message: string,
  error?: unknown,
  statusCode: number = 500
): void => {
  const response: IAuthResponse = {
    success: false,
    message,
    error: error instanceof Error ? error.message : String(error),
  };
  res.status(statusCode).json(response);
};

export const handleSuccessResponse = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200
): void => {
  const response: IAuthResponse = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const catchAsync = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error);
    });
  };
};
