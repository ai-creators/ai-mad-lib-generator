import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Adlib, Category } from 'src/data-model';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { AdlibService } from 'src/adlib/adlib.service';
@Controller('v1/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly adlibService: AdlibService,
  ) {}

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

  @Get('adlib')
  getAdlibsByCategory(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllByCategoriesPageable(categoryPaginationDto);
  }
}
