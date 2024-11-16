import { readConnection } from 'lib/database.module';
import { BaseEntity } from '../entities/base-entity';
import { PaginationConfig } from './pagination-config';
import {
  EntityTarget,
  LessThan,
  FindOptionsWhere,
  FindOptionsOrder,
} from 'typeorm';
import { PageResultImplementation } from './page-result';

export class Pagination {
  public static async paginate<T>(
    entity: EntityTarget<BaseEntity & { createdAt: Date }>,
    paginationConfig: PaginationConfig<T>,
  ) {
    const repository = readConnection.getRepository<
      BaseEntity & { createdAt: Date }
    >(entity);

    const {
      page,
      size,
      timestamp,
      resultsTransformer,
      relations,
      where,
      order,
    } = paginationConfig;

    const skip = (page - 1) * size;
    const take = size;

    // Build the where condition
    const whereCondition: FindOptionsWhere<BaseEntity & { createdAt: Date }> = {
      ...(where ?? {}),
      ...(timestamp ? { createdAt: LessThan(timestamp) } : {}),
    };

    // Build the order condition
    const orderCondition: FindOptionsOrder<BaseEntity & { createdAt: Date }> =
      order ?? { createdAt: 'DESC' };

    const [results, total] = await repository.findAndCount({
      where: whereCondition,
      skip,
      take,
      relations: relations ?? [],
      order: orderCondition,
    });

    const totalPages = Math.ceil(total / size);

    return new PageResultImplementation<T>(
      resultsTransformer(results),
      page,
      size,
      totalPages,
    );
  }
}
