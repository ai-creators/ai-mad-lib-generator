import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Hero from "../../Components/Hero/Hero";
import { storage } from "../../utils/Storage";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
const Saves = () => {
  const [savedLibs, setSavedLibs] = useState([]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const foundSaves = JSON.parse(storage.local.get("saves"));
    if (Array.isArray(foundSaves) && foundSaves.length > 0) {
      setSavedLibs(foundSaves);
    }
  }, []);

  const selectLib = ({ target }) => {
    const index = target.getAttribute("data-index");
    const prompt = savedLibs[index].prompt;
    const lib = savedLibs[index].text;
    navigate("/lib", { state: { prompt, lib } });
  };

  const clearSaves = () => {
    setIsClearModalOpen(true);
  };

  return (
    <>
      <Layout
        className={"min-h-screen"}
        hero={<Hero title="Your Saved Ad-Libs" />}
      >
        <div className="max-w-4xl mx-auto pt-4 px-4 flex flex-col gap-2">
          <header className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Your Ad-Libs</h3>
            <button
              onClick={clearSaves}
              className="py-2 px-3 border rounded text-red-800"
            >
              Clear Saves
            </button>
          </header>
          <section className="flex flex-col gap-2">
            {savedLibs.length > 0 ? (
              savedLibs.map((lib, index) => {
                console.log("LIB: ", lib);
                return (
                  <Card key={lib.prompt + index}>
                    <h4 className="text-lg font-semibold">{lib.prompt}...</h4>
                    <button
                      className="p-2 underline underline-offset-2 rounded text-indigo-800"
                      onClick={selectLib}
                      data-index={index}
                    >
                      Go to ad-lib
                    </button>
                  </Card>
                );
              })
            ) : (
              <p>You do not have any saved Ad-Libs</p>
            )}
          </section>
        </div>
      </Layout>
      {isClearModalOpen && <Modal />}
    </>
  );
};

export default Saves;
