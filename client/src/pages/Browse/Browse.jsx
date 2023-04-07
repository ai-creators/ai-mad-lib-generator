import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";

const Browse = () => {
  const [featuredLibs, setFeaturedLibs] = useState([]);
  const [error, setError] = useState(null);
  return (
    <Layout className="min-h-screen">
      <ErrorAlert error={error} setError={setError} />
      <div className="max-w-4xl mx-auto pt-16 px-2">
        <section>
          <h2 className="text-2xl font-semibold">Browse Ad-Libs</h2>
          <p>Try out user generated ad-libs.</p>
        </section>
      </div>
    </Layout>
  );
};

export default Browse;
