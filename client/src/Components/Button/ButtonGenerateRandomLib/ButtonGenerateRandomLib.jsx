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
      console.log(response);
      setGeneratedMadLib(response.choices[0].text);
    } catch (error) {
      console.error("Error generating random mad lib:", error);
    }
  };

  return (
    <div>
      <button
        className="ButtonGenerateRandomLib" // Add the class
        onClick={generateRandomMadLib}
      >
        Generate Random Mad Lib
      </button>
      {generatedMadLib && <p>{generatedMadLib}</p>}
    </div>
  );
};

export default ButtonGenerateRandomLib;
