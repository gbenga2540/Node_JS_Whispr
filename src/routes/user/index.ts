import { Application } from 'express';
import { UserRoutesV1 } from './user.routes';
import { ProfileRoutesV1 } from './profile.routes';

export const setupUserApiRoutes = (app: Application): void => {
  app.use('/api/v1/user', new UserRoutesV1().router);
  app.use('/api/v1/profile', new ProfileRoutesV1().router);
};
