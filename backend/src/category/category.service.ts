import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/data-model/entities';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { FeedTypes } from 'src/data-model/models/feed-type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllPageable(
    categoryPagination: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const entityName = 'Category';
    const queryBuilder = this.categoryRepository
      .createQueryBuilder(entityName)
      .leftJoin(`${entityName}.adlibs`, 'adlibs')
      .select(`${entityName}`)
      .addSelect('COUNT(adlibs.id)', 'adlibCount')
      .groupBy(`${entityName}.id`);

    if (categoryPagination.search) {
      this.buildSearchQuery(
        categoryPagination.search,
        queryBuilder,
        entityName,
      );
    }

    return Pagination.paginateRawAndCount<Category>(
      queryBuilder,
      categoryPagination,
      entityName,
    );
  }

  async findPopularPageable(
    categoryPagination: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const entityName = 'category';

    // Step 1: Create a base query for counting and fetching data
    const baseQuery = this.categoryRepository
      .createQueryBuilder(entityName)
      .leftJoin(`${entityName}.adlibs`, 'adlib')
      .groupBy(`${entityName}.id`)
      .orderBy('COUNT(adlib.id)', 'DESC');

    const countQuery = baseQuery
      .clone()
      .select(`COUNT(DISTINCT ${entityName}.id)`, 'count');

    const totalResult = await countQuery.getRawOne();
    const totalCategories = parseInt(totalResult.count, 10);

    const dataQuery = baseQuery
      .clone()
      .select([
        `${entityName}.id AS id`,
        `${entityName}.name AS name`,
        `${entityName}.createdAt AS createdAt`,
        `${entityName}.updatedAt AS updatedAt`,
      ])
      .addSelect('COUNT(adlib.id)', 'adlibCount')
      .limit(categoryPagination.size)
      .offset((categoryPagination.page - 1) * categoryPagination.size);

    const categories = await dataQuery.getRawMany();

    return {
      results: categories,
      page: categoryPagination.page,
      size: categoryPagination.size,
      totalPages: (await this.findAllPageable(categoryPagination)).totalPages,
    };
  }

  findCategoryByName(name: string): Promise<Category> {
    if (!name) {
      return undefined;
    }

    return this.categoryRepository.findOne({
      where: {
        name,
      },
    });
  }

  saveCategory(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  private buildSearchQuery(
    search: string,
    queryBuilder: SelectQueryBuilder<Category>,
    entityName: string,
  ) {
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`${entityName}.name ILike :search`, {
            search: `%${search}%`,
          });
        }),
      );
    }
  }
}
