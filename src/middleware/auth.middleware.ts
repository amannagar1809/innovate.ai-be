import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.util';
import Token from '../model/auth.model/Token.model';
import { ValidationMessages } from '../enums/validation.enum';
import { handleErrorResponse } from '../utils/errorHandler.util';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { IAuthenticatedRequest } from '../interface/auth.interface';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
      handleErrorResponse(res, ValidationMessages.AUTHORIZATION_HEADER_REQUIRED, 'Authorization header missing', 401);
      return;
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== AUTH_CONSTANTS.TOKEN_TYPE) {
      handleErrorResponse(res, ValidationMessages.AUTHORIZATION_INVALID_FORMAT, 'Authorization header must be in the format: Bearer <token>', 401);
      return;
    }

    const token = parts[1];
    let decoded;

    try {
      decoded = verifyToken(token);
    } catch (error) {
      handleErrorResponse(res, ValidationMessages.UNAUTHORIZED_ACCESS, error instanceof Error ? error.message : 'Invalid token', 401);
      return;
    }

    const userId = typeof decoded === 'string' ? decoded : (decoded as { userId?: string }).userId;
    if (!userId) {
      handleErrorResponse(res, ValidationMessages.UNAUTHORIZED_ACCESS, 'Token payload missing userId', 401);
      return;
    }

    const tokenDocument = await Token.findOne({
      token,
      userId,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDocument) {
      handleErrorResponse(res, ValidationMessages.UNAUTHORIZED_ACCESS, 'Token is invalid, revoked, or expired', 401);
      return;
    }

    const authReq = req as IAuthenticatedRequest;
    authReq.user = { userId };
    authReq.token = token;
    authReq.tokenDocument = tokenDocument;

    next();
  } catch (error) {
    handleErrorResponse(res, ValidationMessages.INTERNAL_SERVER_ERROR, error, 500);
  }
};
