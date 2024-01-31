import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { SelectQueryBuilder } from 'typeorm';

export class Pagination {
  public static async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    { page, size, timestamp }: PaginationDto,
    entityName: string,
  ): Promise<PaginationResponse<T>> {
    if (timestamp) {
      queryBuilder.andWhere(`${entityName}.createdAt < :timestamp`, {
        timestamp,
      });
    }

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
}
