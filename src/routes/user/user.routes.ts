'use strict';
import { Router } from 'express';
import { UserController } from '../../controllers/user/user.controller';
import {
  LoginValidation,
  RegisterValidation,
  RequestVerCodeValidation,
  VerifyVerCodeValidation,
} from '../../schemas/user/user.validation';
import { RequestValidator } from '../../middlewares/validator/validator';
import { FileType, uploadFactory } from '../../utils/multer';

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
      '/get_code',
      RequestValidator(RequestVerCodeValidation, 'body'),
      this.userController.requestVerCode,
    );
    this.router.post(
      '/verify_code',
      RequestValidator(VerifyVerCodeValidation, 'body'),
      this.userController.verifyVerCode,
    );
    this.router.post(
      '/register',
      uploadFactory({ profile_picture: FileType.IMAGE }),
      RequestValidator(RegisterValidation, 'body'), // TODO: Temporary till the form-data multer thing is fixed
      this.userController.registerUser,
    );
    this.router.post(
      '/login',
      RequestValidator(LoginValidation, 'body'),
      this.userController.loginUser,
    );
  }
}
