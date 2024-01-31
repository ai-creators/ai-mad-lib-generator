import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { FeedTypes } from 'src/data-model/models/feed-type';
import { SelectQueryBuilder } from 'typeorm';

export class Pagination {
  public static async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    { page, size, timestamp, feedType }: PaginationDto,
    entityName: string,
  ): Promise<PaginationResponse<T>> {
    if (timestamp) {
      queryBuilder.andWhere(`${entityName}.createdAt < :timestamp`, {
        timestamp,
      });
    }

    queryBuilder.orderBy(
      `${entityName}.createdAt`,
      feedType === FeedTypes.OLDEST ? 'ASC' : 'DESC',
    );

    const [results, count] = await queryBuilder.getManyAndCount();

    console.log(results, count);

    return {
      results,
      page,
      size,
      totalPages: Pagination.calculatePageTotal(size, count),
    };
  }

  public static calculatePageTotal(size: number, total: number): number {
    if (total === 0) {
      return 0;
    }

    return Math.ceil(total / size);
  }
}
