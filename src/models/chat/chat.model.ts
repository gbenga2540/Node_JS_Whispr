import { model, Schema } from 'mongoose';
import { IChat } from '../../interfaces/chat';

const schema = new Schema<IChat>(
  {
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
      // ref: 'Auth',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export const Chat = model<IChat>('Chat', schema, 'chats');
