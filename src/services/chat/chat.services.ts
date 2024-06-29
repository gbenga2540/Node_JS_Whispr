import { CreateChatRequest } from '../../dtos/chat/chat.dto';
import { IChat } from '../../interfaces/chat';
import { Chat } from '../../models/chat/chat.model';
import { ApiServiceResponse } from '../../utils/api-response';

export default class ChatServices {
  public async createChatService(
    body: CreateChatRequest,
  ): Promise<ApiServiceResponse<IChat>> {
    const { sender_id, receiver_id } = body;

    const chat_exist = await Chat.findOne({
      members: { $all: [sender_id, receiver_id] },
    });

    if (chat_exist) return { status: 200, data: chat_exist?.toObject() };

    const chat = await Chat.create({
      members: [sender_id, receiver_id],
    });

    return { status: 200, data: chat?.toObject() };
  }
}
