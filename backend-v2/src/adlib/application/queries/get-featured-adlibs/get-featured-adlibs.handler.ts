import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFeaturedAdlibsQuery } from './get-featured-adlibs.query';
import { GetFeaturedAdlibsResult } from './get-featured-adlibs.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AdlibQuery } from '../../adlib-query';

@QueryHandler(GetFeaturedAdlibsQuery)
export class GetFeaturedAdlibsHandler
  implements IQueryHandler<GetFeaturedAdlibsQuery, GetFeaturedAdlibsResult>
{
  @Inject(InjectionToken.ADLIB_QUERY) readonly adlibQuery: AdlibQuery;

  async execute(
    query: GetFeaturedAdlibsQuery,
  ): Promise<GetFeaturedAdlibsResult> {
    return this.adlibQuery.getFeaturedAdlibs(
      query.page,
      query.size,
      query.timestamp,
    );
  }
}
