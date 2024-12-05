import { Adlib } from 'src/adlib/domain/adlib';
import { PageResult } from 'src/common/pagination/page-result';
import { GetFeaturedAdlibsResult } from './queries/get-featured-adlibs/get-featured-adlibs.result';
import { GetAdlibsResult } from './queries/get-adlibs/get-adlibs.result';
import { FeedType } from 'src/common/domain/feed-type';

export interface AdlibQuery {
  getFeaturedAdlibs(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetFeaturedAdlibsResult>>;

  getAdlibs(
    page: number,
    size: number,
    timestamp: Date,
    feedType: FeedType,
  ): Promise<PageResult<GetAdlibsResult>>;
}
