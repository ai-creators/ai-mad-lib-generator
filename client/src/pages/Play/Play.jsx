import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import Hero from "../../Components/Hero/Hero";
const Play = () => {
  const [error, setError] = useState(null);
  return (
    <>
      <Layout
        className="min-h-screen"
        hero={<Hero title="Ai Against Humanity" />}
      >
        <ErrorAlert error={error} setError={setError} />
        <div className="flex flex-col gap-4 pt-4"></div>
      </Layout>
    </>
  );
};

export default Play;
