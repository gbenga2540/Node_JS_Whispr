import { Request, Response } from 'express';
import logger from './logger';
import Cloudinary from './cloudinary';

/**
 * Pass the data type this service would return into ApiServiceResponse
 */
export interface ApiServiceResponse<T = void> {
  status: number;
  msg?: string;
  data?: T;
}
type ErrorHandler<T extends Error> = (
  req: Request,
  res: Response,
  err: T,
) => void;

export function handleApiResponse<T>(
  res: Response,
  data: ApiServiceResponse<T>,
) {
  res = res.status(data.status);
  if (data.status < 300) {
    res.status(data.status).json({ data: data.data });
  } else {
    res.status(data.status).json({ msg: data.msg });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerErrors: ErrorHandler<any> = async (req, res, err) => {
  logger.warn(err.message);
  await Cloudinary.cleanUpCloudinary(req?.files);
  res.status(500).json({
    msg: 'This is on us. Our team is working to resolve this issue, thanks for your understanding',
  });
};
