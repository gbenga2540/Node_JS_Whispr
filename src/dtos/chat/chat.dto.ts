import { IMessageStatus, IMessageType } from '../../interfaces/message';

export interface CreateChatRequest {
  sender_id: string; // basically the firstId, doesn't matter if it is sender or receiver
  receiver_id: string;
}

export interface GetUserChatsResponse {
  chat_id: string;
  created_at: string;
  recipient_info: {
    user_id: string;
    user_name: string;
    profile_picture: string;
    bio: string;
    full_name: string;
    phone_number: string;
  };
  last_message_info: {
    text: string;
    at: string;
    unread: number;
    status: `${IMessageStatus}`;
    type: `${IMessageType}`;
  };
}
