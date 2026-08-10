import mongoose, { Schema, Document } from 'mongoose';

export interface ITokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  revoked?: boolean;
  loggedOutAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    loggedOutAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

TokenSchema.index({ token: 1 }, { unique: true });

const Token = mongoose.model<ITokenDocument>('Token', TokenSchema);

export const createTokenRecord = (
  userId: mongoose.Types.ObjectId,
  token: string,
  expiresAt: Date
): Promise<ITokenDocument> => {
  return Token.create({ userId, token, expiresAt });
};

export const deleteTokensForUser = (
  userId: mongoose.Types.ObjectId
): Promise<mongoose.DeleteResult> => {
  return Token.deleteMany({ userId });
};

export const findActiveToken = (
  token: string,
  userId: mongoose.Types.ObjectId
): Promise<ITokenDocument | null> => {
  return Token.findOne({
    token,
    userId,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });
};

export const revokeToken = (
  token: string
): Promise<ITokenDocument | null> => {
  return Token.findOneAndUpdate(
    { token, revoked: false },
    { revoked: true, loggedOutAt: new Date() },
    { new: true }
  );
};

export default Token;
