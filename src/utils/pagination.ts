import { Model, Document, PipelineStage } from 'mongoose';
import { ESortOrder, ISortOrder, PageRes } from '../types/pagination';

const PagingBase = async <T extends Document>(
  collection: Model<T>,
  query: object,
  pipeline: PipelineStage[],
  startPage: number,
  limit: number,
  sort_ord?: ISortOrder,
  sort_column?: string,
): Promise<PageRes<T>> => {
  const firstIndex = (startPage - 1) * limit;

  const [itemCount, items] = await Promise.all([
    collection.aggregate([...pipeline, { $match: query }]).count('total_count'),
    collection.aggregate([
      {
        $sort: sort_column
          ? { [sort_column]: sort_ord === ESortOrder.ascending ? 1 : -1 }
          : { createdAt: sort_ord === ESortOrder.ascending ? 1 : -1 },
      },
      ...pipeline,
      { $match: query },
      { $skip: firstIndex },
      { $limit: limit },
    ]),
  ]);

  const total_page = Math.ceil(itemCount?.[0]?.total_count / limit) || 0;
  const current_page = startPage;
  const next_page = current_page < total_page ? current_page + 1 : 0;

  return {
    items,
    page: {
      total_page,
      current_page,
      next_page,
    },
  };
};

export const PagingNoAggregate = async <T extends Document>(
  collection: Model<T>,
  query: object,
  startPage: number,
  limit: number,
  sort_ord?: ISortOrder,
  sort_column?: string,
): Promise<PageRes<T>> => {
  return PagingBase(
    collection,
    query,
    [],
    startPage,
    limit,
    sort_ord,
    sort_column,
  );
};

export const PagingWithAggregate = async <T extends Document>(
  collection: Model<T>,
  query: object,
  pipeline: PipelineStage[],
  startPage: number,
  limit: number,
  sort_ord?: ISortOrder,
  sort_column?: string,
): Promise<PageRes<T>> => {
  return PagingBase(
    collection,
    query,
    pipeline,
    startPage,
    limit,
    sort_ord,
    sort_column,
  );
};
