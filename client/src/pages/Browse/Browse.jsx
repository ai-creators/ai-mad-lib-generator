import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { MadLibApi } from "../../api/madLibApi";
import Card from "../../Components/Card/Card";
import Hero from "../../Components/Hero/Hero";
const Browse = () => {
  const [featuredLibs, setFeaturedLibs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedLibs = async () => {
      try {
        const api = new MadLibApi();
        const response = await api.listMostPopular();
        setFeaturedLibs(response);
      } catch (err) {
        setError(err);
      }
    };
    getFeaturedLibs();
  }, []);

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
        <div className="max-w-4xl mx-auto pt-4 px-4">
          <section>
            <Searchbar />
            <div className="flex flex-col gap-4 pt-4">
              <h3 className="text-2xl font-semibold mb-2">Featured</h3>
              {featuredLibs.map((lib, index) => {
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
              })}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Browse;
