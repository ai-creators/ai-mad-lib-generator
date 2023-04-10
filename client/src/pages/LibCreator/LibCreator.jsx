import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import ErrorAlert from "../../errors/ErrorAlert";
import Loader from "../../Components/Loader/Loader";
import Hero from "../../Components/Hero/Hero";
const LibCreator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    console.log(ignore);
    const controller = new AbortController();

    const getLib = async () => {
      try {
        if (!prompt) {
          throw new Error("No prompt provided");
        }
        if (!ignore) {
          ignore = true;
          const api = new MadLibApi();
          console.log("HERE");
          const response = await api.generate(prompt, controller);
          console.log("res: ", response);
          navigate("/lib", { state: response });
        }
      } catch (err) {
        setError(err);
      }
    };
    getLib();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);
  return (
    <Layout className="min-h-screen" hero={<Hero title={`${prompt}...`} />}>
      <div className="max-w-4xl mx-auto pt-10 px-2 mb-4">
        <ErrorAlert error={error} setError={setError} />
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      </div>
    </Layout>
  );
};

export default LibCreator;
