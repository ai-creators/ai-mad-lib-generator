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
}
