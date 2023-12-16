import { AccountModel } from "./AccountModel";
import { CategoryModel } from "./CategoryModel";

export interface AdlibModel {
  id: number;
  prompt: string;
  title: string;
  body: string;
  isHidden: boolean;
  isPg: boolean;
  createdBy?: AccountModel;
  categories: CategoryModel[];
  createdAt: Date;
  updatedAt: Date;
}
