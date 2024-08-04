import Joi from 'joi';
import {
  CreateMessageRequest,
  GetChatMessagesParamsRequest,
  GetChatMessagesQueryRequest,
} from '../../dtos/message/message.dto';
import { IMessageType } from '../../interfaces/message';

export const CreateMessageValidation = Joi.object<CreateMessageRequest>({
  chat_id: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(IMessageType)),
  data: Joi.string().required().min(2),
});

export const GetChatMessagesParamsValidation =
  Joi.object<GetChatMessagesParamsRequest>({
    chat_id: Joi.string().required(),
  });

export const GetChatMessagesQueryValidation =
  Joi.object<GetChatMessagesQueryRequest>({
    from: Joi.string().optional().empty(''),
  });
