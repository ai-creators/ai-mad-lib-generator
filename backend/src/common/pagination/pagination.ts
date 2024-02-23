import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { FeedTypes } from 'src/data-model/models/feed-type';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

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

    queryBuilder
      .orderBy(
        `${entityName}.createdAt`,
        feedType === FeedTypes.OLDEST ? 'ASC' : 'DESC',
      )
      .take(size)
      .skip((page - 1) * size);

    const [results, count] = await queryBuilder.getManyAndCount();

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

  public static async paginateRawAndCount<T>(
    queryBuilder: SelectQueryBuilder<T>,
    { page, size, timestamp, feedType }: PaginationDto,
    entityName: string,
  ): Promise<PaginationResponse<T>> {
    if (timestamp) {
      queryBuilder.andWhere(`${entityName}.createdAt < :timestamp`, {
        timestamp,
      });
      queryBuilder.orderBy(
        `${entityName}.createdAt`,
        feedType === FeedTypes.OLDEST ? 'ASC' : 'DESC',
      );
    }

    const result = await queryBuilder
      .take(size)
      .skip((page - 1) * size)
      .getRawAndEntities();

    const entities = result.entities;
    const raw = result.raw;

    const count = await queryBuilder.getCount();

    // Merge raw data (for count) with entities
    const mergedResults = entities.map((entity) => {
      const rawResult = raw.find(
        (r) =>
          r[`${(entity as any).constructor.name}_id`] === (entity as any).id,
      );
      return {
        ...entity,
        adlibCount: rawResult ? parseInt(rawResult.adlibCount) : null,
      };
    });

    return {
      results: mergedResults,
      page,
      size,
      totalPages: Pagination.calculatePageTotal(size, count),
    };
  }
}
