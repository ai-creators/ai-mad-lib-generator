import React, { useState } from "react";
import PromptInput from "../../Components/PromptInput/PromptInput";
import Layout from "../../Layout/Layout";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <Layout className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-16">
        <PromptInput prompt={prompt} setPrompt={setPrompt} />
      </div>
    </Layout>
  );
};

export default Home;
