import { AccountModel } from "./AccountModel";
import { CategoryModel } from "./CategoryModel";
import { CommentModel } from "./CommentModel";
import { ReactionModel } from "./ReactionModel";

export interface AdlibModel {
  id: string;
  prompt: string;
  title: string;
  body: string;
  isHidden: boolean;
  isPg: boolean;
  createdBy?: AccountModel;
  categories?: CategoryModel[];
  comments?: CommentModel[];
  reactions?: ReactionModel[];
  createdAt: Date;
  updatedAt: Date;
}
