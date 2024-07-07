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

export default class MessageServices {
  public async createMessageService(
    body: CreateMessageRequest,
  ): Promise<ApiServiceResponse<string>> {
    const { chat_id, data, sender_id, type } = body;

    await Message.create({
      chat_id: new Types.ObjectId(chat_id),
      sender_id: new Types.ObjectId(sender_id),
      type,
      data,
    });

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
      filter.createdAt = { $gte: messages_from };
    }

    const response = await Message.find(filter).sort({ createdAt: -1 });

    return { status: 200, data: response };
  }
}
