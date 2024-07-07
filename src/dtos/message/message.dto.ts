import { IMessageType } from '../../interfaces/message';

export interface CreateMessageRequest {
  chat_id: string;
  sender_id: string;
  type: `${IMessageType}`;
  data: string;
}

export interface GetUserMessagesParamsRequest {
  chat_id: string;
}

export interface GetUserMessagesQueryRequest {
  from: string;
}
