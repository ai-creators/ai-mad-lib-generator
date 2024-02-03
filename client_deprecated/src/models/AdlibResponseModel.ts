import { AccountModel } from "./AccountModel";
import { AdlibModel } from "./AdlibModel";
import { AdlibResponseQuestionModel } from "./AdlibResponseQuestionModel";

export interface AdlibResponseModel {
  id?: number;
  oldAdlibResponseId?: number;
  adlib: AdlibModel;
  questions: AdlibResponseQuestionModel[];
  createdBy?: AccountModel | null;
  createdAt: Date;
  updatedAt: Date;
}
