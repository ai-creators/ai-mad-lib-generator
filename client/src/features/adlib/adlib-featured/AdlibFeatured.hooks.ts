import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import AdlibService from "@/services/AdlibService";
import { useState } from "react";

export const useAdlibFeatured = () => {
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<T>, ErrorModel | null]> => {
    return AdlibService.getAdlibs(page, size, timestamp);
  };
  return { adlibs, getAdlibs };
};
