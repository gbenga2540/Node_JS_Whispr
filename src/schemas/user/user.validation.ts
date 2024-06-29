import Joi from 'joi';
import { PaginationValidation } from '../pagination/pagination.validation';
import { UserIDRequest } from '../../dtos/user/user.dto';

// Generic Validation for user_id only
export const UserIDValidation = Joi.object<UserIDRequest>({
  user_id: Joi.string().required(),
});

export const GetUsersValidation = PaginationValidation.append({
  search: Joi.string().optional().empty(''),
});
