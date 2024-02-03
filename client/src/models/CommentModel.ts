import { AdlibModel } from "./AdlibModel";
import { ReactionTypeModel } from "./ReactionTypeModel";

export interface CommentModel {
  id: number;
  content: string;
  adlib?: AdlibModel;
  childComments: CommentModel[];
  parentComments: CommentModel[];
  reactions: ReactionTypeModel;
}
