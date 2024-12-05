import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdlibsQuery } from './get-adlibs.query';
import { GetAdlibsResult } from './get-adlibs.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AdlibQuery } from '../../adlib-query';

@QueryHandler(GetAdlibsQuery)
export class GetAdlibsHandler
  implements IQueryHandler<GetAdlibsQuery, GetAdlibsResult>
{
  @Inject(InjectionToken.ADLIB_QUERY) readonly adlibQuery: AdlibQuery;

  async execute(query: GetAdlibsQuery): Promise<GetAdlibsResult> {
    return this.adlibQuery.getAdlibs(
      query.page,
      query.size,
      query.timestamp,
      query.feedType,
    );
  }
}
