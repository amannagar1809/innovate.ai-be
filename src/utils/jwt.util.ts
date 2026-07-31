import jwt, { JwtPayload } from 'jsonwebtoken';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload as object, JWT_SECRET as jwt.Secret, {
    expiresIn: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET as jwt.Secret);
};
