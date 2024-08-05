'use strict';
import { Router } from 'express';
import { MessageController } from '../../controllers/message/message.controller';
import { RequestValidator } from '../../middlewares/validator/validator';
import {
  CreateMessageValidation,
  GetChatMessagesParamsValidation,
  GetChatMessagesQueryValidation,
} from '../../schemas/message/message.validation';
import { verifyTokenMiddleware } from '../../middlewares/token/token';

export class MessageRoutesV1 {
  private _router: Router;
  private messageController: MessageController;

  constructor() {
    this._router = Router();
    this.messageController = new MessageController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.post(
      '/create',
      RequestValidator(CreateMessageValidation, 'body'),
      verifyTokenMiddleware,
      this.messageController.createMessage,
    );
    this.router.get(
      '/get_messages/:chat_id',
      RequestValidator(GetChatMessagesParamsValidation, 'params'),
      RequestValidator(GetChatMessagesQueryValidation, 'query'),
      verifyTokenMiddleware,
      this.messageController.getChatMessages,
    );
  }
}
