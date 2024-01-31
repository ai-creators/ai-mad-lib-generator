import { Controller, Get, Query } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Adlib, Category } from 'src/data-model/entities';
import { AdlibNotFoundException } from './exceptions/adlib-not-found.exception';
import { FindAdlibDto } from './dto/find-adlib.dto';

@Controller('/v1/adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}

  @Get()
  getAdlibs(
    @Query()
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllPageable(adlibPagination);
  }

  @Get('find')
  findAdlibById(
    @Query()
    { adlibId }: FindAdlibDto,
  ): Promise<Adlib | null> {
    console.log(adlibId);
    const foundAdlib = this.adlibService.findOneById(adlibId, ['category']);
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    return foundAdlib;
  }
}
