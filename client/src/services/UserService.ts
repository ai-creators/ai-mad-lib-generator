import { AxiosRequestConfig } from "axios";
import api from "./Api";
import { UserModel } from "@/models/UserModel";

const createUser = (guestName?: string) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/user",
    method: "POST",
    params: {
      guestName,
    },
  };

  return api.callExternalApi<UserModel>({ config });
};

const userService = {
  createUser,
};

Object.freeze(userService);
export { userService };
