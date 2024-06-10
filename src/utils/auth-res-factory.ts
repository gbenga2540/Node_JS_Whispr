import { IProfile, IUser } from '../types/user';
import { AuthResponse } from '../dtos/user/user.dto';
import { MyJwtPayload, signJwt } from './jwt';
import { EnvConfig } from './get-env';

export const authResFactory = (
  payload: MyJwtPayload,
  user: IUser,
  profile: IProfile,
) => {
  const token = signJwt(payload, EnvConfig.jwtAuthExpiration);
  if (token) {
    return {
      status: 200,
      data: {
        token,
        user: AuthResponse.createResponse(user, profile),
      },
    };
  } else {
    return { status: 500, msg: 'Failed to sign token!' };
  }
};
