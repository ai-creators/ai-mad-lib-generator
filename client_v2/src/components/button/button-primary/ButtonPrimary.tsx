import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

const ButtonPrimary = ({ children, className = "px-3 py-2", href }: Props) => {
  if (href) {
    return (
      <Link
        to={href}
        className={`${className} text-white bg-green-600 hover:bg-green-700 active:bg-green-800 duration-200 ease-out py-2 px-4 rounded`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${className} text-white bg-green-600 hover:bg-green-700 active:bg-green-800 duration-200 ease-out py-2 px-4 rounded`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
