import Api from "./Api";

const get = async (timestamp, type, page = "1", pagination = "15") => {
  return await Api.get(
    `libs?type=${type}&featured&timestamp=${timestamp}&pagination=${pagination}&page=${page}`
  );
};

const Lib = {
  get,
};

Object.freeze(Lib);
export default Lib;
