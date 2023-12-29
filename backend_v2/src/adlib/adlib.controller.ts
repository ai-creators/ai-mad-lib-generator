import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { Account, Adlib } from 'src/data-model';
import { PaginationResponse } from '../common/pagination/dtos/pagination-response.dto';
import { AdlibNotFoundException } from './exceptions/adlib-not-found.exception';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly adlibService: AdlibService,
    private readonly accountService: AccountService,
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
    if (foundAdlib?.createdBy) {
      this.removePrivateProperties(await foundAdlib.createdBy);
    }
    return foundAdlib;
  }

  private removePrivateProperties(account: Account): void {
    if (account?.sub) {
      account.sub = null;
    }
  }

  @Get('find/:accountId')
  async findAdlibsByAccountId(
    @Param('accountId') accountId: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const foundAccount = await this.accountService.findOneById(accountId);
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    return this.adlibService.findAllByAccountIdPageable(
      accountId,
      adlibPaginationDto,
    );
  }
}
