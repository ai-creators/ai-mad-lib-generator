import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";

const LibViewer = ({ selectedLib }) => {
  const { state } = useLocation();
  const [lib, setLib] = useState("");
  const [error, setError] = useState(null);
  console.log(state);
  useEffect(() => {
    if (state.lib) {
      setLib(state.lib);
    }
  }, [state.lib]);
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-10 pb-2 px-2">
        <ErrorAlert error={error} setError={setError} />
        <header className="mb-3">
          <h3 className="text-lg font-semibold">{state.prompt}...</h3>
        </header>

        {lib && <MadLibBuilder madLib={lib} prompt={state.prompt} />}
      </div>
    </Layout>
  );
};

export default LibViewer;
