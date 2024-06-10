import Joi from 'joi';
import { LoginRequest, RegisterRequest } from '../../dtos/user/user.dto';

export const LoginValidation = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(/^\S+$/),
});

export const RegisterValidation = Joi.object<RegisterRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(/^\S+$/),
  user_name: Joi.string().required().min(2),
});
