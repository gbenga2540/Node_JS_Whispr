import { model, Schema } from 'mongoose';
import { IAuth } from '../../interfaces/user';

const schema = new Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    banned: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true },
);

export const Auth = model<IAuth>('Auth', schema, 'auths');
