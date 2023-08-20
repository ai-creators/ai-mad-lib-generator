import Container from "../../components/Container/Container";

const Multiplayer = () => {
  const createLobby = () => {};
  return (
    <Container className="grid-aside py-12 gap-12">
      <button
        className="py-3 px-3 hover:bg-zinc-900 w-fit active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        onClick={createLobby}
      >
        Create Lobby
      </button>
    </Container>
  );
};

export default Multiplayer;
