import React, { useState } from "react";

const NameInput = () => {
  const [name, setName] = useState("");
  const changeName = ({ target: { value } }) => {
    setName(value);
  };
  return (
    <form className="flex flex-col">
      <label htmlFor="name" className="pb-2 text-slate-600">
        Enter your name
      </label>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className="relative grow">
          <input
            id="name"
            type="text"
            className="border rounded py-2 pl-3 pr-24 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300 outline-offset-4"
            placeholder="A chicken fighting with my mother..."
            value={name}
            onChange={changeName}
          />
        </div>
      </div>
    </form>
  );
};

export default NameInput;
