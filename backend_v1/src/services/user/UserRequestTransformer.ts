import { Request } from "express";
import { Transformer } from "../../common/Transformer";

export class UserRequestTransformer extends Transformer {
  public static transformUserId(req: Request): string {
    const user_id = (req.query.user_id as string) ?? "";
    return user_id;
  }
}
