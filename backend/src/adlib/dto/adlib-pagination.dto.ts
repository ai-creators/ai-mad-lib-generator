import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { IsContentRatingType } from 'src/common/validation/is-content-rating-type/is-content-rating-type-constraint';
import { ContentRating } from 'src/data-model/models/content-rating';

export class AdlibPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsContentRatingType()
  contentRating?: ContentRating;
}
