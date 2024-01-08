import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '../common/pagination/dtos/pagination-response.dto';
import { Adlib } from 'src/data-model';
import { Pagination } from 'src/common/pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, LessThan, Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { FeedTypes } from 'src/models/feed-type';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';

@Injectable()
export class AdlibService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  async findAllPageable(
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const queryBuilder = this.adlibRepository
      .createQueryBuilder('Adlib')
      .leftJoinAndSelect('Adlib.categories', 'category');

    if (adlibPaginationDto.feedType === FeedTypes.FEATURED) {
      queryBuilder.andWhere('Adlib.isFeatured = true');
    }

    if (typeof adlibPaginationDto.isPg === 'boolean') {
      queryBuilder.andWhere('Adlib.isPg = :isPg', {
        isPg: adlibPaginationDto.isPg,
      });
    }

    this.calculateOrder(queryBuilder, adlibPaginationDto.feedType);

    if (adlibPaginationDto.search) {
      this.buildSearchQuery(adlibPaginationDto.search, queryBuilder);
    }

    return Pagination.paginateWithQueryBuilder<Adlib>(
      queryBuilder,
      adlibPaginationDto,
      'Adlib',
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
        order: this.calculateOrderFindOptions(adlibPaginationDto.feedType),
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

  findByUsernamePageable(
    username: string,
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(this.adlibRepository, adlibPaginationDto, {
      where: {
        createdBy: {
          username,
        },
      },
      order: this.calculateOrderFindOptions(adlibPaginationDto.feedType),
      relations: ['createdBy'],
    });
  }

  private calculateOrderFindOptions(feedType: FeedTypes): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt = feedType === FeedTypes.OLDEST ? 'ASC' : 'DESC';

    return {
      createdAt,
    };
  }

  private calculateOrder(
    queryBuilder: SelectQueryBuilder<Adlib>,
    feedType: FeedTypes,
  ) {
    queryBuilder.orderBy(
      'Adlib.createdAt',
      feedType === FeedTypes.OLDEST ? 'ASC' : 'DESC',
    );
  }

  buildSearchQuery(search: string, queryBuilder: SelectQueryBuilder<Adlib>) {
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('Adlib.prompt ILike :search', {
            search: `%${search}%`,
          })
            .orWhere('Adlib.title ILike :search', { search: `%${search}%` })
            .orWhere('Category.name ILike :search', { search: `%${search}%` });
        }),
      );
    }
  }
}
