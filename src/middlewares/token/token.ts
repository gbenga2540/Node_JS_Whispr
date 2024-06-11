import { Request, Response, NextFunction } from 'express';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { MyJwtPayload } from '../../utils/jwt';
import { EnvConfig } from '../../utils/get-env';

declare global {
  namespace Express {
    interface Request {
      user_id: string;
    }
  }
}

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer_header = req.headers['authorization'];
  if (typeof bearer_header !== 'undefined') {
    const bearer = bearer_header.split(' ');
    const bearer_token = bearer[1];

    const publicKey: Secret | GetPublicKeyOrSecret | string =
      EnvConfig.jwtPrivateKey;
    try {
      const decoded = (await jwt.verify(
        bearer_token,
        publicKey,
      )) as MyJwtPayload;

      req.user_id = decoded.user_id;
      next();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.json({ status: 403, msg: 'Forbidden Access/ Invalid Token' });
    }
  } else {
    res.json({ status: 401, msg: 'Empty access token' });
  }
};
