import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from './dto/pagination-response';
import { Adlib } from 'src/data-model';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdlibService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  findAllPageable(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const alias = 'adlib';
    return Pagination.paginate<Adlib>(
      this.adlibRepository
        .createQueryBuilder(alias)
        .orderBy(`${alias}.createdAt`, 'DESC'),
      paginationDto,
      alias,
    );
  }
}
