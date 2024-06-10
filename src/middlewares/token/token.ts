import { Request, Response, NextFunction } from 'express';
import jwt, { GetPublicKeyOrSecret } from 'jsonwebtoken';
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

    // @ts-ignore
    const publicKey: Secret | GetPublicKeyOrSecret | string =
      EnvConfig.jwtPrivateKey;
    try {
      const decoded = (await jwt.verify(
        bearer_token,
        publicKey,
      )) as MyJwtPayload;
      // @ts-ignore
      req.user_id = decoded.user_id;
      next();
    } catch (error) {
      res.json({ status: 403, msg: 'Forbidden Access/ Invalid Token' });
    }
  } else {
    res.json({ status: 401, msg: 'Empty access token' });
  }
};
