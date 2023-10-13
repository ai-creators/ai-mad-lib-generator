import React from "react";
import Card from "../../Card/Card";

const ToastInformation = ({ children, className = "" }) => {
  return (
    <Card
      className={`bg-zinc-950 z-50 fixed top-5 left-1/2 -translate-x-1/2${
        className && " " + className
      }`}
    >
      {children}
    </Card>
  );
};

export default ToastInformation;
