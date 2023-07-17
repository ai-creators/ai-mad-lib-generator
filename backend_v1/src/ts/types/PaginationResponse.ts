import { Query } from "mongoose";

export type PaginationResponse<T> = {
  results: T[];
  pagination: number;
  page: number;
  totalPages: Query<number, T>;
};
