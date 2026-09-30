import { Request, Response } from 'express';
import { ValidationMessages } from '../../enums/validation.enum';
import { handleErrorResponse, handleSuccessResponse } from '../../utils/errorHandler.util';
import {
  signUp as signUpService,
  login as loginService,
  logout as logoutService,
} from '../../services/auth.services/auth.service';
import { IAuthenticatedRequest } from '../../interface/auth.interface';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await signUpService(req.body);

    if (result.success) {
      handleSuccessResponse(res, result.message, result.data, 201);
    } else {
      handleErrorResponse(res, result.message, result.error, 400);
    }
  } catch (error) {
    handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginService(req.body);

    if (result.success) {
      handleSuccessResponse(res, result.message, result.data, 200);
    } else {
      handleErrorResponse(res, result.message, result.error, 401);
    }
  } catch (error) {
    handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error);
  }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await logoutService(req as IAuthenticatedRequest);

    if (result.success) {
      handleSuccessResponse(res, result.message, result.data, 200);
    } else {
      handleErrorResponse(res, result.message, result.error, result.statusCode ?? 401);
    }
  } catch (error) {
    handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error);
  }
};
