import Joi from 'joi';
import { CreateChatRequest } from '../../dtos/chat/chat.dto';

export const CreateChatValidation = Joi.object<CreateChatRequest>({
  sender_id: Joi.string().required(),
  receiver_id: Joi.string().required(),
});
