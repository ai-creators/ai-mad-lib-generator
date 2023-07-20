import { Model, Query } from "mongoose";
import { PaginationResponse } from "../../ts/types/PaginationResponse";

export class Pagination<T> {
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async pageable(
    conditional: {},
    page: number,
    pagination: number,
    sort: {} | null = null
  ): Promise<PaginationResponse<T>> {
    let results;
    if (sort) {
      results = await this.model
        .find(conditional)
        .sort(sort)
        .skip((page - 1) * pagination)
        .limit(pagination);
    } else {
      results = await this.model
        .find(conditional)
        .skip((page - 1) * pagination)
        .limit(pagination);
    }

    const totalPages = this.getPageAmount(
      await this.getTotal(conditional),
      pagination
    );
    const response: PaginationResponse<T> = {
      results,
      pagination: pagination,
      page: page,
      totalPages,
    };
    return response;
  }

  private async getTotal(conditional: {}): Promise<number> {
    return this.model.countDocuments(conditional);
  }

  private getPageAmount = (total: number, pagination: number): number => {
    return Math.ceil(total / pagination);
  };

  private model: Model<T>;
}
