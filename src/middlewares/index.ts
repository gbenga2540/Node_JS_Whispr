import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import CorsOptions from './cors/cors';

const setupBaseMiddleware = (app: Application): void => {
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true }));
  app.use(cors(CorsOptions));
  app.use(morgan('dev'));
  app.use(compression());
};

export default setupBaseMiddleware;
