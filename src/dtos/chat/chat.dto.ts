import {
  IMessage,
  IMessageStatus,
  IMessageType,
} from '../../interfaces/message';

export interface CreateChatRequest {
  recipient_id: string;
}

export interface GetUserChatsResponse {
  chat_id: string;
  created_at: string;
  updated_at: string;
  recipient_info: {
    user_id: string;
    user_name: string;
    profile_picture: string;
    bio: string;
    full_name: string;
    phone_number: string;
  };
  last_message_info: {
    data: string;
    at: string;
    unread: number;
    status: `${IMessageStatus}`;
    type: `${IMessageType}`;
    sender_id: IMessage['sender_id'];
  };
}
