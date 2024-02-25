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

const updateUser = (user: UserModel) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/user",
    method: "PUT",
    data: {
      userId: user.id,
      guestName: user.guestName,
    },
  };

  return api.callExternalApi<UserModel>({ config });
};

const upsertUser = (user: UserModel) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/user/upsert",
    method: "PUT",
    data: {
      userId: user.id,
      guestName: user.guestName,
    },
  };

  return api.callExternalApi<UserModel>({ config });
};

const findUserById = (id: number) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/user/find",
    params: {
      userId: id,
    },
  };

  return api.callExternalApi<UserModel>({ config });
};

const userService = {
  createUser,
  updateUser,
  findUserById,
  upsertUser,
};

Object.freeze(userService);
export { userService };
