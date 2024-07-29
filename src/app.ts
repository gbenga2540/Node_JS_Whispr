/**
 *
 * creator: @alob-mtc
 * modified by: @gbenga2540
 *
 */

'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import logger from './utils/logger';
import './database';
import { EnvConfig } from './utils/get-env';
import { setupRoutes } from './routes';
import { appSocket } from './socket';
import CorsOptions from './middlewares/cors/cors';

const app: Application = express();
const server = createServer(app);
const io = new Server(server, { cors: CorsOptions });
const port = parseInt(EnvConfig.serverPort, 10) || 5000;

// ==============================================
// Routes API's
// ==============================================
setupRoutes(app);

// Express server error
/* eslint-disable no-undef */
const serverError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  /* eslint-disable no-fallthrough */
  switch (error.code) {
    case 'EACCESS':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`${bind}, is already in use!`);
      process.exit(1);
    default:
      throw error;
  }
};

appSocket(io);

// ==============================================
// Server implt.
// ==============================================
server.listen(port);
server.on('error', serverError);
server.on('listening', () => {
  logger.info(`Server listening on port ${port}`);
});
