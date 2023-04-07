import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";
import ErrorAlert from "../../errors/ErrorAlert";
import Loader from "../../Components/Loader/Loader";
import Hero from "../../Components/Hero/Hero";
const LibCreator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [lib, setLib] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLib = async () => {
      try {
        setIsLoading(true);
        if (!prompt) {
          throw new Error("No Prompt Provided");
        }

        const api = new MadLibApi();
        const response = await api.generate(prompt);
        console.log("RESPONSE: ", response);
        setLib(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getLib();
  }, [prompt]);
  return (
    <Layout className="min-h-screen" hero={<Hero title={`${prompt}...`} />}>
      <div className="max-w-4xl mx-auto pt-10 pb-2 px-2">
        <ErrorAlert error={error} setError={setError} />
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : lib ? (
          <MadLibBuilder madLib={lib} />
        ) : (
          <p>Unable to create ad-lib. Please try again.</p>
        )}
      </div>
    </Layout>
  );
};

export default LibCreator;
