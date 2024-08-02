import {
  CreateMessageRequest,
  GetUserMessagesParamsRequest,
  GetUserMessagesQueryRequest,
} from '../../dtos/message/message.dto';
import { Message } from '../../models/message/message.model';
import { ApiServiceResponse } from '../../utils/api-response';
import { FilterQuery, Types } from 'mongoose';
import { RequestParams, RequestQuery } from '../../utils/api-request';
import { IMessage } from '../../interfaces/message';
import { Chat } from '../../models/chat/chat.model';

export default class MessageServices {
  public async createMessageService(
    sender_id: string,
    body: CreateMessageRequest,
  ): Promise<ApiServiceResponse<string>> {
    const { chat_id, data, type } = body;

    await Message.create({
      chat_id: new Types.ObjectId(chat_id),
      sender_id: new Types.ObjectId(sender_id),
      type,
      data,
    });

    await Chat.updateOne(
      { _id: new Types.ObjectId(chat_id) },
      { $set: { updatedAt: new Date() } },
    );

    return {
      status: 200,
      data: 'Message Created!',
    };
  }

  public async getChatMessagesService(
    params: RequestParams<GetUserMessagesParamsRequest>,
    query: RequestQuery<GetUserMessagesQueryRequest>,
  ): Promise<ApiServiceResponse<IMessage[]>> {
    const { chat_id } = params;
    const { from } = query;

    const filter: FilterQuery<IMessage> = {
      chat_id: new Types.ObjectId(chat_id),
    };
    if (from) {
      const messages_from = new Date(from as string);
      filter.createdAt = { $gt: messages_from };
    }

    const response = await Message.find(filter);

    return { status: 200, data: response };
  }
}
