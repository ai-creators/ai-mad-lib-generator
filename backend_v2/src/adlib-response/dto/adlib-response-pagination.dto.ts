import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { FeedTypes } from 'src/models/feed-type';

export class AdlibResponsePaginationDto extends PaginationDto {
  adlibId: string;
  feedType: FeedTypes;
}
