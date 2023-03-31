import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";

const Lib = () => {
  const { prompt } = useParams();
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-16">
        <h3>{prompt}...</h3>
      </div>
    </Layout>
  );
};

export default Lib;
