import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { FeedTypes } from 'src/models/feed-type';

export class AdlibPaginationDto extends PaginationDto {
  feedType?: FeedTypes;
  search?: string;
}
