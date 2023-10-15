import { IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/Pagination.dto';

export class GetAdlibDto extends IntersectionType(PaginationDto) {
  @IsOptional()
  @IsBoolean()
  isPG: boolean = true;
}
