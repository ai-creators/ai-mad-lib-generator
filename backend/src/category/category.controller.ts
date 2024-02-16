import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Category } from 'src/data-model/entities';
import { FeedTypes } from 'src/data-model/models/feed-type';

@Controller('v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
}
