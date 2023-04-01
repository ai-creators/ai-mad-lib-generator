import React from "react";

const ButtonOutline = ({ children }) => {
  return (
    <button className="py-2 px-3 border rounded drop-shadow-sm foxus:drop-shadow-xl hover:drop-shadow-xl hover:brightness-90 ease-out duration-300 outline-offset-4">
      {children}
    </button>
  );
};

export default ButtonOutline;
