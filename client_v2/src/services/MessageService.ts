import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";

export const getProtectedMessage = (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: "/api/messages/protected",
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi({ config });
};
