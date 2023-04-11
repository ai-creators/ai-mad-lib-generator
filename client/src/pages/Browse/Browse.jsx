import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import ErrorAlert from "../../errors/ErrorAlert";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { MadLibApi } from "../../api/madLibApi";
import Card from "../../Components/Card/Card";
import Hero from "../../Components/Hero/Hero";
import Loader from "../../Components/Loader/Loader";
import dayjs from "dayjs";
import CardLib from "../../Components/Card/CardLib/CardLib";
import { useNavigate } from "react-router-dom";
const Browse = () => {
  const [featuredLibs, setFeaturedLibs] = useState([]);
  const [query, setQuery] = useState("featured");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    const lib = featuredLibs[index];
    navigate("/lib", { state: lib });
  };

  const changeQuery = ({ target: { id } }) => {
    setQuery(id);
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
        <div className="max-w-4xl  mx-auto pt-4 px-4 mb-4">
          <section>
            <h3 className="text-2xl font-semibold mb-3">Search</h3>
            <Searchbar setQuery={setQuery} />
            <div className="flex flex-col gap-4 pt-4">
              <header className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-2 capitalize">
                  {query ? `${query}...` : "Featured"}
                </h3>
                <ul className="flex items-center gap-2">
                  <li>
                    <button
                      onClick={changeQuery}
                      className={`p-2 rounded ${
                        query.toLowerCase() === "featured" &&
                        "font-semibold bg-neutral-100"
                      }`}
                      id="featured"
                    >
                      Featured
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={changeQuery}
                      className={`p-2 rounded ${
                        query.toLowerCase() === "newest" &&
                        "font-semibold bg-neutral-100"
                      }`}
                      id="newest"
                    >
                      Newest
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={changeQuery}
                      className={`p-2 rounded ${
                        query.toLowerCase() === "interesting" &&
                        "font-semibold bg-neutral-100"
                      }`}
                      id="interesting"
                    >
                      Interesting
                    </button>
                  </li>
                </ul>
              </header>

              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                featuredLibs.map((lib, index) => {
                  return (
                    <CardLib
                      key={lib.prompt + index}
                      selectLib={selectLib}
                      index={index}
                      lib={lib}
                    />
                  );
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
