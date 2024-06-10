'use strict';
import { Router } from 'express';
import { ProfileController } from '../../controllers/user/profile.controller';
import { verifyTokenMiddleware } from '../../middlewares/token/token';
import { FileType, uploadFactory } from '../../utils/multer';

export class ProfileRoutesV1 {
  public router_: Router;
  private profile_controller: ProfileController;

  constructor() {
    this.router_ = Router();
    this.profile_controller = new ProfileController();
    this.routes();
  }

  public get router(): Router {
    return this.router_;
  }

  routes() {
    this.router.patch(
      '/user',
      verifyTokenMiddleware,
      uploadFactory({ profile_image: FileType.IMAGE }),
      this.profile_controller.updateUserProfile,
    );
    this.router.get(
      '/get/user',
      verifyTokenMiddleware,
      this.profile_controller.getUserProfile,
    );
  }
}
