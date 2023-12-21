import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';

export class CategoryPaginationDto extends PaginationDto {
  category: string;
  id: number;
}
