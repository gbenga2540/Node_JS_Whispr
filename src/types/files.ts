/* eslint-disable no-undef */
export type UploadedFiles =
  | { [fieldname: string]: Express.Multer.File[] }
  | Express.Multer.File[]
  | undefined;
