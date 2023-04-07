import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";
import Hero from "../../Components/Hero/Hero";

const LibViewer = ({ selectedLib }) => {
  const { state } = useLocation();
  const [lib, setLib] = useState("");
  const [error, setError] = useState(null);
  console.log(state);
  useEffect(() => {
    if (state) {
      setLib(state);
    }
  }, [state]);
  console.log("STATE: ", lib);
  return (
    <Layout
      className="min-h-screen"
      hero={<Hero title={`${state.prompt}...`} />}
    >
      <div className="max-w-4xl mx-auto pt-10 pb-2 px-4">
        <ErrorAlert error={error} setError={setError} />

        {lib && <MadLibBuilder madLib={lib} prompt={state.prompt} />}
      </div>
    </Layout>
  );
};

export default LibViewer;
