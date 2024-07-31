import { Application, Request, Response } from 'express';
import setupBaseMiddleware from '../middlewares/index';
import { setupUserApiRoutes } from './user';
import { setupChatApiRoutes } from './chat';
import { setupMessageApiRoutes } from './message';

export const setupRoutes = (app: Application): void => {
  // ==============================================
  // app fn to configure middlewares
  // ==============================================
  setupBaseMiddleware(app);

  // ==============================================
  // setup routes
  // ==============================================
  setupUserApiRoutes(app);
  setupChatApiRoutes(app);
  setupMessageApiRoutes(app);

  // base route
  app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).send('Whsipr API Service!');
  });
};
