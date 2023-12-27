import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from './dto/pagination-response';
import { Adlib } from 'src/data-model';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { FeedTypes } from 'src/models/feed-type';

@Injectable()
export class AdlibService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  findAllPageable(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate<Adlib>(this.adlibRepository, paginationDto, {
      where: {
        createdAt: LessThan(paginationDto.timestamp),
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['categories'],
    });
  }

  async findAllByCategoriesPageable({
    page,
    size,
    timestamp,
    category,
    feedType = FeedTypes.LATEST,
  }: CategoryPaginationDto) {
    const query = await this.adlibRepository.find({
      where: {
        categories: {
          name: category,
        },
        createdAt: LessThan(timestamp),
      },
      order: {
        createdAt: feedType === FeedTypes.LATEST ? 'ASC' : 'DESC',
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
