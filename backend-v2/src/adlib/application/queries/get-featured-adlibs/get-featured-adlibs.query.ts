import { IQuery } from '@nestjs/cqrs';

export class GetFeaturedAdlibsQuery implements IQuery {
  constructor(
    readonly page: number,
    readonly size: number,
    readonly timestamp: Date,
  ) {}
}
