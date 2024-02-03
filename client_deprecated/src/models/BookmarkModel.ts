import { AccountModel } from "./AccountModel";
import { AdlibModel } from "./AdlibModel";

export interface BookmarkModel {
  accountId?: string;
  adlibId: string;
  adlib: AdlibModel;
  account?: AccountModel;
  hasBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
