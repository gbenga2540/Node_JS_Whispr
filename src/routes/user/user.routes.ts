'use strict';
import { Router } from 'express';
import { UserController } from '../../controllers/user/user.controller';
import { RequestValidator } from '../../middlewares/validator/validator';
import { GetUsersValidation } from '../../schemas/user/user.validation';
import { verifyTokenMiddleware } from '../../middlewares/token/token';

export class UserRoutesV1 {
  private _router: Router;
  private userController: UserController;

  constructor() {
    this._router = Router();
    this.userController = new UserController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.get(
      '/get_users',
      RequestValidator(GetUsersValidation, 'query'),
      verifyTokenMiddleware,
      this.userController.getUsers,
    );
  }
}
