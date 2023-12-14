export interface PaginationResponse<T> {
  results: T[];
  page: number;
  size: number;
  isEnd?: boolean;
}
