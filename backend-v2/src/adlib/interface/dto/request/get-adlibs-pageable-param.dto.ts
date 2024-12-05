import { IsDate, IsNumber } from 'class-validator';
import { FeedType } from 'src/common/domain/feed-type';

export class GetAdlibsPageableParam {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsDate()
  timestamp: Date;

  feedType: FeedType;
}
