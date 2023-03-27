import React, { useState } from "react";
import { MadLibApi } from "../../api/madLibApi";
import MadLibBuilder from "../../Components/MadLibBuilder/MadLibBuilder";
import MadLibViewer from "../../Components/MadLibViewer/MadLibViewer";
import PromptInput from "../../Components/PromptInput/PromptInput";
import Layout from "../../Layout/Layout";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [madLib, setMadLib] = useState("");

  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-16">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          setMadLib={setMadLib}
        />
        <div className="mt-4">
          <MadLibBuilder madLib={madLib} />
        </div>
        <div className="mt-4">
          <MadLibViewer />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
