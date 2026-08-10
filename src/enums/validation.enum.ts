export enum ValidationMessages {
  // Full Name
  FULL_NAME_REQUIRED = 'Full name is required',
  FULL_NAME_MIN_LENGTH = 'Full name must be at least 2 characters long',

  // Email
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_INVALID = 'Please provide a valid email address',
  EMAIL_EXISTS = 'Email already exists',

  // Password
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters long',
  PASSWORD_MAX_LENGTH = 'Password must not exceed 50 characters',
  PASSWORD_INVALID_FORMAT = 'Password must contain at least one uppercase letter, one lowercase letter, and one special character',

  // Mobile Number
  MOBILE_NUMBER_REQUIRED = 'Mobile number is required',
  MOBILE_NUMBER_INVALID = 'Please provide a valid 10-digit mobile number',
  MOBILE_NUMBER_EXISTS = 'Mobile number already exists',

  // General
  VALIDATION_FAILED = 'Validation failed',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  USER_REGISTERED_SUCCESSFULLY = 'User registered successfully',
  FAILED_TO_REGISTER_USER = 'Failed to register user',
  INVALID_CREDENTIALS = 'Invalid email or password',
  LOGIN_SUCCESSFUL = 'Login successful',
  FAILED_TO_LOGIN = 'Failed to login user',
  AUTHORIZATION_HEADER_REQUIRED = 'Authorization header is required',
  AUTHORIZATION_INVALID_FORMAT = 'Authorization header must be in the format: Bearer <token>',
  UNAUTHORIZED_ACCESS = 'Unauthorized access',
  LOGOUT_SUCCESSFUL = 'Logout successful',
  FAILED_TO_LOGOUT = 'Failed to logout user',
}
