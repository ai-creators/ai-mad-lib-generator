import React from "react";
import { MadLibApi } from "../../api/madLibApi";

const PromptInput = ({ prompt, setPrompt, setMadLib }) => {
  const submitPrompt = async () => {
    try {
      if (prompt) {
        const api = new MadLibApi();
        const response = await api.generate(prompt);
        console.log(response.choices);
        if (response.choices) {
          console.log("IN HERE");
          setMadLib(response.choices[0].text);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="prompt" className="py-2 text-slate-600">
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
          onClick={submitPrompt}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
