/* eslint-disable no-unused-vars */
export enum ESortOrder {
  ascending = 'asc',
  descending = 'desc',
}
/* eslint-enable no-unused-vars */
export type ISortOrder = `${ESortOrder}`;

export interface PageQueryParam {
  page: string;
  limit: string;
  sort_ord?: ISortOrder;
  sort_column?: string;
}

export interface PageRes<T> {
  items: T[];
  page: {
    total_page: number;
    current_page: number;
    next_page: number;
  };
}
