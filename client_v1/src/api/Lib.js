import Api from "./Api";
import storage from "../utils/Storage";

const get = async (timestamp, type, page = "1", pagination = "5") => {
  return await Api.get(
    `adlib?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}&rating=${
      storage.get("content-rating") ?? "nsfw"
    }`
  );
};

const search = async (timestamp, search, page = "1", pagination = "10") => {
  return await Api.post(
    `adlib/search?timestamp=${timestamp}&pagination=${pagination}&page=${page}&rating=${
      storage.get("content-rating") ?? "nsfw"
    }`,
    {
      data: {
        search,
      },
    }
  );
};

const create = async (prompt) => {
  return await Api.post("generator/adlib", {
    data: {
      prompt,
    },
  });
};

const createRandom = async () => {
  return await Api.post("generator/random-adlib");
};

const Lib = {
  get,
  create,
  createRandom,
  search,
};

Object.freeze(Lib);
export default Lib;
