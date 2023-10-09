import AdLib from "../../db/models/AdLibModel";
import { Pagination } from "../../common/pagination/Pagination";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { PaginationResponse } from "../../ts/types/PaginationResponse";
import { AdLibResponseProps } from "../../ts/types/AdLibResponseProps";
import AdLibResponse from "../../db/models/AdLibResponseModel";
import { IAdLibResponse } from "../../ts/Interfaces/IAdLibResponse";
import { IAdLibResponseWIthAdLib } from "../../ts/Interfaces/IAdLibResponseWithAdLib";
import AdLibFeatured from "../../db/models/AdLibFeatured";

export class AdLibService {
  public getLibs(
    timestamp: Date,
    page: number,
    pagination: number,
    isPG: boolean = true
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    if (!isPG) {
      return pager.pageable({}, page, pagination);
    }
    return pager.pageable({ isPG: true }, page, pagination);
  }

  public getLib(id: string): Promise<IAdLib | null> {
    return AdLib.findOne({ _id: id });
  }

  public async getLibResponseById(
    id: string
  ): Promise<IAdLibResponseWIthAdLib | null> {
    const response = await AdLibResponse.findOne({ _id: id });
    const adlib = await AdLib.findOne({ _id: response?.adlibId });
    if (!adlib || !response) {
      return null;
    }
    return { ...response.toObject(), adlib: adlib.toObject() };
  }

  public getLibsByCreatedAt(
    timestamp: Date,
    page: number,
    pagination: number,
    sorter = -1,
    isPG: boolean = true
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    if (!isPG) {
      return pager.pageable({}, page, pagination, { createdAt: sorter });
    }
    return pager.pageable({ isPG }, page, pagination, { createdAt: sorter });
  }

  public getLibsByFeatured(
    timestamp: Date,
    page: number,
    pagination: number,
    isPG: boolean = true
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLibFeatured);
    return pager.pageable({}, page, pagination, { createdAt: 1 });
  }

  public getLibsByNewest(
    timestamp: Date,
    page: number,
    pagination: number,
    isPG: boolean = true
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    if (!isPG) {
      return pager.pageable({}, page, pagination, { createdAt: -1 });
    }
    return pager.pageable({ isPG }, page, pagination, { createdAt: -1 });
  }

  public getLibsBySearch(
    search: string,
    page: number,
    pagination: number,
    timestamp: Date,
    isPG: boolean = true
  ): Promise<PaginationResponse<IAdLib>> {
    const pager = new Pagination(AdLib);
    if (!isPG) {
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
    return pager.pageable(
      {
        $or: [
          { prompt: { $regex: search, $options: "i" } },
          { text: { $regex: search, $options: "i" } },
        ],
        isPG,
      },
      page,
      pagination
    );
  }

  public createLibResponse(
    libResponse: AdLibResponseProps
  ): Promise<IAdLibResponse> {
    return AdLibResponse.create(libResponse);
  }
}
