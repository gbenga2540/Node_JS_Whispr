import Joi from 'joi';
import { CreateChatRequest } from '../../dtos/chat/chat.dto';

export const CreateChatValidation = Joi.object<CreateChatRequest>({
  recipient_id: Joi.string().required(),
});
