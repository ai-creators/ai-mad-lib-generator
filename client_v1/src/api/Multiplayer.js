import Api from "./Api";

const createLobby = async () => {
  return await Api.get(`multiplayer/lobby`);
};

const Multiplayer = {
  createLobby,
};

Object.freeze(Multiplayer);
export default Multiplayer;
