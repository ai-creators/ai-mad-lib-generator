import { Request } from "express";
import { AdLibProps } from "../../ts/types/AdLibProps";

export class AdLibRequestTransformer {
  public transFormRequest(req: Request): AdLibProps {
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
}
