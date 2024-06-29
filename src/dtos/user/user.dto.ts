import { IPagination } from '../../interfaces/pagination';

// Generic Validation for user_id only
export interface UserIDRequest {
  user_id: string;
}

export interface GetUsersRequest extends IPagination {
  search: string;
}
