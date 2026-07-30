import { ISignUpRequest, IAuthResponse, IUser } from '../../interface/auth.interface';
import User from '../../model/auth.model/User.model';
import { ValidationMessages } from '../../enums/validation.enum';

export const signUp = async (userData: ISignUpRequest): Promise<IAuthResponse> => {
  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingEmail) {
      return {
        success: false,
        message: ValidationMessages.EMAIL_EXISTS,
        error: 'A user with this email already exists',
      };
    }

    // Check if mobile number already exists
    const existingMobile = await User.findOne({ mobileNumber: userData.mobileNumber });
    if (existingMobile) {
      return {
        success: false,
        message: ValidationMessages.MOBILE_NUMBER_EXISTS,
        error: 'A user with this mobile number already exists',
      };
    }

    // Create new user
    const newUser = new User({
      fullName: userData.fullName.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
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
