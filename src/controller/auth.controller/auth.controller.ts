import { Request, Response } from 'express';
import { ValidationMessages } from '../../enums/validation.enum';
import { handleErrorResponse, handleSuccessResponse } from '../../utils/errorHandler.util';
import { signUp as signUpService } from '../../services/auth.services/auth.service';

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
