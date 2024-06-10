import { model, Schema } from 'mongoose';
import { IToken } from '../../types/user';

const schema = new Schema<IToken>(
  {
    email: {
      type: String,
      required: true,
    },
    base32: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);
schema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Token = model<IToken>('Token', schema, 'tokens');
