import React, { useEffect, useState } from "react";
import PromptInput from "../../Components/PromptInput/PromptInput";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import ErrorAlert from "../../errors/ErrorAlert";
import Card from "../../Components/Card/Card";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Hero from "../../Components/Hero/Hero";

const Create = () => {
  const [mostLikedLibs, setMostLikedLibs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const getLibs = async () => {
      try {
        setIsLoading(true);
        const api = new MadLibApi();
        const response = await api.listMostPopular(controller);
        setMostLikedLibs(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getLibs();
  }, []);

  const selectLib = ({ target }) => {
    const index = target.getAttribute("data-index");
    const lib = mostLikedLibs[index];
    navigate("/lib", { state: lib });
  };
  console.log(mostLikedLibs);
  return (
    <Layout
      className="min-h-screen"
      hero={
        <Hero
          title="Ad-Lib Generator"
          description="Generate an AI ad-lib based on your prompt"
        />
      }
    >
      <ErrorAlert error={error} setError={setError} />
      <div className="max-w-4xl mx-auto pt-4 px-4 flex flex-col gap-5">
        <section className="mb-5">
          <h3 className="text-2xl font-semibold mb-3">Create an Ad-Lib</h3>
          <PromptInput />
        </section>
        <section>
          {mostLikedLibs.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4">Feature Ad-Libs</h3>
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : mostLikedLibs.length > 0 ? (
                  mostLikedLibs.map((lib, index) => {
                    return index <= 5 ? (
                      <Card key={lib.prompt + index}>
                        <h4 className="text-lg font-semibold">
                          {lib.prompt}...
                        </h4>
                        <button
                          className="p-2 underline underline-offset-2 rounded text-indigo-800 active:text-indigo-900"
                          onClick={selectLib}
                          data-index={index}
                        >
                          Go To ad-Lib
                        </button>
                      </Card>
                    ) : null;
                  })
                ) : (
                  <p>Unable to load featured Ad-libs</p>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Create;
