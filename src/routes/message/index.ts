import { Application } from 'express';
import { MessageRoutesV1 } from './message.routes';

export const setupMessageApiRoutes = (app: Application): void => {
  app.use('/api/v1/message', new MessageRoutesV1().router);
};
