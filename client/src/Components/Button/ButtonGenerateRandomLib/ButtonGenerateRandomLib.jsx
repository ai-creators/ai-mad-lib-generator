// src/ButtonGenerateRandomLib.js

import React, { useState } from "react";
import axios from "axios";
import "./ButtonGenerateRandomLib.css"; // Import stylesheet

const ButtonGenerateRandomLib = () => {
  const [generatedMadLib, setGeneratedMadLib] = useState("");

  const generateRandomMadLib = async () => {
    try {
      const response = await axios.post("/api/generateRandomMadLib");
      setGeneratedMadLib(response.data.madLib);
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
