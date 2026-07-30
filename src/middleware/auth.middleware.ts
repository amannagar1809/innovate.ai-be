import { Request, Response, NextFunction } from 'express';
import { ISignUpRequest } from '../interface/auth.interface';
import { ValidationMessages } from '../enums/validation.enum';
import { handleErrorResponse } from '../utils/errorHandler.util';

export const validateSignUp = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { fullName, email, password, mobileNumber }: ISignUpRequest = req.body;

    const errors: string[] = [];

    // Full name validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      errors.push(ValidationMessages.FULL_NAME_REQUIRED);
    } else if (fullName.trim().length < 2) {
      errors.push(ValidationMessages.FULL_NAME_MIN_LENGTH);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      errors.push(ValidationMessages.EMAIL_REQUIRED);
    } else if (!emailRegex.test(email.trim())) {
      errors.push(ValidationMessages.EMAIL_INVALID);
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
      errors.push(ValidationMessages.PASSWORD_REQUIRED);
    } else if (password.length < 8) {
      errors.push(ValidationMessages.PASSWORD_MIN_LENGTH);
    } else if (password.length > 50) {
      errors.push(ValidationMessages.PASSWORD_MAX_LENGTH);
    } else if (!passwordRegex.test(password)) {
      errors.push(ValidationMessages.PASSWORD_INVALID_FORMAT);
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber || typeof mobileNumber !== 'string' || mobileNumber.trim().length === 0) {
      errors.push(ValidationMessages.MOBILE_NUMBER_REQUIRED);
    } else if (!mobileRegex.test(mobileNumber.trim())) {
      errors.push(ValidationMessages.MOBILE_NUMBER_INVALID);
    }

    if (errors.length > 0) {
      handleErrorResponse(res, ValidationMessages.VALIDATION_FAILED, errors.join(', '), 400);
      return;
    }

    next();
  } catch (error) {
    handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error);
  }
};
