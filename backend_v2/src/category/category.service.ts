import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model';
import { Brackets, FindManyOptions, LessThan, Like, Repository } from 'typeorm';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { FeedTypes } from 'src/models/feed-type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllPageable(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const queryOptions: FindManyOptions<Category> = {
      where: {
        createdAt: LessThan(categoryPaginationDto.timestamp),
      },
      order: this.calculateOrder(categoryPaginationDto),
    };

    if (categoryPaginationDto.category) {
      queryOptions.where['name'] = Like(
        `%${categoryPaginationDto.category.toLowerCase()}%`,
      );
    }

    return Pagination.paginate<Category>(
      this.categoryRepository,
      categoryPaginationDto,
      queryOptions,
    );
  }

  private calculateOrder(categoryPaginationDto: CategoryPaginationDto): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt =
      categoryPaginationDto.feedType === FeedTypes.LATEST
        ? 'DESC'
        : categoryPaginationDto.feedType === FeedTypes.OLDEST
        ? 'ASC'
        : 'DESC';
    return {
      createdAt,
    };
  }

  findByName(categoryName: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: categoryName,
      },
    });
  }

  async findAllPageableWithAdlibs(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.adlibs', 'adlib')
      .select('category')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(adlib.id)', 'adlibCount')
          .from(Adlib, 'adlib')
          .where('adlib.categoryId = category.id');
      }, 'adlibCount')
      .where('category.createdAt < :timestamp', {
        timestamp: categoryPaginationDto.timestamp,
      })
      .orderBy(this.calculateOrder(categoryPaginationDto))
      .take(categoryPaginationDto.size)
      .skip((categoryPaginationDto.page - 1) * categoryPaginationDto.size);

    if (categoryPaginationDto.category) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(category.name) LIKE :name', {
            name: `%${categoryPaginationDto.category.toLowerCase()}%`,
          });
        }),
      );
    }

    return Pagination.paginateWithQueryBuilder(
      queryBuilder,
      categoryPaginationDto,
    );
  }
}
