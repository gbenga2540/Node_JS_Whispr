import logger from './logger';

const getEnv = <T>(name: string): T => {
  const value = process.env?.[name];
  if (value === undefined || value === null) {
    logger.warn(`Environment variable ${name} is required!`);
  }
  return value as unknown as T;
};

export const EnvConfig = {
  serverPort: getEnv<string>('PORT'),
  nodeEnv: getEnv<string>('NODE_ENV'),
  databaseUri: getEnv<string>('MONGODB_URI'),
  minPoolSize: getEnv<string>('MONGODB_MINPOOLSIZE'),
  maxPoolSize: getEnv<string>('MONGODB_MAXPOOLSIZE'),
  mailUser: getEnv<string>('MAIL_USER'),
  mailPassword: getEnv<string>('MAIL_PASSWORD'),
  jwtPrivateKey: getEnv<string>('JWT_PRIVATE_KEY'),
  jwtAuthExpiration: getEnv<string>('JWT_AUTH_EXPIRATION'),
  cloudinaryCloudName: getEnv<string>('CLOUDINARY_CLOUD_NAME'),
  cloudinaryApiKey: getEnv<string>('CLOUDINARY_API_KEY'),
  cloudinaryApiSecret: getEnv<string>('CLOUDINARY_API_SECRET'),
  multerFileSizeLimit: getEnv<string>('MULTER_FILE_SIZE_LIMIT'),
  clientOrigin: getEnv<string>('CLIENT_ORIGIN'),
};
