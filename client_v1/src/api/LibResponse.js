import Api from "./Api";

const getById = async (id) => {
  return await Api.get("adlib/response/find", {
    params: {
      id,
    },
  });
};

const LibResponse = {
  getById,
};

Object.freeze(LibResponse);
export default LibResponse;
