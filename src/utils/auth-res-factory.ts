import { IProfile, IAuth } from '../interfaces/user';
import { AuthResponse } from '../dtos/user/auth.dto';
import { MyJwtPayload, signJwt } from './jwt';
import { EnvConfig } from './get-env';

export const authResFactory = (
  payload: MyJwtPayload,
  auth: IAuth,
  profile: IProfile,
) => {
  const token = signJwt(payload, EnvConfig.jwtAuthExpiration);
  if (token) {
    return {
      status: 200,
      data: {
        token,
        user: AuthResponse.createResponse(auth, profile),
      },
    };
  } else {
    return { status: 500, msg: 'Failed to sign token!' };
  }
};
