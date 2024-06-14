import { Request, Response } from 'express';
import UserServices from '../../services/user/user.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class UserController {
  // =============================================
  // Request verification Code controller
  // =============================================
  public async requestVerCode(req: Request, res: Response): Promise<void> {
    try {
      const result = await new UserServices().requestVerCodeService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }

  // =============================================
  // verify verification Code controller
  // =============================================
  public async verifyVerCode(req: Request, res: Response): Promise<void> {
    try {
      const result = await new UserServices().verifyVerCodeService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }

  // =============================================
  // Register user controller
  // =============================================
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await new UserServices().registerUserService(
        req.files,
        req.body,
      );
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
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
      handleServerErrors(req, res, error);
    }
  }
}
