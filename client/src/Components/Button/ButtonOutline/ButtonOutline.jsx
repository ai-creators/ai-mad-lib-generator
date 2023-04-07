import React, { useState } from "react";

const ButtonOutline = ({ children, className, onClick = () => {} }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 border rounded hover:brightness-80 ease-out duration-300 outline-offset-4 ${className}`}
    >
      {children}
    </button>
  );
};

ButtonOutline.defaultProps = {
  className: "",
};

export default ButtonOutline;
