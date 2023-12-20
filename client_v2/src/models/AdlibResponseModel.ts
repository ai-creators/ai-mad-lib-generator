import { AdlibModel } from "./AdlibModel";
import { AdlibResponseQuestionModel } from "./AdlibResponseQuestionModel";

export interface AdlibResponseModel {
  id: number;
  adlib: AdlibModel;
  questions: AdlibResponseQuestionModel[];
}
