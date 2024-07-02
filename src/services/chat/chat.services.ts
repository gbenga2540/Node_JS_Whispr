import { PipelineStage, Types } from 'mongoose';
import {
  CreateChatRequest,
  GetUserChatsResponse,
} from '../../dtos/chat/chat.dto';
import { UserIDRequest } from '../../dtos/user/user.dto';
import { IPagination, PageRes } from '../../interfaces/pagination';
import { Chat } from '../../models/chat/chat.model';
import { RequestParams, RequestQuery } from '../../utils/api-request';
import { ApiServiceResponse } from '../../utils/api-response';
import { PagingWithAggregate } from '../../utils/pagination';

export default class ChatServices {
  private async getChatsInfo(
    chat_id: Types.ObjectId,
    sender_id: Types.ObjectId,
  ): Promise<GetUserChatsResponse[]> {
    return await Chat.aggregate([
      {
        $match: {
          _id: chat_id,
        },
      },
      {
        $addFields: {
          receiverId: {
            $cond: {
              if: {
                $eq: [{ $arrayElemAt: ['$members', 0] }, sender_id],
              },
              then: { $arrayElemAt: ['$members', 1] },
              else: { $arrayElemAt: ['$members', 0] },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'receiverId',
          foreignField: 'user',
          as: 'recipient',
        },
      },
      {
        $unwind: '$recipient',
      },
      {
        $project: {
          chat_id: '$_id',
          created_at: '$createdAt',
          recipient_info: {
            user_id: '$recipient._id',
            user_name: '$recipient.user_name',
            profile_picture: '$recipient.profile_picture',
          },
        },
      },
      {
        $project: {
          _id: 0,
          members: 0,
        },
      },
    ]);
  }

  public async createChatService(
    body: CreateChatRequest,
  ): Promise<ApiServiceResponse<GetUserChatsResponse>> {
    const { sender_id, receiver_id } = body;

    const chat_exist = await Chat.findOne({
      members: { $all: [sender_id, receiver_id] },
    });

    if (chat_exist) {
      const response = await this.getChatsInfo(
        chat_exist._id,
        new Types.ObjectId(sender_id),
      );

      return { status: 200, data: response[0] };
    }

    const chat = await Chat.create({
      members: [sender_id, receiver_id],
    });

    const response = await this.getChatsInfo(
      chat._id,
      new Types.ObjectId(sender_id),
    );

    return { status: 200, data: response[0] };
  }

  public async getUserChatsService(
    params: RequestParams<UserIDRequest>,
    query: RequestQuery<IPagination>,
  ): Promise<ApiServiceResponse<PageRes<GetUserChatsResponse>>> {
    const { user_id } = params;
    const { page, limit } = query;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          members: { $in: [new Types.ObjectId(user_id)] },
        },
      },
      {
        $addFields: {
          receiverId: {
            $cond: {
              if: {
                $eq: [
                  { $arrayElemAt: ['$members', 0] },
                  new Types.ObjectId(user_id),
                ],
              },
              then: { $arrayElemAt: ['$members', 1] },
              else: { $arrayElemAt: ['$members', 0] },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'receiverId',
          foreignField: 'user',
          as: 'recipient',
        },
      },
      {
        $unwind: '$recipient',
      },
      {
        $project: {
          chat_id: '$_id',
          created_at: '$createdAt',
          recipient_info: {
            user_id: '$recipient._id',
            user_name: '$recipient.user_name',
            profile_picture: '$recipient.profile_picture',
          },
        },
      },
      {
        $project: {
          _id: 0,
          members: 0,
        },
      },
    ];

    const { items: chats, page: pageMeta } = await PagingWithAggregate(
      Chat,
      {},
      pipeline,
      page as string,
      limit as string,
    );

    return {
      status: 200,
      data: {
        items: chats as unknown as GetUserChatsResponse[],
        page: pageMeta,
      },
    };
  }
}
