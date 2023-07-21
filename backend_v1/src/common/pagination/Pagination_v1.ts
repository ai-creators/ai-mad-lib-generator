import { Model, Query } from "mongoose";

export class Pagination<T> {
  constructor(model: Model<T>, page: number, pagination: number) {
    this.model = model;
    this.total = 0;
    this.pageAmount = 0;
    this.page = page;
    this.pagination = pagination;
    this.documents = [];
  }

  public async find(conditional: {}): Promise<Query> {
    this.total = await this.calcualteTotal(conditional);
    this.pageAmount = this.calcaultePageAmount();
    return this.model.find(conditional);
  }

  public sort(arg: Object | String | Array<Array<string | number>): 

  private async calcualteTotal(conditional: {}): Promise<number> {
    return this.model.countDocuments(conditional);
  }

  private calcaultePageAmount(): number {
    return Math.ceil(this.total / this.pagination);
  }

  private model: Model<T>;

  private total: number;
  private pageAmount: number;
  private page: number;
  private pagination: number;
  private documents: T[];
}
