import { AdlibResponseModel } from "./AdlibResponseModel";

export interface AdlibResponseQuestionModel {
  id?: number;
  adlibResponse?: AdlibResponseModel;
  question: string;
  answer: string;
}
