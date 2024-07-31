import { createLogger, transports, format } from 'winston';
import { EnvConfig } from './get-env';

const environment = EnvConfig.nodeEnv;
const logLevel = environment === 'prod' ? 'info' : 'debug';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
  ],
});

/* eslint-disable no-undef */
process.on('UnhandledRejection', error => {
  logger.error('Unhandled Rejection:', error);
});

process.on('UncaughtException', error => {
  logger.error('Uncaught Exception:', error);
});

export default logger;
