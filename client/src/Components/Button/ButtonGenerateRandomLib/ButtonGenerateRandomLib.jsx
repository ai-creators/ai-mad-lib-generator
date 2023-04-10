// src/ButtonGenerateRandomLib.js

import React, { useState } from "react";
import { MadLibApi } from "../../../api/madLibApi";
import "./ButtonGenerateRandomLib.css"; // Import stylesheet

const ButtonGenerateRandomLib = () => {
  const [generatedMadLib, setGeneratedMadLib] = useState("");

  const generateRandomMadLib = async () => {
    try {
      const api = new MadLibApi();
      const response = await api.generateRandomLib();
      setGeneratedMadLib(response.choices[0].text);
    } catch (error) {
      console.error("Error generating random mad lib:", error);
    }
  };

  return (
    <div>
      <button
        className="py-2 px-3 border border-gray-900 rounded font-semibold bg-gray-900 text-white"
        onClick={generateRandomMadLib}
      >
        Random Ad-Lib
      </button>
      {generatedMadLib && <p>{generatedMadLib}</p>}
    </div>
  );
};

export default ButtonGenerateRandomLib;
