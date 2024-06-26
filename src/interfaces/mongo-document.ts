import { Types, Document } from 'mongoose';

export interface MongoDocument extends Document {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
