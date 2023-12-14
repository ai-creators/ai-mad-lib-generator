import Card from "../../card/Card";

const CreateAdlibCard = () => {
  return (
    <Card className="flex flex-col gap-5">
      <header>
        <h2 className="text-2xl font-semibold">Create an Adlib</h2>
        <p className="text-zinc-500">Enter a promp to generate an adlib</p>
      </header>
      <form>
        <div className="flex relative">
          <label className="sr-only">Enter a prompt for an adlib</label>
          <input
            className="border border-zinc-300 p-3 rounded w-full"
            placeholder="The Rock fighting paper"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 p-3 border-l border-zinc-300">
            Generate
          </button>
        </div>
        <button></button>
      </form>
    </Card>
  );
};

export default CreateAdlibCard;
