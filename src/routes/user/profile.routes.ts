'use strict';
import { Router } from 'express';
import { ProfileController } from '../../controllers/user/profile.controller';
import { verifyTokenMiddleware } from '../../middlewares/token/token';
import { FileType, uploadFactory } from '../../utils/multer';

export class ProfileRoutesV1 {
  public _router: Router;
  private profile_controller: ProfileController;

  constructor() {
    this._router = Router();
    this.profile_controller = new ProfileController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.patch(
      '/user',
      verifyTokenMiddleware,
      uploadFactory({ profile_image: FileType.IMAGE }), // TODO: Temporary till the form-data multer thing is fixed
      this.profile_controller.updateUserProfile,
    );
    this.router.get(
      '/get/user',
      verifyTokenMiddleware,
      this.profile_controller.getUserProfile,
    );
  }
}
