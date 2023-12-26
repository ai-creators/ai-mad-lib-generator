import { AdlibModel } from "./AdlibModel";

export interface CategoryModel {
  id: number;
  name: string;
  adlibs?: AdlibModel[];
  createdAt: Date;
  updatedAt: Date;
}
