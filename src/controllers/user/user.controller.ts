import { Request, Response } from 'express';
import UserServices from '../../services/user/user.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class UserController {
  // =============================================
  // Register user controller
  // =============================================
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await new UserServices().registerUserService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(res, error);
    }
  }

  // =============================================
  // User login controller
  // =============================================
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await new UserServices().loginUserService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(res, error);
    }
  }
}
