import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetFeaturedAdlibsPageableParam } from './dto/request/get-featured-adlibs-pageable-param.dto';
import { GetFeaturedAdlibsQuery } from '../application/queries/get-featured-adlibs/get-featured-adlibs.query';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/featured')
  async getFeaturedAdlibs(@Query() query: GetFeaturedAdlibsPageableParam) {
    return this.queryBus.execute(
      new GetFeaturedAdlibsQuery(query.page, query.size, query.timestamp),
    );
  }
}
