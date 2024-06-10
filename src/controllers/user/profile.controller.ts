import { Request, Response } from 'express';
import ProfileServices from '../../services/user/profile.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class ProfileController {
  public async updateUserProfile(req: Request, res: Response) {
    try {
      const result = await new ProfileServices().updateUserProfileService(
        req.files,
        req.user_id,
      );
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(res, error);
    }
  }

  public async getUserProfile(req: Request, res: Response) {
    try {
      const result = await new ProfileServices().getUserProfileService(
        req.user_id,
      );
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(res, error);
    }
  }
}
