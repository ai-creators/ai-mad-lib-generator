import { IAdLibResponseQuestion } from "./IAdLibResponseQuestion";

export interface IAdLibResponse {
  adlibId: string;
  questions: IAdLibResponseQuestion[];
}
