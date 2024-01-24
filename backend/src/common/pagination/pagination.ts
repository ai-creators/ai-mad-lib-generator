import { PaginationDto } from './dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Model } from 'mongoose';

export class Pagination {
  public static async paginate<T>(
    model: Model<T>,
    { page, size }: PaginationDto,
  ): Promise<PaginationResponse<T>> {
    const total = await model.countDocuments();
    const totalPages = Pagination.calculatePageTotal(total, size);
    const data = await model
      .find()
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
    return Math.ceil(total / size);
  }
}
