import React from "react";
import dayjs from "dayjs";
import Card from "../Card";

const CardLib = ({ lib, index, selectLib }) => {
  const day = dayjs(lib.createdAt);
  return (
    <Card>
      <header className="flex items-center mb-4">
        <h4 className="text-lg font-semibold capitalize">{lib.prompt}...</h4>
        <p className="ml-auto text-sm text-neutral-600 font-semibold">
          {day.format("DD MMM")}
        </p>
      </header>

      <button
        className="py-2 px-3 border rounded hover:bg-neutral-100 active:bg-neutral-200 ease-out duration-200"
        onClick={selectLib}
        data-index={index}
      >
        Go To ad-Lib
      </button>
    </Card>
  );
};

export default CardLib;
