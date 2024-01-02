import { Account } from './entities/account.entity';
import { AdlibResponseQuestion } from './entities/adlib-response-question.entity';
import { AdlibResponse } from './entities/adlib-response.entity';
import { Adlib } from './entities/adlib.entity';
import { Bookmark } from './entities/bookmark.entity';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';
import { ReactionType } from './entities/reaction-type.entity';
import { Reaction } from './entities/reaction.entity';

const entities = [
  Account,
  Adlib,
  Category,
  AdlibResponse,
  AdlibResponseQuestion,
  Comment,
  Reaction,
  ReactionType,
  Bookmark,
];

export {
  Account,
  Adlib,
  Category,
  AdlibResponseQuestion,
  Comment,
  Reaction,
  ReactionType,
  Bookmark,
};
export default entities;
