import { model, Schema, Types } from 'mongoose';
import { IChat } from '../../interfaces/chat';

const schema = new Schema<IChat>(
  {
    members: {
      type: [Types.ObjectId],
      required: true,
      ref: 'Auth',
    },
  },
  { timestamps: true },
);

export const Chat = model<IChat>('Chat', schema, 'chats');
