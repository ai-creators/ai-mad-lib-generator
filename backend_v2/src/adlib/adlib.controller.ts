import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { Account, Adlib } from 'src/data-model';
import { PaginationResponse } from './dto/pagination-response';
import { AdlibNotFoundException } from './exceptions/adlib-not-found.exception';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { CategoryService } from 'src/category/category.service';
import { FeedTypes } from 'src/models/feed-type';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly adlibService: AdlibService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  getAdlibs(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllPageable(paginationDto);
  }

  @Get('category')
  async getAdlibsByCategory(
    @Query()
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    if (categoryPaginationDto.category) {
      return this.adlibService.findAllByCategoriesPageable(
        categoryPaginationDto,
      );
    }
  }

  @Get('find')
  async findAdlibById(@Query('id') id: number): Promise<Adlib> {
    const foundAdlib = await this.adlibService.findOneById(id);
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    if (foundAdlib.createdBy) {
      this.removePrivateProperties(foundAdlib.createdBy);
    }
    return foundAdlib;
  }

  private removePrivateProperties(account: Account): void {
    account.sub = null;
  }
}
