import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";
import ErrorAlert from "../../errors/ErrorAlert";
const Lib = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [lib, setLib] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  console.log("LOCATION: ", location);
  useEffect(() => {
    const getLib = async () => {
      try {
        if (!prompt) {
          throw new Error("No Prompt Provided");
        }
        if (location.state.lib) {
          setLib(location.state.lib);
        } else {
          const api = new MadLibApi();
          const response = await api.generate(prompt);
          if (response.choices) {
            setLib(response.choices[0].text);
          }
        }
      } catch (err) {
        setError(err);
      }
    };
    getLib();
  }, [prompt]);
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-10 pb-2 px-2">
        <ErrorAlert error={error} setError={setError} />
        <header className="mb-3">
          <h3 className="text-lg font-semibold">{prompt}...</h3>
        </header>

        {lib && <MadLibBuilder madLib={lib} />}
      </div>
    </Layout>
  );
};

export default Lib;
