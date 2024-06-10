import { model, Schema } from 'mongoose';
import { IUser } from '../../types/user';

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', schema, 'users');
