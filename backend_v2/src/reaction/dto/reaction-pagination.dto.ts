import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { FeedTypes } from 'src/models/feed-type';

export class ReactionPaginationDto extends PaginationDto {
  feedType?: FeedTypes;
  accountId: string;
}
