import { db } from '../config';
import mongoose, { set } from 'mongoose';
import logger from '../utils/logger';
import { EnvConfig } from '../utils/get-env';

const { uri, maxPoolSize, minPoolSize } = db;

const options = {
  autoIndex: true,
  minPoolSize,
  maxPoolSize,
  maxIdleTimeMS: 100000,
  serverSelectionTimeoutMS: 100000,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
};

set('strictQuery', true);

// =============================================
// Database connections and events
// =============================================
mongoose
  .connect(uri, options)
  .then(() => logger.info('Mongoose connection done'))
  .catch(e => {
    logger.info('Mongoose connection error', e);
  });

// db connection events
mongoose.connection.on('connected', () => {
  EnvConfig.nodeEnv === 'development'
    ? logger.debug('Mongoose connected open to ' + uri)
    : logger.info('Mongoose Connected!');
});

mongoose.connection.on('error', error => {
  logger.debug('Mongoose default connection error  ' + error);
});

mongoose.connection.on('disconnected', () => {
  logger.debug('Mongoose default connection disconnected');
});

const gracefulExit = async () => {
  await mongoose.connection.close();
  logger.info('Mongoose default connection disconnected by app termination');
  process.exit(0);
};

// =======================================================
// If the Node process ends, close the Mongoose connection
// =======================================================
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

export const dbConnection = mongoose.connection;
