import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { EnvConfig } from './get-env';

cloudinary.config({
  cloud_name: EnvConfig.cloudinaryCloudName,
  api_key: EnvConfig.cloudinaryApiKey,
  api_secret: EnvConfig.cloudinaryApiSecret,
  secure: true,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, _file) => {
    return {
      folder: EnvConfig.cloudinaryFolderName,
    };
  },
});

export default class Cloudinary {
  public static async deleteFromCloudinary(fileName: string) {
    try {
      const result = await new Promise((resolve, reject) => {
        return cloudinary.api.delete_resources_by_prefix(
          fileName,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
      });

      return result;
    } catch (err) {
      return err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async cleanUpCloudinary(files: any) {
    const keys = Object.keys(files);
    if (keys.length > 0) {
      keys.map((key: string) => {
        const images = files[key] as any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (images.length > 0) {
          images.map(async image => {
            if (image?.path) await this.deleteFromCloudinary(image?.filename);
          });
        }
      });
    }
  }
}
