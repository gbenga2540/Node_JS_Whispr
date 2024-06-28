import { IPagination } from '../../interfaces/pagination';

export interface GetUsersRequest extends IPagination {
  search: string;
}
