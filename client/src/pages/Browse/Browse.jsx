import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { MadLibApi } from "../../api/madLibApi";
import Card from "../../Components/Card/Card";
import Hero from "../../Components/Hero/Hero";
import Loader from "../../Components/Loader/Loader";
const Browse = () => {
  const [featuredLibs, setFeaturedLibs] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeaturedLibs = async () => {
      try {
        setIsLoading(true);
        const api = new MadLibApi();
        const response = await api.listMostPopular();
        setFeaturedLibs(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getFeaturedLibs();
  }, []);

  useEffect(() => {
    const getSearchedLibs = async () => {
      const api = new MadLibApi();
      const response = await api.search(query);
      setFeaturedLibs(response);
    };
    getSearchedLibs();
  }, [query]);

  const selectLib = ({ target }) => {
    const index = target.getAttribute("data-index");
    const prompt = mostLikedLibs[index].prompt;
    const lib = mostLikedLibs[index].text;
    navigate("/lib", { state: { prompt, lib } });
  };

  return (
    <>
      <Layout
        className="min-h-screen"
        hero={
          <Hero
            title="Browse Ad-Libs"
            description="Try out user generated ad-libs."
          />
        }
      >
        <ErrorAlert error={error} setError={setError} />
        <div className="max-w-4xl  mx-auto pt-4 px-4">
          <section>
            <Searchbar setQuery={setQuery} />
            <div className="flex flex-col gap-4 pt-4">
              <h3 className="text-2xl font-semibold mb-2">Featured</h3>
              {isLoading ? (
                <Loader />
              ) : (
                featuredLibs.map((lib, index) => {
                  return index <= 5 ? (
                    <Card key={lib.prompt + index}>
                      <h4 className="text-lg font-semibold">{lib.prompt}...</h4>
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
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Browse;
