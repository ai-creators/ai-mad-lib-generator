import { ReactionTypeModel } from "./ReactionTypeModel";

export interface ReactionModel {
  id: number;
  content: ReactionTypeModel;
  hasReacted: boolean;
}
