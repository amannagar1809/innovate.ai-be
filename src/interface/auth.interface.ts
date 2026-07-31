export interface ISignUpRequest {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  mobileNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data?: IUser | any;
  error?: string;
}
