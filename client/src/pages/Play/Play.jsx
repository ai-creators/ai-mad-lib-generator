import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import Hero from "../../Components/Hero/Hero";
import NameInput from "../../Components/NameInput/NameInput";
const Play = () => {
  const [error, setError] = useState(null);
  return (
    <>
      <Layout
        className="min-h-screen"
        hero={<Hero title="Ai Against Humanity" />}
      >
        <ErrorAlert error={error} setError={setError} />
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex flex-col gap-4 pt-4">
            <NameInput />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Play;
