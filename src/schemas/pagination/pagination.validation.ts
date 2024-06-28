import Joi from 'joi';
import { ESortOrder, IPagination } from '../../interfaces/pagination';

export const PaginationValidation = Joi.object<IPagination>({
  page: Joi.number().required().min(1),
  limit: Joi.number().required(),
  sort_ord: Joi.string()
    .optional()
    .valid(...Object.values(ESortOrder)),
  sort_column: Joi.string().optional().empty(''),
});
