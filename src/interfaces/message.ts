import { MongoDocument } from './mongo-document';
import { IChat } from './chat';
import { IAuth } from './user';

export enum IMessageType {
  Image = 'Image',
  Text = 'Text',
  Audio = 'Audio',
  Doc = 'Doc',
}

// U is unread, D is delivered, R is read
export enum IMessageStatus {
  U = 'U',
  D = 'D',
  R = 'R',
}

export interface IMessage extends MongoDocument {
  chat_id: IChat['_id'];
  sender_id: IAuth['_id'];
  type: IMessageType;
  data: string;
  status: IMessageStatus;
}
