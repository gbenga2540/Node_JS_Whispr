import { MongoDocument } from './mongo-document';
import { IAuth } from './user';

export interface IChat extends MongoDocument {
  members: IAuth['_id'][];
}
