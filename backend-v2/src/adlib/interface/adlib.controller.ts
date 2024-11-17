import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetFeaturedAdlibsPageableParam } from './dto/request/get-featured-adlibs-pageable-param.dto';
import { GetFeaturedAdlibsQuery } from '../application/queries/get-featured-adlibs/get-featured-adlibs.query';
import { CreateAdlibRequest } from './dto/request/create-adlib-request.dto';
import { PageResult } from 'src/common/pagination/page-result';
import { GetFeaturedAdlibsResult } from '../application/queries/get-featured-adlibs/get-featured-adlibs.result';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/featured')
  getFeaturedAdlibs(
    @Query() query: GetFeaturedAdlibsPageableParam,
  ): Promise<PageResult<GetFeaturedAdlibsResult>> {
    return this.queryBus.execute(
      new GetFeaturedAdlibsQuery(query.page, query.size, query.timestamp),
    );
  }

  @Post()
  createAdlib(@Body() createAdlibRequest: CreateAdlibRequest) {}
}
