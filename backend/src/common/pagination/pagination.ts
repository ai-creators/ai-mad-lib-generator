import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { FilterQuery, Model } from 'mongoose';

interface WithCreatedAt {
  createdAt?: Date;
}

export class Pagination {
  public static async paginate<T extends WithCreatedAt>(
    model: Model<T>,
    { page, size, timestamp }: PaginationDto,
    query: FilterQuery<T> = {},
  ): Promise<PaginationResponse<T>> {
    if (timestamp) {
      query.createdAt = { $lt: timestamp };
    }

    const total = await model.countDocuments(query);
    const totalPages = Pagination.calculatePageTotal(size, total);
    const data = await model
      .find(query)
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    return {
      results: data,
      page,
      size,
      totalPages,
    };
  }

  public static calculatePageTotal(size: number, total: number): number {
    if (total === 0) {
      return 0;
    }

    console.log(size, total);
    return Math.ceil(total / size);
  }
}
