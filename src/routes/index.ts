import { Application, Request, Response } from 'express';
import setupBaseMiddleware from '../middlewares/index';
import { setupUserApiRoutes } from './user';
import { setupChatApiRoutes } from './chat';

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

  // base route
  app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).send('Backend Template API Service!');
  });
};
