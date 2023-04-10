// src/ButtonGenerateRandomLib.js

import React, { useState } from "react";
import { MadLibApi } from "../../../api/madLibApi";
import "./ButtonGenerateRandomLib.css"; // Import stylesheet
import { useNavigate } from "react-router-dom";

const ButtonGenerateRandomLib = ({ setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const generateRandomMadLib = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const api = new MadLibApi();
      const response = await api.generateRandomLib();
      navigate("/lib", { state: response });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="py-2 px-3 border border-gray-900 rounded font-semibold bg-gray-900 text-white"
        onClick={generateRandomMadLib}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Random Ad-Lib"}
      </button>
    </div>
  );
};

export default ButtonGenerateRandomLib;
