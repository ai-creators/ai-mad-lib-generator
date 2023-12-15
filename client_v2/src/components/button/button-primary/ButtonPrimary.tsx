import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

const ButtonPrimary = ({
  children,
  className = "px-3 py-2",
  href,
  onClick,
}: Props) => {
  if (href) {
    return (
      <Link
        to={href}
        className={`${className} text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 duration-200 ease-out py-2 px-4 rounded`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${className} text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 duration-200 ease-out py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
