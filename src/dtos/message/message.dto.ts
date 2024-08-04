import { IMessage, IMessageType } from '../../interfaces/message';

export interface CreateMessageRequest {
  chat_id: string;
  sender_id: string;
  type: `${IMessageType}`;
  data: string;
}
export type CreateMessageResponse = string;

export interface GetChatMessagesParamsRequest {
  chat_id: string;
}
export interface GetChatMessagesQueryRequest {
  from: string;
}
export type GetChatMessagesResponse = IMessage[];
