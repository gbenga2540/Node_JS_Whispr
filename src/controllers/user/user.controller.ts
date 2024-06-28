import { Request, Response } from 'express';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';
import UserServices from '../../services/user/user.services';

export class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const result = await new UserServices().getUsersService(req.query);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }
}
