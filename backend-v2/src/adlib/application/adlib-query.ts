import { Adlib } from 'src/adlib/domain/adlib';
import { PageResult } from 'src/common/pagination/page-result';
import { GetFeaturedAdlibsResult } from './queries/get-featured-adlibs/get-featured-adlibs.result';

export interface AdlibQuery {
  getFeaturedAdlibs(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetFeaturedAdlibsResult>>;
}
