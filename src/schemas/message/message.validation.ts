import Joi from 'joi';
import {
  CreateMessageRequest,
  GetUserMessagesParamsRequest,
  GetUserMessagesQueryRequest,
} from '../../dtos/message/message.dto';
import { IMessageType } from '../../interfaces/message';

export const CreateMessageValidation = Joi.object<CreateMessageRequest>({
  chat_id: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(IMessageType)),
  data: Joi.string().required().min(2),
});

export const GetUserMessagesParamsValidation =
  Joi.object<GetUserMessagesParamsRequest>({
    chat_id: Joi.string().required(),
  });

export const GetUserMessagesQueryValidation =
  Joi.object<GetUserMessagesQueryRequest>({
    from: Joi.string().optional().empty(''),
  });
