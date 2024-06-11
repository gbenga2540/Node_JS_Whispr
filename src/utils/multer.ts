import multer, { Multer } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { EnvConfig } from './get-env';
import { handleApiResponse } from '../utils/api-response';
import { storage as cloudinaryStorage } from './cloudinary';

/* eslint-disable no-unused-vars */
export enum FileType {
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}
/* eslint-enable no-unused-vars */
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

const supported_image_format = ['image/png', 'image/jpg', 'image/jpeg'];
const supported_file_formats = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export class MulterMiddleware {
  upload: Multer;

  constructor(fileFilters: Record<string, string[]>) {
    this.upload = multer({
      storage: cloudinaryStorage,
      limits: { fileSize: parseInt(EnvConfig.multerFileSizeLimit, 10) },
      fileFilter: (
        _: Request,
        file: Express.Multer.File, // eslint-disable-line no-undef
        callback: multer.FileFilterCallback,
      ) => {
        const fieldName = file.fieldname;
        const allowedTypes = fileFilters[fieldName];

        if (allowedTypes && allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new Error(
              `File type not allowed for ${fieldName}. Please upload ${allowedTypes.join(
                ', ',
              )} file(s).`,
            ),
          );
        }
      },
    });
  }
}

const get_file_ext = (file_type: FileType): string[] => {
  if (file_type === FileType.IMAGE) {
    return supported_image_format;
  } else if (file_type === FileType.FILE) {
    return supported_file_formats;
  } else {
    return [];
  }
};

export const get_uploader = (
  assets: Record<string, FileType>,
): [MulterMiddleware, multer.Field[]] => {
  const fileFilters: { [key: string]: string[] } = {};
  const fieldNames: multer.Field[] = [];
  for (const key in assets) {
    if (assets.hasOwnProperty(key)) {
      const type = assets[key];
      fileFilters[key] = get_file_ext(type);
      fieldNames.push({ name: key });
    }
  }
  return [new MulterMiddleware(fileFilters), fieldNames];
};

export const uploadFactory = (
  fileFilters: Record<string, FileType>,
): Middleware => {
  const [uploader, fieldNames] = get_uploader(fileFilters);
  const uploaderMultiple = uploader.upload.fields(fieldNames);
  return (req: Request, res: Response, next: NextFunction) => {
    uploaderMultiple(req, res, err => {
      if (err) return handleApiResponse(res, { status: 400, msg: err.message });
      next();
    });
  };
};
