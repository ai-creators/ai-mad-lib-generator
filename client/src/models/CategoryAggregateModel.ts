import { CategoryModel } from "./CategoryModel";

export interface CategoryAggregateModel extends CategoryModel {
  adlibCount?: number;
}
