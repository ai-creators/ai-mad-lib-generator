import AdLib from "../../db/models/AdLibModel";
import { Pagination } from "../../common/pagination/Pagination";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { PaginationResponse } from "../../ts/types/PaginationResponse";
import { Service } from "../../common/Service";
import { DatabaseConfig } from "../../db/DatabaseConfig";
export class AdLibService implements Service {
  public getLibs(
    timestamp: Date,
    page: number,
    pagination: number
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    return pager.pageable({}, page, pagination);
  }

  public getLibsByCreatedAt(
    timestamp: Date,
    page: number,
    pagination: number,
    sorter = -1
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    return pager.pageable({}, page, pagination, { createdAt: sorter });
  }

  public getLibsByFeatured(timestamp: Date, page: number, pagination: number) {
    const pager = new Pagination(AdLib);
    return pager.pageable({}, page, pagination, { createdAt: 1 });
  }
}