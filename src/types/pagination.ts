export enum ESortOrder {
  ascending = 'asc',
  descending = 'desc',
}
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
