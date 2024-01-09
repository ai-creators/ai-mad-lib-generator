import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adlib, Category } from 'src/data-model';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
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

  async findAllPageable(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('Category')
      .leftJoin('Category.adlibs', 'adlibs')
      .select('Category') // Explicitly select the Category fields
      .addSelect('COUNT(adlibs.id)', 'adlibCount') // Count the adlibs per Category
      .groupBy('Category.id') // Group by Category id
      .orderBy('Category.createdAt', 'DESC');

    if (categoryPaginationDto.category) {
      queryBuilder.andWhere('LOWER(Category.name) LIKE :name', {
        name: `%${categoryPaginationDto.category.toLowerCase()}%`,
      });
    }

    const result = await queryBuilder
      .take(categoryPaginationDto.size)
      .skip((categoryPaginationDto.page - 1) * categoryPaginationDto.size)
      .getRawAndEntities();

    const entities = result.entities;
    const raw = result.raw;

    const count = await queryBuilder.getCount();

    // Merge raw data (for count) with entities
    const mergedResults = entities.map((entity) => {
      const rawResult = raw.find(
        (r) => r[`${entity.constructor.name}_id`] === entity.id,
      );
      return {
        ...entity,
        adlibCount: rawResult ? parseInt(rawResult.adlibCount) : null,
      };
    });

    return {
      results: mergedResults,
      page: categoryPaginationDto.page,
      size: categoryPaginationDto.size,
      totalPages: Pagination.calculatePageTotal(
        categoryPaginationDto.size,
        count,
      ),
    };
  }

  findAllPageableWithAdlibCount(categoryPaginationDto: CategoryPaginationDto) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('Category')
      .leftJoinAndSelect('Category.adlibs', 'adlib')
      .loadRelationCountAndMap('Category.adlibCount', 'Category.adlibs')
      .where('Category.createdAt < :timestamp', {
        timestamp: categoryPaginationDto.timestamp,
      })
      .orderBy(this.calculateOrderFindOptions(categoryPaginationDto.feedType))
      .take(categoryPaginationDto.size)
      .skip((categoryPaginationDto.page - 1) * categoryPaginationDto.size);

    if (categoryPaginationDto.category) {
      queryBuilder.andWhere('LOWER(Category.name) LIKE :name', {
        name: `%${categoryPaginationDto.category.toLowerCase()}%`,
      });
    }

    return Pagination.paginateWithQueryBuilder(
      queryBuilder,
      categoryPaginationDto,
      'Category',
    );
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

  findByName(categoryName: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: categoryName,
      },
    });
  }

  getMostPopular(size: number): Promise<Category[]> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.adlibs', 'adlib')
      .groupBy('category.id')
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('COUNT(adlib.id)', 'adlibCount')
      .orderBy('COUNT(adlib.id)', 'DESC')
      .limit(size);

    return queryBuilder.getRawMany();
  }

  async findAllPageableWithAdlibs(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('Category')
      .leftJoin('Category.adlibs', 'adlib')
      .select('Category')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(adlib.id)', 'adlibCount')
          .from(Adlib, 'adlib')
          .where('adlib.CategoryId = Category.id');
      }, 'adlibCount')
      .where('Category.createdAt < :timestamp', {
        timestamp: categoryPaginationDto.timestamp,
      })
      .orderBy(this.calculateOrderFindOptions(categoryPaginationDto.feedType))
      .take(categoryPaginationDto.size)
      .skip((categoryPaginationDto.page - 1) * categoryPaginationDto.size);

    if (categoryPaginationDto.category) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(Category.name) LIKE :name', {
            name: `%${categoryPaginationDto.category.toLowerCase()}%`,
          });
        }),
      );
    }

    return Pagination.paginateWithQueryBuilder(
      queryBuilder,
      categoryPaginationDto,
      'Category',
    );
  }
}
