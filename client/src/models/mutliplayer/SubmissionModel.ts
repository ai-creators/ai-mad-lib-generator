import { AdlibResponseModel } from "../AdlibResponseModel";
import { UserModel } from "../UserModel";
import { RoundModel } from "./RoundModel";

export interface SubmissionModel {
  id: number;
  response: AdlibResponseModel;
  round?: RoundModel;
  creator: UserModel;
}
