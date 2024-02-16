import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/data-model/entities';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllPageable(
    categoryPagination: CategoryPaginationDto
  ): Promise<PaginationResponse<Category> {
    const entityName = 'Category';
    const queryBuilder = this.categoryRepository
      .createQueryBuilder(entityName);
    
    if (categoryPagination.search) {
      this.buildSearchQuery(
        categoryPagination.search,
        queryBuilder,
        entityName
      );
    }

    return Pagination.paginate<Category>(
      queryBuilder,
      categoryPagination,
      entityName
    )
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
          })
        }),
      );
    }
  }
}
