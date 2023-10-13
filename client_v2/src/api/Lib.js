import Api from "./Api";
import storage from "../utils/Storage";

const get = (timestamp, page = 1, size = 10) => {
  return Api.get("api/adlib", {
    params: {
      timestamp,
      size,
      page,
      isPG: (storage.get("content-rating") ?? "pg") === "pg",
    },
  });
};

const getNewest = (timestamp, page = 1, size = 10) => {
  return Api.get("api/adlib/newest", {
    params: {
      timestamp,
      size,
      page,
      isPG: (storage.get("content-rating") ?? "pg") === "pg",
    },
  });
};

const getById = (id) => {
  return Api.get("api/adlib/find", {
    params: {
      id,
    },
  });
};

const getFeatured = (timestamp, page = 1, size = 5) => {
  return Api.get("api/adlib/featured", {
    params: {
      timestamp,
      size,
      page,
    },
  });
};

const search = (timestamp, search, page = 1, size = 10) => {
  return Api.post(
    "api/adlib/search",
    { search },
    {
      params: {
        timestamp,
        size,
        page,
        isPG: (storage.get("content-rating") ?? "pg") === "pg",
      },
    }
  );
};

const create = (prompt) => {
  return Api.post("api/generator/adlib", {
    data: {
      prompt,
    },
  });
};

const createRandom = () => {
  return Api.post("api/generator/random-adlib");
};

const createResponse = (adlibId, questions) => {
  return Api.post("api/adlib/response", {
    data: {
      adlibId,
      questions,
    },
  });
};

const Lib = {
  get,
  getNewest,
  getFeatured,
  getById,
  create,
  createRandom,
  search,
  createResponse,
};

Object.freeze(Lib);
export default Lib;
