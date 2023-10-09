import Api from "./Api";
import storage from "../utils/Storage";

const get = async (timestamp, type, page = "1", pagination = "5") => {
  return await Api.get(
    `adlib?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}&rating=${
      storage.get("content-rating") ?? "pg"
    }`
  );
};

const getUserCreated = async (
  accessToken,
  timestamp,
  page = "1",
  pagination = "5"
) => {
  return await Api.get("adlib/user", {
    params: {
      timestamp,
      page,
      pagination,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const search = async (timestamp, search, page = "1", pagination = "10") => {
  return await Api.post(
    `adlib/search?timestamp=${timestamp}&pagination=${pagination}&page=${page}&rating=${
      storage.get("content-rating") ?? "pg"
    }`,
    {
      data: {
        search,
      },
    }
  );
};

const create = async (prompt, subId) => {
  return await Api.post("generator/adlib", {
    data: {
      prompt,
      userId: subId,
    },
  });
};

const createRandom = async (userId) => {
  return await Api.post("generator/random-adlib", {
    data: {
      userId,
    },
  });
};

const Lib = {
  get,
  create,
  createRandom,
  search,
  getUserCreated,
};

Object.freeze(Lib);
export default Lib;
