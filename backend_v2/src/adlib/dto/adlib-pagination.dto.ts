import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { IsFeedType } from 'src/common/validation/is-feed-type/is-feed-type-constraint';
import { ContentRating } from 'src/data-model/models/ContentRating';
import { FeedTypes } from 'src/models/feed-type';

export class AdlibPaginationDto extends PaginationDto {
  @IsOptional()
  @IsFeedType()
  feedType?: FeedTypes;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsContentRatingType()
  contentRating?: ContentRating;
}
