import React, { useState } from "react";
import Layout from "../../Layout/Layout";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="flex flex-col">
          <label htmlFor="prompt" className="py-2 text-slate-600">
            Enter a prompt to generate Mad Lib
          </label>
          <div className="relative">
            <input
              id="prompt"
              type="text"
              className="border rounded py-2 px-3 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300"
              placeholder="A chicken fighting with my mother..."
              value={prompt}
              onChange={({ target: { value } }) => setPrompt(value)}
            />
            <button className="absolute py-2 px-3 right-0 border-l font-semibold text-slate-600">
              Generate
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
