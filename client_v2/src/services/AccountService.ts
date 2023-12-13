import { AxiosRequestConfig } from "axios";
import { AccountModel } from "../models/AccountModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";

const getAccountBySub = (
  sub: string,
  accessToken: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find",
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

const isAccountSetup = (
  sub: string,
  accessToken: string
): Promise<ApiResponse<boolean>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/account-is-setup",
    params: {
      sub,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<boolean>({ config });
};

const setupAccount = (
  username: string,
  sub: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/create",
    data: {
      username,
      sub,
    },
    method: "POST",
  };

  return api.callExternalApi<AccountModel>({ config });
};

const AccountService = {
  getAccountBySub,
  isAccountSetup,
  setupAccount,
};

Object.freeze(AccountService);
export default AccountService;
