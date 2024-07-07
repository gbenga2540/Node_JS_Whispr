import { model, Schema } from 'mongoose';
import {
  IMessage,
  IMessageStatus,
  IMessageType,
} from '../../interfaces/message';

const schema = new Schema<IMessage>(
  {
    chat_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Auth',
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(IMessageType),
      default: IMessageType.Text,
    },
    data: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: Object.values(IMessageStatus),
      default: IMessageStatus.U,
    },
  },
  {
    timestamps: true,
  },
);

export const Message = model<IMessage>('Message', schema, 'messages');
