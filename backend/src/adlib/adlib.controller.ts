import { Controller, Get, Query } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Adlib } from 'src/data-model/entities/adlib.schema';
import { FeedTypes } from 'src/data-model/models/feed-type';

@Controller('/v1/adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}

  @Get()
  getAdlibs(
    @Query()
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    if (adlibPagination.feedType === FeedTypes.FEATURED) {
      return this.adlibService.findFeaturedPageable(adlibPagination);
    }
    return this.adlibService.findAllPageable(adlibPagination);
  }
}
