import { AccountModel } from "@/models/AccountModel";
import { ApiResponse } from "@/models/ApiResponseModel";
import { AxiosRequestConfig } from "axios";
import api from "./Api";

const getAccountBySub = (
  sub: string,
  accessToken: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find/sub",
    params: {
      sub,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<AccountModel>({ config });
};

const accountService = {
  getAccountBySub,
};

Object.freeze(accountService);
export { accountService };
