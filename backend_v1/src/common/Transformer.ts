import { Request } from "express";
import { PaginationProps } from "../ts/types/PaginationProps";

export abstract class Transformer {
  public static transformPagination(req: Request): PaginationProps {
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const time = req.query.timestamp;
    return {
      timestamp: new Date(time as string),
      pagination,
      page,
    };
  }
}
