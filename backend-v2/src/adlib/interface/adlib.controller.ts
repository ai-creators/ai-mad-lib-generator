import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetFeaturedAdlibsPageableParam } from './dto/request/get-featured-adlibs-pageable-param.dto';
import { GetFeaturedAdlibsQuery } from '../application/queries/get-featured-adlibs/get-featured-adlibs.query';
import { CreateAdlibRequest } from './dto/request/create-adlib-request.dto';
import { PageResult } from 'src/common/pagination/page-result';
import { GetFeaturedAdlibsResult } from '../application/queries/get-featured-adlibs/get-featured-adlibs.result';
import { CreateAdlibCommand } from '../application/commands/create-adlib/create-adlib.command';
import { Id } from 'src/common/domain/id';
import { GetAdlibsPageableParam } from './dto/request/get-adlibs-pageable-param.dto';
import { GetAdlibsResult } from '../application/queries/get-adlibs/get-adlibs.result';
import { GetAdlibsQuery } from '../application/queries/get-adlibs/get-adlibs.query';

@Controller('v1/adlib')
export class AdlibController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getAdlibs(
    @Query() query: GetAdlibsPageableParam,
  ): Promise<PageResult<GetAdlibsResult>> {
    return this.queryBus.execute(
      new GetAdlibsQuery(
        query.page,
        query.size,
        query.timestamp,
        query.feedType,
      ),
    );
  }

  @Get('/featured')
  getFeaturedAdlibs(
    @Query() query: GetFeaturedAdlibsPageableParam,
  ): Promise<PageResult<GetFeaturedAdlibsResult>> {
    return this.queryBus.execute(
      new GetFeaturedAdlibsQuery(query.page, query.size, query.timestamp),
    );
  }

  @Post()
  async createAdlib(
    @Body() createAdlibRequest: CreateAdlibRequest,
  ): Promise<string> {
    const id = await this.commandBus.execute<CreateAdlibCommand, Id>(
      new CreateAdlibCommand(
        createAdlibRequest.prompt,
        createAdlibRequest.temperature,
      ),
    );

    return id.toString();
  }
}
