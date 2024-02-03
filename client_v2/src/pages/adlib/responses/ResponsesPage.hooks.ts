import { useParams } from "react-router-dom";
import AdlibService from "../../../services/AdlibService";
import { useState } from "react";
import { FeedTypes } from "../../../components/feed/FeedTypes";
import { ApiResponse } from "../../../models/ApiResponseModel";
import { PaginationResponse } from "../../../models/PaginationResponse";
import { AdlibResponseModel } from "../../../models/AdlibResponseModel";
import { AdlibModel } from "../../../models/AdlibModel";
import AdlibResponseService from "../../../services/AdlibResponseService";

export const useResponsePage = () => {
  const { adlibId } = useParams();

  const [adlib, setAdlib] = useState<AdlibModel | null>(null);
  const [feedType] = useState<FeedTypes>(FeedTypes.LATEST);

  const getAdlibRespnses = async (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<AdlibResponseModel>>> => {
    if (!adlibId) {
      throw new Error("No adlib id has been provided");
    }
    const { data, error } = await AdlibResponseService.findResponsesByAdlibId(
      adlibId,
      page,
      size,
      timestamp,
      abortController
    );
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      const { adlib: foundAdlib, results } = data;
      if (!adlib) {
        setAdlib(foundAdlib);
      }
      return {
        data: results,
        error: error,
      };
    }
    return {
      data: {
        results: [],
        page,
        size,
        totalPages: 0,
      },
      error: error,
    };
  };

  return { adlib, getAdlibRespnses, feedType };
};
