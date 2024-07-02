import { MongoDocument } from './mongo-document';

export interface IAuth extends MongoDocument {
  email: string;
  password: string;
  banned?: boolean;
}

export interface IProfile extends MongoDocument {
  user: IAuth['_id'];
  user_name: string;
  full_name: string;
  phone_number: string;
  bio: string;
  profile_picture: string;
}

export interface IToken extends MongoDocument {
  email: string;
  base32: string;
}
