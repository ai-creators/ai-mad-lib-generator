import { useState } from "react";

export const useMultiplayerLobbyCode = (code: string) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((curr) => !curr);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return { isVisible, toggleVisibility, copyCode };
};
