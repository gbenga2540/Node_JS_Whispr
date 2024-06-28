import Joi from 'joi';
import { PaginationValidation } from '../pagination/pagination.validation';

export const GetUsersValidation = PaginationValidation.append({
  search: Joi.string().optional().empty(''),
});
