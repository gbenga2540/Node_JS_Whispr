import { Request, Response } from 'express';
import MessageServices from '../../services/message/message.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class MessageController {
  public async createMessage(req: Request, res: Response) {
    try {
      const result = await new MessageServices().createMessageService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }

  public async getChatMessages(req: Request, res: Response) {
    try {
      const result = await new MessageServices().getChatMessagesService(
        req.params,
        req.query,
      );
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }
}
