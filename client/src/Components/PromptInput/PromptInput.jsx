import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { MadLibApi } from "../../api/madLibApi";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const submitPrompt = async (event) => {
    event.preventDefault();
    navigate({
      pathname: "lib-create",
      search: createSearchParams({
        prompt,
      }).toString(),
    });
  };

  return (
    <form className="flex flex-col" onSubmit={submitPrompt}>
      <label htmlFor="prompt" className="pb-2 text-slate-600">
        Enter a prompt to generate Mad Lib
      </label>
      <div className="relative">
        <input
          id="prompt"
          type="text"
          className="border rounded py-2 pl-3 pr-24 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300 outline-offset-4"
          placeholder="A chicken fighting with my mother..."
          value={prompt}
          onChange={({ target: { value } }) => setPrompt(value)}
        />
        <button
          className={`ease-out duration-300 absolute py-2 px-3 right-0 border rounded-r font-semibold disabled:cursor-not-allowed ${
            prompt.length > 0
              ? "text-white bg-gray-900"
              : "text-slate-600 bg-white"
          }`}
          disabled={prompt.length === 0}
          type="submit"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
