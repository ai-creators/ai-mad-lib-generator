import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import AdlibService from "@/services/AdlibService";
import { useState } from "react";

export const useAdlibFeatured = () => {
  const [adlibs] = useState<AdlibModel[]>([]);

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<AdlibModel> | null, ErrorModel | null]> => {
    return AdlibService.getAdlibs(page, size, timestamp, FeedTypes.FEATURED);
  };
  return { adlibs, getAdlibs };
};
