import { Model, Query } from "mongoose";
import { PaginationResponse } from "../../ts/types/PaginationResponse";

export class Pagination<T> {
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async pageable(
    conditional: {},
    page: number,
    pagination: number
  ): Promise<PaginationResponse<T>> {
    const results = await this.model
      .find(conditional)
      .skip((page - 1) * pagination)
      .limit(pagination);
    const response: PaginationResponse<T> = {
      results,
      pagination: pagination,
      page: page,
      totalPages: await this.getTotal(conditional),
    };
    return response;
  }

  private async getTotal(conditional: {}): Promise<number> {
    return this.model.countDocuments(conditional);
  }

  private model: Model<T>;
}
