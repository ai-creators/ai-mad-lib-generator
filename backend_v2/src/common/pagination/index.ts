import { Model } from 'mongoose';
import { PaginationResponse } from './PaginationResponse';
import { PaginationDto } from './dtos/Pagination.dto';
export class Pagination {
  public static async paginate<T>(
    query: {},
    { page, size, timestamp }: PaginationDto,
    model: Model<T>,
  ): Promise<PaginationResponse<T>> {
    let results = await model
      .find({ ...query, createdAt: { $lt: timestamp } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);
    const totalDocuments = await Pagination.getTotal<T>(query, model);
    return {
      results,
      page,
      size,
      totalPages: Pagination.calculatePageTotal(size, totalDocuments),
    };
  }

  public static getTotal<T>(conditional: {}, model: Model<T>): Promise<number> {
    return model.countDocuments(conditional);
  }

  public static calculatePageTotal(size: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return Math.ceil(size / total);
  }
}
