import { Injectable } from '@nestjs/common';

import { PaginationResponse } from '../common/pagination/dtos/pagination-response.dto';
import { Adlib } from 'src/data-model';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { FeedTypes } from 'src/models/feed-type';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';

@Injectable()
export class AdlibService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  findAllPageable(
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const where = {
      createdAt: LessThan(adlibPaginationDto.timestamp),
    };

    if (adlibPaginationDto.feedType === FeedTypes.FEATURED) {
      where['isFeatured'] = true;
    }

    return Pagination.paginate<Adlib>(
      this.adlibRepository,
      adlibPaginationDto,
      {
        where,
        order: this.calculateOrder(adlibPaginationDto),
        relations: ['categories'],
      },
    );
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

  findAllByAccountIdPageable(
    accountId: string,
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate<Adlib>(
      this.adlibRepository,
      adlibPaginationDto,
      {
        where: {
          createdAt: LessThan(adlibPaginationDto.timestamp),
          createdBy: {
            id: accountId,
          },
        },
        order: this.calculateOrder(adlibPaginationDto),
        relations: ['categories'],
      },
    );
  }

  findOneById(id: string): Promise<Adlib> {
    return this.adlibRepository.findOne({
      where: { id },
      relations: ['categories', 'createdBy', 'reactions'],
    });
  }

  private calculateOrder(adlibPaginationDto: AdlibPaginationDto): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt =
      adlibPaginationDto.feedType === FeedTypes.LATEST
        ? 'DESC'
        : adlibPaginationDto.feedType === FeedTypes.OLDEST
        ? 'ASC'
        : 'DESC';
    return {
      createdAt,
    };
  }
}
