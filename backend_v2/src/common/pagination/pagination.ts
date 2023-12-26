import { FindOneOptions, Repository } from 'typeorm';
import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/adlib/dto/pagination-response';

export class Pagination {
  public static async paginate<T>(
    repository: Repository<T>,
    { page, size }: PaginationDto,
    findOptions: FindOneOptions<T>,
  ): Promise<PaginationResponse<T>> {
    const query = await repository.find({
      ...findOptions,
      skip: (page - 1) * size,
      take: size,
    });

    const count = await repository.count(findOptions);

    return {
      results: query,
      page: page,
      size: size,
      totalPages: Pagination.calculatePageTotal(size, count),
    };
  }

  public static calculatePageTotal(size: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return Math.ceil(total / size);
  }
  // public static async paginate<T>(
  //   query: SelectQueryBuilder<T>,
  //   { page, size, timestamp }: PaginationDto,
  //   entityType: string,
  // ): Promise<PaginationResponse<T>> {
  //   const [results = [], count = 0] = await query
  //     .where(`${entityType}.createdAt < :timestamp`, {
  //       timestamp,
  //     })
  //     .take(size)
  //     .skip((page - 1) * size)
  //     .getManyAndCount();
  //   return {
  //     page,
  //     size,
  //     results,
  //     totalPages: Pagination.calculatePageTotal(size, count),
  //   };
  // }

  // public static calculatePageTotal(size: number, total: number): number {
  //   if (total === 0) {
  //     return 0;
  //   }
  //   return Math.ceil(total / size);
  // }
}
