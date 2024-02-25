import { AdlibModel } from "../AdlibModel";
import { UserModel } from "../UserModel";
import { SubmissionModel } from "./SubmissionModel";

export interface RoundModel {
  id: number;
  adlib: AdlibModel;
  judge: UserModel;
  submissions: SubmissionModel[];
}
