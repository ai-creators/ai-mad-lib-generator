import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Adlib, Category } from 'src/data-model/entities';
import { FeedTypes } from 'src/data-model/models/feed-type';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';
import { AdlibPaginationDto } from 'src/adlib/dto/adlib-pagination.dto';
import { AdlibService } from 'src/adlib/adlib.service';

@Controller('v1/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly adlibService: AdlibService,
  ) {}

  @Get()
  getCategories(
    @Query()
    categoryPagination: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    if (categoryPagination.feedType === FeedTypes.POPULAR) {
      return this.categoryService.findPopularPageable(categoryPagination);
    }
    return this.categoryService.findAllPageable(categoryPagination);
  }

  @Get('find')
  async findCategoryByName(
    @Query()
    { name },
  ): Promise<Category> {
    if (!name) {
      throw new CategoryNotFoundException();
    }
    const foundCategory = await this.categoryService.findCategoryByName(name);

    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }

    return foundCategory;
  }

  @Get('find/:categoryName/adlib')
  findAdlibsByCategoryByName(
    @Param()
    { categoryName },
    @Query()
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllByCategoryNamePageable(
      categoryName,
      adlibPagination,
    );
  }
}
