import AdLib from "../../db/models/AdLibModel";
import { Pagination } from "../../common/pagination/Pagination";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { PaginationResponse } from "../../ts/types/PaginationResponse";

export class AdLibService {
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

  public getLibsByFeatured(
    timestamp: Date,
    page: number,
    pagination: number
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    return pager.pageable({}, page, pagination, { createdAt: 1 });
  }

  public getLibsByNewest(
    timestamp: Date,
    page: number,
    pagination: number
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    return pager.pageable({}, page, pagination, { createdAt: -1 });
  }

  public getLibsBySearch(
    search: string,
    page: number,
    pagination: number
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    return pager.pageable(
      {
        $or: [
          { prompt: { $regex: search, $options: "i" } },
          { text: { $regex: search, $options: "i" } },
        ],
      },
      page,
      pagination
    );
  }
}
