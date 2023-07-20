import Api from "./Api";

const get = async (timestamp, type, page = "1", pagination = "5") => {
  return await Api.get(
    `adlib?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}`
  );
};

const Lib = {
  get,
};

Object.freeze(Lib);
export default Lib;
