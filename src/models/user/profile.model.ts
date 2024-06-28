import { model, Schema } from 'mongoose';
import { IProfile } from '../../interfaces/user';

const schema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = model<IProfile>('Profile', schema, 'profiles');
