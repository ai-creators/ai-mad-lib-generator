import { AccountModel } from "./AccountModel";
import { AdlibModel } from "./AdlibModel";
import { NotificationType } from "./NotificationType";

export interface Notification {
  id: string;
  adlib: AdlibModel;
  account: AccountModel;
  type: NotificationType;
}
