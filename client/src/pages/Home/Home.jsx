import React, { useEffect, useState } from "react";
import PromptInput from "../../Components/PromptInput/PromptInput";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import ErrorAlert from "../../errors/ErrorAlert";
import Card from "../../Components/Card/Card";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
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
    const prompt = mostLikedLibs[index].prompt;
    const lib = mostLikedLibs[index].text;
    navigate("/lib", { state: { prompt, lib } });
  };
  console.log(mostLikedLibs);
  return (
    <Layout className="min-h-screen">
      <ErrorAlert error={error} setError={setError} />
      <div className="max-w-4xl mx-auto pt-16 px-2">
        <PromptInput />
        <section className="mt-4">
          {mostLikedLibs.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-2">Feature Ad-libs</h3>
              <div className="flex flex-col gap-3">
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
                          className="p-2 underline underline-offset-2 rounded"
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

export default Home;
