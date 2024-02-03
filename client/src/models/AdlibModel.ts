import { AccountModel } from "./AccountModel";
import { CategoryModel } from "./CategoryModel";
import { CommentModel } from "./CommentModel";
import { ReactionModel } from "./ReactionModel";

export interface AdlibModel {
  id: number;
  prompt: string;
  title: string;
  text: string;
  isHidden: boolean;
  isPg: boolean;
  createdBy?: AccountModel;
  categories?: CategoryModel[];
  comments?: CommentModel[];
  reactions?: ReactionModel[];
  createdAt: Date;
  updatedAt: Date;
}
