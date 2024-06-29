import { Request, Response } from 'express';
import ChatServices from '../../services/chat/chat.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class ChatController {
  public async createChat(req: Request, res: Response) {
    try {
      const result = await new ChatServices().createChatService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }
}
