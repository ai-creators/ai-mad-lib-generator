import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto/pagination-dto';

@Injectable()
export class AdlibService {
  findAllPageable(paginationDto: PaginationDto) {}
}
