import React from "react";

const Card = ({ children, padding }) => {
  return <article className={`${padding} border rounded`}>{children}</article>;
};

Card.defaultProps = {
  padding: "p-2",
};

export default Card;
