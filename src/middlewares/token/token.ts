import { Request, Response, NextFunction } from 'express';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { MyJwtPayload } from '../../utils/jwt';
import { EnvConfig } from '../../utils/get-env';
import { User } from '../../models/user/user.model';

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

      const user = await User.findById(decoded.user_id);
      if (user?.banned) {
        return res.json({ status: 403, msg: 'Forbidden Access' });
      }

      next();
    } catch (error) {
      res.json({ status: 403, msg: 'Forbidden Access/Invalid Token' });
    }
  } else {
    res.json({ status: 401, msg: 'Empty access token' });
  }
};
