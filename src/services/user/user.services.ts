import { ApiServiceResponse } from '../../utils/api-response';
import { AuthResponse } from '../../dtos/user/auth.dto';
import { PagingWithAggregate } from '../../utils/pagination';
import { PipelineStage } from 'mongoose';
import { PageRes } from '../../interfaces/pagination';
import { GetUsersRequest } from '../../dtos/user/user.dto';
import { RequestQuery } from '../../utils/api-request';
import { IAuth, IProfile } from '../../interfaces/user';
import { Profile } from '../../models/user/profile.model';

export default class UserServices {
  public async getUsersService(
    query: RequestQuery<GetUsersRequest>,
  ): Promise<ApiServiceResponse<PageRes<AuthResponse>>> {
    const { page, limit } = query;

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'auths',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'userInfo.banned': { $ne: true },
        },
      },
    ];

    const queryOptions: PipelineStage.Match = {
      $match: {
        $or: [
          { user_name: { $regex: query.search || '', $options: 'i' } },
          { full_name: { $regex: query.search || '', $options: 'i' } },
          { phone_number: { $regex: query.search || '', $options: 'i' } },
        ],
      },
    };

    const { items: users, page: pageMeta } = await PagingWithAggregate(
      Profile,
      queryOptions.$match,
      pipeline,
      page as string,
      limit as string,
    );

    interface CustomUser extends IProfile {
      userInfo: IAuth;
    }

    return {
      status: 200,
      data: {
        items: (users as CustomUser[]).map(user =>
          AuthResponse.createResponse(user.userInfo, user),
        ),
        page: pageMeta,
      },
    };
  }
}
