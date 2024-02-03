import { AdlibModel } from "./AdlibModel";

export interface CategoryModel {
  id: number;
  name: string;
  adlibs?: AdlibModel[];
  adlibCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
