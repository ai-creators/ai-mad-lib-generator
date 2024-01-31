import { Injectable } from '@nestjs/common';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { FeedTypes } from 'src/data-model/models/feed-type';
import { ContentRating } from 'src/data-model/models/content-rating';

@Injectable()
export class AdlibService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  findAllPageable(
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const entityName = 'Adlib';
    const queryBuilder = this.adlibRepository
      .createQueryBuilder(entityName)
      .leftJoinAndSelect(`${entityName}.categories`, 'category');

    if (adlibPaginationDto.feedType === FeedTypes.FEATURED) {
      queryBuilder.andWhere(`${entityName}.isFeatured = true`);
    }

    if (adlibPaginationDto.contentRating === ContentRating.PG) {
      queryBuilder.andWhere(`${entityName}.isPg = :isPg`, {
        isPg: true,
      });
    }

    if (adlibPaginationDto.search) {
      this.buildSearchQuery(
        adlibPaginationDto.search,
        queryBuilder,
        entityName,
      );
    }

    return Pagination.paginate<Adlib>(
      queryBuilder,
      adlibPaginationDto,
      'Adlib',
    );
  }

  private buildSearchQuery(
    search: string,
    queryBuilder: SelectQueryBuilder<Adlib>,
    entityName: string,
  ) {
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`${entityName}.prompt ILike :search`, {
            search: `%${search}%`,
          })
            .orWhere(`${entityName}.title ILike :search`, {
              search: `%${search}%`,
            })
            .orWhere(`Category.name ILike :search`, { search: `%${search}%` });
        }),
      );
    }
  }
}
