import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/data-model';
import { LessThan, Repository } from 'typeorm';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/adlib/dto/pagination-response';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllPageable(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    return Pagination.paginate<Category>(
      this.categoryRepository,
      categoryPaginationDto,
      {
        where: {
          createdAt: LessThan(categoryPaginationDto.timestamp),
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['adlibs'],
      },
    );
  }

  findByName(categoryName: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: categoryName,
      },
    });
  }
}
