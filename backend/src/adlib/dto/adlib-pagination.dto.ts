import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { IsContentRatingType } from 'src/common/validation/is-content-rating-type/is-content-rating-type-constraint';
import { IsFeedType } from 'src/common/validation/is-feed-type/is-feed-type-constraint';
import { ContentRating } from 'src/data-model/models/content-rating';
import { FeedTypes } from 'src/data-model/models/feed-type';

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
