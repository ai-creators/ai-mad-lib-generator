import { IAdLibResponse } from "./IAdLibResponse";
import { IAdLib } from "./IAdLibs";

export interface IAdLibResponseWIthAdLib extends IAdLibResponse {
  adlib: IAdLib;
}
