import React from "react";

const Card = ({ children }) => {
  return <article className="p-2 border rounded">{children}</article>;
};

export default Card;
