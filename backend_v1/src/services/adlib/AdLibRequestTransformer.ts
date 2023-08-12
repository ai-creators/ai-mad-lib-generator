import { Request } from "express";
import { AdLibProps } from "../../ts/types/AdLibProps";
import { AdLibSearchProps } from "../../ts/types/AdLibSearchProps";

export class AdLibRequestTransformer {
  public transform(req: Request): AdLibProps {
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const time = req.query.timestamp;
    const type = (req.query.type as string) ?? "";
    const data: AdLibProps = {
      timestamp: new Date(time as string),
      pagination,
      page,
      type,
    };
    return data;
  }

  public transformSearch(req: Request): AdLibSearchProps {
    if (!req.body.hasOwnProperty("data")) {
      throw new Error("No data has been provided");
    }
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const search: string = req.body.data.search ?? "";
    const data: AdLibSearchProps = {
      pagination,
      page,
      search,
    };
    return data;
  }
}
