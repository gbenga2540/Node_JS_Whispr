import { Response } from 'express';
import logger from './logger';

/**
 * Pass the data type this service would return into ApiServiceResponse
 */
export interface ApiServiceResponse<T = void> {
  status: number;
  msg?: string;
  data?: T;
}
type ErrorHandler<T extends Error> = (res: Response, err: T) => void;

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

export const handleServerErrors: ErrorHandler<any> = (res, err) => {
  logger.warn(err.message);
  res.status(500).json({
    msg: 'This is on us. Our team is working to resolve this issue, thanks for your understanding',
  });
};
