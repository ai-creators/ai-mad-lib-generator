const HeroDemo = () => {
  const placeholderText = "Theme park adventure";
  return (
    <div className="bg-zinc-950 duration-300 h-full w-full rounded-2xl p-5 flex flex-col justify-end relative">
      <div className="w-full p-3 bg-zinc-800 text-white rounded-lg flex justify-between items-center">
        <p className="text-zinc-500">{placeholderText}</p>
        <div className="py-2 px-3  bg-zinc-900 w-fit ease-out duration-200 border-r-rounded rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800">
          Generate
        </div>
      </div>
      <button className="absolute top-5 right-5 py-2 px-3  bg-zinc-900 w-fit ease-out duration-200 border-r-rounded rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800">
        Play
      </button>
    </div>
  );
};

export default HeroDemo;
