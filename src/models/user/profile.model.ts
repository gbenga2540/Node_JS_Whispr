import { model, Schema } from 'mongoose';
import { IProfile } from '../../types/user';

const schema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    user_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = model<IProfile>('Profile', schema, 'profiles');
