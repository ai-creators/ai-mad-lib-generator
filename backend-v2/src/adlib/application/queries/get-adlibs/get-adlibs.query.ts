import { IQuery } from '@nestjs/cqrs';
import { FeedType } from 'src/common/domain/feed-type';

export class GetAdlibsQuery implements IQuery {
  constructor(
    readonly page: number,
    readonly size: number,
    readonly timestamp: Date,
    readonly feedType: FeedType,
  ) {}
}
