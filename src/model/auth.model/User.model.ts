import mongoose, { Schema, Document } from 'mongoose';
import { ValidationMessages } from '../../enums/validation.enum';

export interface IUserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, ValidationMessages.FULL_NAME_REQUIRED],
      trim: true,
    },
    email: {
      type: String,
      required: [true, ValidationMessages.EMAIL_REQUIRED],
      // unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ValidationMessages.EMAIL_INVALID,
      ],
    },
    password: {
      type: String,
      required: [true, ValidationMessages.PASSWORD_REQUIRED],
      minlength: [8, ValidationMessages.PASSWORD_MIN_LENGTH],
      // maxlength: [50, ValidationMessages.PASSWORD_MAX_LENGTH],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
        ValidationMessages.PASSWORD_INVALID_FORMAT,
      ],
    },
    mobileNumber: {
      type: String,
      required: [true, ValidationMessages.MOBILE_NUMBER_REQUIRED],
      // unique: true,
      // match: [/^[0-9]{10}$/, ValidationMessages.MOBILE_NUMBER_INVALID],
    },
  },
  {
    timestamps: true,
  }
);
// Add indexes for frequently queried fields
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ mobileNumber: 1 }, { unique: true });
const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
