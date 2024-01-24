import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { IsFeedType } from 'src/common/validation/is-feed-type/is-feed-type-constraint';
import { FeedTypes } from 'src/data-model/models/feed-type';

export class AdlibPaginationDto extends PaginationDto {
  @IsFeedType()
  feedType?: FeedTypes;
}
