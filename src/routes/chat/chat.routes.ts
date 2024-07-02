'use strict';
import { Router } from 'express';
import { ChatController } from '../../controllers/chat/chat.controller';
import { RequestValidator } from '../../middlewares/validator/validator';
import { CreateChatValidation } from '../../schemas/chat/chat.validation';
import { UserIDValidation } from '../../schemas/user/user.validation';
import { PaginationValidation } from '../../schemas/pagination/pagination.validation';

export class ChatRoutesV1 {
  private _router: Router;
  private chatController: ChatController;

  constructor() {
    this._router = Router();
    this.chatController = new ChatController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.post(
      '/create',
      RequestValidator(CreateChatValidation, 'body'),
      this.chatController.createChat,
    );
    this.router.get(
      '/get_chats/:user_id',
      RequestValidator(UserIDValidation, 'params'),
      RequestValidator(PaginationValidation, 'query'),
      this.chatController.getUserChats,
    );
  }
}
