import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { FeedTypes } from 'src/models/feed-type';

export class CategoryPaginationDto extends PaginationDto {
  category: string;
  feedType?: FeedTypes;
}
