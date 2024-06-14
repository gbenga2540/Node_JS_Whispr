/* eslint-disable no-undef */
export type UploadedFiles<> =
  | { [fieldname: string]: Express.Multer.File[] }
  | Express.Multer.File[]
  | undefined;

export type UploadedFilesService<T extends string> = {
  [key in T]: Express.Multer.File[];
};
