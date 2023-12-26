import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PaginationResponse } from 'src/adlib/dto/pagination-response';
import { Category } from 'src/data-model';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
@Controller('v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    return this.categoryService.findAllPageable(categoryPaginationDto);
  }
}
