import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export type ParamsRequest<T> = ParamsDictionary | T;

export type QueryRequest<T> = T | ParsedQs;
