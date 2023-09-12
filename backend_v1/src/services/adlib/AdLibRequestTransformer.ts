import { Request } from "express";
import { AdLibProps } from "../../ts/types/AdLibProps";
import { AdLibSearchProps } from "../../ts/types/AdLibSearchProps";

export class AdLibRequestTransformer {
  public transform(req: Request): AdLibProps {
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const time = req.query.timestamp;
    const type = (req.query.type as string) ?? "";
    const contentRating = (req.query.rating as string) ?? "pg";
    const data: AdLibProps = {
      timestamp: new Date(time as string),
      pagination,
      page,
      type,
      isPG: contentRating === "pg",
    };
    return data;
  }

  public transformUserId(req: Request): string {
    const user_id = (req.query.user_id as string) ?? "";
    return user_id;
  }

  public transformSearch(req: Request): AdLibSearchProps {
    if (!req.body.hasOwnProperty("data")) {
      throw new Error("No data has been provided");
    }
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const search: string = req.body.data.search ?? "";
    const time = req.query.timestamp;
    const contentRating = (req.query.rating as string) ?? "pg";
    const data: AdLibSearchProps = {
      timestamp: new Date(time as string),
      pagination,
      page,
      search,
      isPG: contentRating === "pg",
    };
    return data;
  }
}
