import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  password: string;
}

export interface IProfile extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  user_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IToken extends Document {
  _id: Types.ObjectId;
  email: string;
  base32: string;
  createdAt?: Date;
  updatedAt?: Date;
}
