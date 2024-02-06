import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { Account, Adlib } from 'src/data-model';
import { PaginationResponse } from '../common/pagination/dtos/pagination-response.dto';
import { AdlibNotFoundException } from './exceptions/adlib-not-found.exception';
import { CategoryPaginationDto } from '../category/dto/category-pagination.dto';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';
import { UsernameDto } from 'src/account/dto/username.dto';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly adlibService: AdlibService,
    private readonly accountService: AccountService,
  ) {}

  @Get()
  getAdlibs(
    @Query()
    adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllPageable(adlibPaginationDto);
  }

  @Get('category')
  getAdlibsByCategory(
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
  async findAdlibById(@Query('id') id: string) {
    const foundAdlib = await this.adlibService.findOneByIdWithJoins(id);
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    if (foundAdlib?.createdBy) {
      this.removePrivateProperties(await foundAdlib.createdBy);
    }

    return {
      id: foundAdlib.id,
      prompt: foundAdlib.prompt,
      title: foundAdlib.title,
      body: foundAdlib.body,
      isPg: foundAdlib.isPg,
      isHidden: foundAdlib.isHidden,
      createdAt: foundAdlib.createdAt,
      updatedAt: foundAdlib.updatedAt,
      categories: foundAdlib.categories,
      createdBy: foundAdlib.createdBy,
      reactions: await Promise.resolve(foundAdlib.reactions),
    };
  }

  private removePrivateProperties(account: Account): void {
    if (account?.sub) {
      account.sub = null;
    }
  }

  @Get('find/username/:username')
  async findUsersAdlibs(
    @Param() usernameDto: UsernameDto,
    @Query() adlibPaginationDto: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    const foundAccount = await this.accountService.findOneByUsername(
      usernameDto.username,
    );
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    const adlibs = await this.adlibService.findByUsernamePageable(
      usernameDto.username,
      adlibPaginationDto,
    );
    return adlibs;
  }

  @Get('find/:accountId')
  async findAdlibsByAccountId(
    @Param('accountId') accountId: string,
    @Query()
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
