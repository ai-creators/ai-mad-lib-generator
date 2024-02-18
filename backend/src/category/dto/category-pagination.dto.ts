import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';

export class CategoryPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
