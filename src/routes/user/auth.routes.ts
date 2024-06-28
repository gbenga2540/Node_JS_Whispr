'use strict';
import { Router } from 'express';
import { AuthController } from '../../controllers/user/auth.controller';
import {
  LoginValidation,
  RegisterValidation,
  RequestVerCodeValidation,
  VerifyVerCodeValidation,
} from '../../schemas/user/auth.validation';
import { RequestValidator } from '../../middlewares/validator/validator';
import { FileType, uploadFactory } from '../../utils/multer';

export class AuthRoutesV1 {
  private _router: Router;
  private authController: AuthController;

  constructor() {
    this._router = Router();
    this.authController = new AuthController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.post(
      '/get_code',
      RequestValidator(RequestVerCodeValidation, 'body'),
      this.authController.requestVerCode,
    );
    this.router.post(
      '/verify_code',
      RequestValidator(VerifyVerCodeValidation, 'body'),
      this.authController.verifyVerCode,
    );
    this.router.post(
      '/register',
      uploadFactory({ profile_picture: FileType.IMAGE }),
      RequestValidator(RegisterValidation, 'body'), // TODO: Temporary till the form-data multer thing is fixed
      this.authController.registerUser,
    );
    this.router.post(
      '/login',
      RequestValidator(LoginValidation, 'body'),
      this.authController.loginUser,
    );
  }
}
