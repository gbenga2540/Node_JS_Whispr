import Joi from 'joi';
import {
  LoginRequest,
  RegisterRequest,
  RequestVerCodeRequest,
  VerifyVerCodeRequest,
} from '../../dtos/user/user.dto';

export const RequestVerCodeValidation = Joi.object<RequestVerCodeRequest>({
  email: Joi.string().required().pattern(/^\S+$/),
  phone_number: Joi.string().required().pattern(/^\S+$/),
  user_name: Joi.string().required().min(2),
});

export const VerifyVerCodeValidation = Joi.object<VerifyVerCodeRequest>({
  email: Joi.string().required(),
  token: Joi.string().required(),
});

export const LoginValidation = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(/^\S+$/),
});

export const RegisterValidation = Joi.object<RegisterRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(/^\S+$/),
  user_name: Joi.string().required().min(2),
  full_name: Joi.string().required().min(2),
  bio: Joi.string().optional(),
  phone_number: Joi.string()
    .required()
    .regex(/^\+\d{1,3}\d{10,12}$/)
    .error(new Error('Invalid phone number!')),
});
