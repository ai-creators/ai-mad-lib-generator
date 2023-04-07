import React, { useEffect, useState } from "react";
import PromptInput from "../../Components/PromptInput/PromptInput";
import Layout from "../../Layout/Layout";
import { MadLibApi } from "../../api/madLibApi";
import ErrorAlert from "../../errors/ErrorAlert";
import Card from "../../Components/Card/Card";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [mostLikedLibs, setMostLikedLibs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const getLibs = async () => {
      try {
        const api = new MadLibApi();
        const response = await api.listMostPopular(controller);
        setMostLikedLibs(response);
      } catch (err) {
        setError(err);
      }
    };
    getLibs();
  }, []);

  const selectLib = ({ target }) => {
    const index = target.getAttribute("data-index");
    const prompt = mostLikedLibs[index].prompt;
    const lib = mostLikedLibs[index].text;
    console.log("LIB: ", lib);
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
              <h3 className="text-2xl font-semibold mb-2">
                Most Liked ad-libs
              </h3>
              <div className="flex flex-col gap-3">
                {mostLikedLibs.map((lib, index) => {
                  return (
                    <Card key={lib.prompt + index}>
                      <h4 className="text-lg font-semibold">{lib.prompt}...</h4>
                      <button
                        className="p-2 border rounded"
                        onClick={selectLib}
                        data-index={index}
                      >
                        Go To Lib {">"}
                      </button>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
