import { Application } from 'express';
import { AuthRoutesV1 } from './auth.routes';
import { ProfileRoutesV1 } from './profile.routes';

export const setupUserApiRoutes = (app: Application): void => {
  app.use('/api/v1/auth', new AuthRoutesV1().router);
  app.use('/api/v1/profile', new ProfileRoutesV1().router);
};
