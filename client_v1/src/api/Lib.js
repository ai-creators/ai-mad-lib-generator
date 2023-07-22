import Api from "./Api";

const get = async (timestamp, type, page = "1", pagination = "5") => {
  return await Api.get(
    `adlib?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}`
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
};

Object.freeze(Lib);
export default Lib;
