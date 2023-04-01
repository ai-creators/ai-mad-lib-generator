import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";
import ButtonOutline from "../../Components/Button/ButtonOutline/ButtonOutline";
import MadLibViewer from "../../Components/MadLibViewer/MadLibViewer";
const Lib = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [lib, setLib] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const getLib = async () => {
      try {
        if (!prompt) {
          throw new Error("No Prompt Provided");
        }
        const api = new MadLibApi();
        const response = await api.generate(prompt);
        if (response.choices) {
          setLib(response.choices[0].text);
        }
      } catch (error) {}
    };
    getLib();
  }, [prompt]);
  console.log("LIB: ", lib);
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-10 pb-2 px-2">
        <header className="mb-3">
          <h3 className="text-lg font-semibold">{prompt}...</h3>
        </header>

        {lib && <MadLibBuilder madLib={lib} />}
      </div>
    </Layout>
  );
};

export default Lib;
