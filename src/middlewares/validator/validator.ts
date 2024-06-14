import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Cloudinary from '../../utils/cloudinary';

type ISource = 'body' | 'params' | 'query';

export const RequestValidator = <T>(
  validation: Joi.ObjectSchema<T>,
  source: ISource,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let reqData = {};

    if (source === 'body') {
      reqData = req.body;
    } else if (source === 'query') {
      reqData = req.query;
    } else {
      reqData = req.params;
    }

    const { error } = validation.validate(reqData, {
      abortEarly: false,
    });
    if (error !== undefined) {
      // TODO: Temp Fix to clear images from DB
      await Cloudinary.cleanUpCloudinary(req?.files);

      return res.status(400).json({ msg: error.message });
    }
    next();
  };
};
