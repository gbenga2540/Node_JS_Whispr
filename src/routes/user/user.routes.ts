'use strict';
import { Router } from 'express';
import { UserController } from '../../controllers/user/user.controller';
import {
  LoginValidation,
  RegisterValidation,
} from '../../schemas/user/user.validation';
import { RequestValidator } from '../../middlewares/validator/validator';

export class UserRoutesV1 {
  private router_: Router;
  private userController: UserController;

  constructor() {
    this.router_ = Router();
    this.userController = new UserController();
    this.routes();
  }

  public get router(): Router {
    return this.router_;
  }

  routes() {
    this.router.post(
      '/register',
      RequestValidator(RegisterValidation, 'body'),
      this.userController.registerUser,
    );
    this.router.post(
      '/login',
      RequestValidator(LoginValidation, 'body'),
      this.userController.loginUser,
    );
  }
}
