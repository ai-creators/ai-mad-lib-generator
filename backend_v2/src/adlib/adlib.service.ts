import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from './dto/pagination-response';
import { Adlib } from 'src/data-model';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';

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
    const categoriesAlias = 'categories';
    const createdByAlias = 'createdBy';
    return Pagination.paginate<Adlib>(
      this.adlibRepository
        .createQueryBuilder(alias)
        .leftJoinAndSelect(`${alias}.categories`, categoriesAlias)
        .leftJoinAndSelect(`${alias}.createdBy`, createdByAlias)
        .orderBy(`${alias}.createdAt`, 'DESC'),
      paginationDto,
      alias,
    );
  }

  async findAllByCategoriesPageable({
    page,
    size,
    timestamp,
    category,
  }: CategoryPaginationDto) {
    const query = await this.adlibRepository.find({
      where: {
        categories: {
          name: category,
        },
        createdAt: LessThan(timestamp),
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * size,
      take: size,
    });

    const count = await this.adlibRepository.count({
      where: {
        categories: {
          name: category,
        },
        createdAt: LessThan(timestamp),
      },
    });

    const totalPages = size ? Math.ceil(count / size) : 0;

    return {
      results: query,
      page,
      size,
      totalPages,
    };
  }

  findOneById(id: number): Promise<Adlib> {
    return this.adlibRepository.findOne({
      where: { id },
      relations: ['categories', 'createdBy', 'reactions'],
    });
  }
}
