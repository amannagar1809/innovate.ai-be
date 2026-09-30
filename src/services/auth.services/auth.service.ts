import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {
  ILoginRequest,
  ISignUpRequest,
  IAuthResponse,
  IUser,
  IAuthenticatedRequest,
} from '../../interface/auth.interface';
import User from '../../model/auth.model/User.model';
import Token, {
  createTokenRecord,
  deleteTokensForUser,
  findActiveToken,
  revokeToken,
} from '../../model/auth.model/Token.model';
import { ValidationMessages } from '../../enums/validation.enum';
import { generateToken } from '../../utils/jwt.util';
import { AUTH_CONSTANTS } from '../../constants/auth.constants';

export const signUp = async (userData: ISignUpRequest): Promise<IAuthResponse> => {
  try {
    const existingEmail = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingEmail) {
      return {
        success: false,
        message: ValidationMessages.EMAIL_EXISTS,
        error: 'A user with this email already exists',
      };
    }

    const existingMobile = await User.findOne({ mobileNumber: userData.mobileNumber });
    if (existingMobile) {
      return {
        success: false,
        message: ValidationMessages.MOBILE_NUMBER_EXISTS,
        error: 'A user with this mobile number already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      fullName: userData.fullName.trim(),
      email: userData.email.toLowerCase().trim(),
      password: hashedPassword,
      mobileNumber: userData.mobileNumber.trim(),
    });

    const savedUser = await newUser.save();

    const userResponse: IUser = {
      _id: savedUser._id.toString(),
      fullName: savedUser.fullName,
      email: savedUser.email,
      mobileNumber: savedUser.mobileNumber,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    return {
      success: true,
      message: ValidationMessages.USER_REGISTERED_SUCCESSFULLY,
      data: userResponse,
    };
  } catch (error) {
    return {
      success: false,
      message: ValidationMessages.FAILED_TO_REGISTER_USER,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const login = async (loginData: ILoginRequest): Promise<IAuthResponse> => {
  try {
    const user = await User.findOne({ email: loginData.email.toLowerCase().trim() });

    if (!user) {
      return {
        success: false,
        message: ValidationMessages.INVALID_CREDENTIALS,
        error: 'Invalid email or password',
      };
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: ValidationMessages.INVALID_CREDENTIALS,
        error: 'Invalid email or password',
      };
    }

    const token = generateToken({ userId: user._id.toString() });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await deleteTokensForUser(user._id);
    await createTokenRecord(user._id, token, expiresAt);

    return {
      success: true,
      message: ValidationMessages.LOGIN_SUCCESSFUL,
      data: {
        user: {
          _id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
        tokenType: AUTH_CONSTANTS.TOKEN_TYPE,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: ValidationMessages.FAILED_TO_LOGIN,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const logout = async (
  authRequest: IAuthenticatedRequest
): Promise<IAuthResponse> => {
  try {
    const userId = authRequest.user?.userId;
    const token = authRequest.token;

    if (!userId || !token) {
      return {
        success: false,
        message: ValidationMessages.UNAUTHORIZED_ACCESS,
        error: 'Authorization required',
        statusCode: 401,
      };
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        success: false,
        message: ValidationMessages.UNAUTHORIZED_ACCESS,
        error: 'Invalid authenticated user',
        statusCode: 401,
      };
    }

    const tokenDoc = await findActiveToken(token, new mongoose.Types.ObjectId(userId));

    if (!tokenDoc) {
      return {
        success: false,
        message: ValidationMessages.UNAUTHORIZED_ACCESS,
        error: 'Invalid or expired token',
        statusCode: 401,
      };
    }

    if (tokenDoc.userId.toString() !== userId) {
      return {
        success: false,
        message: ValidationMessages.UNAUTHORIZED_ACCESS,
        error: 'Token does not belong to authenticated user',
        statusCode: 401,
      };
    }

    const revokedToken = await revokeToken(token);

    if (!revokedToken) {
      return {
        success: false,
        message: ValidationMessages.FAILED_TO_LOGOUT,
        error: 'Unable to revoke token',
      };
    }

    return {
      success: true,
      message: ValidationMessages.LOGOUT_SUCCESSFUL,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: ValidationMessages.FAILED_TO_LOGOUT,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
