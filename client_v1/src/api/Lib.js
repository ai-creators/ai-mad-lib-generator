import api from "./Api";
import storage from "../utils/Storage";

const get = async (timestamp, type, page = "1", pagination = "5") => {
  return await api.get(
    `adlib?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}&rating=${
      storage.get("content-rating") ?? "pg"
    }`
  );
};

const getById = async (id) => {
  return await api.get("adlib/find", {
    params: {
      id,
    },
  });
};

const getFeatured = async (timestamp, page, pagination = "5") => {
  return await api.get("adlib/featured", {
    params: {
      timestamp,
      pagination,
      page,
    },
  });
};

const search = async (timestamp, search, page = "1", pagination = "10") => {
  return await api.post(
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

const create = async (prompt) => {
  return await api.post("generator/adlib", {
    data: {
      prompt,
    },
  });
};

const createRandom = async () => {
  return await api.post("generator/random-adlib");
};

const createResponse = async (adlibId, questions) => {
  return await api.post("adlib/response", {
    data: {
      adlibId,
      questions,
    },
  });
};

const Lib = {
  get,
  getFeatured,
  getById,
  create,
  createRandom,
  search,
  createResponse,
};

Object.freeze(Lib);
export default Lib;
