import { Application } from 'express';
import { ChatRoutesV1 } from './chat.routes';

export const setupChatApiRoutes = (app: Application): void => {
  app.use('/api/v1/chat', new ChatRoutesV1().router);
};
