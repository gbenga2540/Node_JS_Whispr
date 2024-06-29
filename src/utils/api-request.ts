import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export type RequestParams<T> = ParamsDictionary | T;

export type RequestQuery<T> = T | ParsedQs;
