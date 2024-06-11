import jwt, {
  GetPublicKeyOrSecret,
  Secret,
  SignOptions,
  JwtPayload,
} from 'jsonwebtoken';
import logger from './logger';
import { EnvConfig } from './get-env';

export interface MyJwtPayload extends JwtPayload {
  user_id: string;
}

export const signJwt = (
  payload: object,
  duration: string,
  options: SignOptions = {},
) => {
  try {
    const privateKey = EnvConfig.jwtPrivateKey;
    return jwt.sign(payload, String(privateKey), {
      ...options,
      expiresIn: duration,
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const verifyJwt = (token: string) => {
  try {
    const publicKey: Secret | GetPublicKeyOrSecret | string =
      EnvConfig.jwtPrivateKey;
    return jwt.verify(token, publicKey);
  } catch (error) {
    return { status: 401, error };
  }
};
